# Content Writer Module

The Content Writer is an employee role that authors **courses** which are later
assigned to users. A course is a tree:

```
Course ──< Module ──< Task (a "content item")
```

A **Task** is the actual learning content and is intentionally flexible: it is
either an uploaded **file** (PDF, Word, or any type) or an external **link**
(YouTube, blog post, article, any public URL). Viewers open a task and the
content is shown in a new browser tab.

## Files

| File | Role |
| --- | --- |
| `content-writer/WriterDashboard.tsx` | Lists courses, stats, recent activity. Entry point (`/dashboard/content-writer`). |
| `add-course/AddCourse.tsx` | Create a course (name, rich-text description, thumbnail). Route `/dashboard/add-course`. |
| `edit-course/CourseDetails.tsx` | Course detail: modules accordion + content items, add/edit module & content, edit the course, open content. Route `/dashboard/course/:id`. |
| `edit-course/AddModuleModal.tsx` | Modal to add a module to a course. |
| `edit-course/AddTaskModal.tsx` | Modal to add a content item (file **or** link) to a module. |
| `edit-course/EditCourseModal.tsx` | Modal to edit course name, description and status. |
| `edit-course/EditModuleModal.tsx` | Modal to edit module name, description and status. |
| `edit-course/EditTaskModal.tsx` | Modal to edit a content item's title, description and status. |
| `edit-course/DescriptionEditor.tsx` | Shared rich-text (tiptap) editor for HTML descriptions. |

Data layer (shared, not in this folder):
- Services: `src/services/user-services.ts` (`getCourseByIdContentWriter`, `addCourseContentWriter`, `addCourseModuleContentWriter`, `addCourseTaskContentWriter`, `updateCourseContentWriter`, `updateCourseModuleContentWriter`, `updateCourseTaskContentWriter`, `getCourseTaskContentUrl`).
- Query hooks: `src/hooks/queries/useUserQueries.ts` (`useGetAllCoursesByUser`, `useGetCourseById`).
- Mutation hooks: `src/hooks/mutations/useUserMutations.ts` (`useAddCourse`, `useAddCourseModule`, `useAddCourseTask`, `useUpdateCourse`, `useUpdateCourseModule`, `useUpdateCourseTask`).
- Types: `src/interfaces/contentwriter.ts` (`Course`, `Module`, `Task`, `CourseStatus`, `AddModulePayload`, `AddTaskPayload`, `UpdateCoursePayload`, `UpdateModulePayload`, `UpdateTaskPayload`).

## Backend contract (SRYTAL-BE `/contentwriter`)

| Endpoint | Notes |
| --- | --- |
| `GET /getAllCourses` | Returns `{ courses }` (populated with modules → tasks). |
| `GET /getCourseById/:id` | Returns `{ success, coursedata }` (populated). |
| `POST /addCourse` | multipart; file field `coursethumbnail`. |
| `POST /addCourseModule` | multipart; file field `coursemodulethumbnail`. |
| `POST /addCourseTask` | multipart. Send **either** `taskFile` (file) **or** `link` (URL). Backend sets `type` to `FILE`/`LINK` and stores the S3 key or URL in `content`. |
| `PUT /updatecourse` | JSON `{ id, courseName, courseDescription, thumbnail, status }`. |
| `PUT /updatecoursemodule` | JSON `{ id, moduleName, moduleDescription, thumbnail, status }`. |
| `PUT /updatecoursetask` | JSON `{ id, taskName, taskDescription, thumbnail, status }`. |
| `GET /getCourseTaskContent/:id` | **Content proxy.** `LINK` → 302 redirect to the URL; `FILE` → streams the S3 object inline. Accepts the JWT via `auth_token` header **or query param** so it can be opened in a new tab. |

## Editing rules

`status` is **required** on all three update endpoints and must be `ACTIVE` or
`ARCHIVE` (`src/types/validCourseStatusTypes.ts` on the backend). Sending
anything else returns 400; omitting it returns 500, because the backend
validator calls `.toUpperCase()` on it unguarded. Always send it.

The update endpoints are plain JSON — they have **no** `multer` middleware,
unlike the add endpoints. `thumbnail` is therefore a plain string (the stored
S3 key), so edits cannot replace an image; the modals send the existing value
back untouched. Re-uploading a thumbnail needs a backend change.
`updatecoursetask` likewise does not touch `content`/`type`, so a task's
file or link cannot be swapped from the edit modal.

## How "view content" works

`getCourseTaskContentUrl(taskId)` builds
`${BASE_URL}/contentwriter/getCourseTaskContent/:id?auth_token=<token>` and we
`window.open(...)` it. Everything is proxied through the backend — the frontend
never holds the raw file/link; the backend decides whether to redirect (links)
or stream (files). The token is in the query string because a new tab cannot
send custom headers.

## Conventions to follow here

- Theming: pull colors from `useAppTheme()` (`themeConfig.color`, `.borderColor`,
  `.headerBackgroundColor`, `.button.*`). Mantine component theming is applied
  globally in `src/routes/user.tsx`.
- Buttons: use `CommonButton` (`@components/common/button/CommonButton`).
- Toasts: `useCustomToast()` → `showSuccessToast` / `showErrorToast`.
- Loading/empty: `PremiumLoader` and `DataView` from `@components/common/loaders`.
- Responsiveness: `useMediaQuery('(max-width: 768px)')` plus Mantine responsive
  props (`{ base, sm }`). Keep layouts mobile-first and clean.
- Auth: the `apiClient` interceptor attaches the `auth_token` header
  automatically — do **not** add it manually in services.
- File uploads: build a `FormData` and set `Content-Type: multipart/form-data`;
  match the backend field names exactly.

---

# Employee Course Portal (the learner side)

The other half of the courses feature: what an **employee** sees for the courses
an admin has assigned to them. The content writer authors the tree; the employee
works through it and their progress is tracked per task.

```
CourseAssignment (course <-> employee)  ──<  TaskProgress (one row per completed task)
```

## Files

| File | Role |
| --- | --- |
| `course-portal/EmployeeCoursePortal.tsx` | The learner's course list: summary stats, status tabs, search, course cards. Route `/dashboard/course-assignments`. |
| `course-portal/AssignedCourseCard.tsx` | One assigned course — thumbnail, status/overdue badge, progress bar, due-date hint, Start/Continue/Review. |
| `course-portal/CoursePlayer.tsx` | The course experience: content pane + curriculum, progress header, prev/next, complete toggle. Route `/dashboard/course-assignments/:courseAssignmentId`. |
| `course-portal/CurriculumSidebar.tsx` | Modules accordion with per-module progress and per-task completion ticks. A drawer under 768px. |
| `course-portal/TaskContentViewer.tsx` | Renders one task's content — every authored type (see below). |
| `course-portal/task-content.ts` | Pure resolver: task -> how to render it. Unit-tested in `task-content.test.ts`. |
| `course-portal/course-status.ts` | Shared status colour/label/due-date helpers used by both the list and the player. |

Data layer:
- Services: `src/services/user-services.ts` (`getMyAssignedCourses`, `getMyAssignedCourseById`, `updateMyTaskProgress`).
- Query hooks: `useGetMyAssignedCourses`, `useGetMyAssignedCourse` (`hooks/queries/useUserQueries.ts`).
- Mutation hook: `useUpdateMyTaskProgress` (`hooks/mutations/useUserMutations.ts`) — invalidates both `myCourse(id)` and `myCourses`.
- Types: `src/interfaces/course-assignment.ts` (`AssignedCourse`, `AssignedCourseDetail`, `AssignedModule`, `AssignedTask`, `CourseProgress`, `CourseAssignmentStatus`). Deliberately **separate** from `contentwriter.ts` — those are the authoring shapes and carry S3 keys the employee never receives.

## Backend contract (SRYTAL-BE, mounted at `/`)

| Endpoint | Notes |
| --- | --- |
| `GET /getMyAssignedCourses` | `{ success, courses }`. Summary only (no module/task tree) — status, progress, `totalModules`, `isOverdue`, signed `thumbnailUrl`. |
| `GET /getMyAssignedCourseById/:courseAssignmentId` | `{ success, course }` with the full `modules[] -> tasks[]` tree and per-task `isCompleted`. **404** if the assignment isn't the caller's. |
| `PUT /updateMyTaskProgress` | JSON `{ courseAssignmentId, taskId, isCompleted }`. Upserts the progress row and returns the recomputed `{ courseStatus, progress }`. |

Task content still goes through the content-writer proxy:
`GET /contentwriter/getCourseTaskContent/:id` (see `getCourseTaskContentUrl`).

## Rules that matter here

- **Status is derived, never sent.** The backend recomputes the assignment status
  from the task-progress rows on every write (`Assigned` -> `In Progress` ->
  `Completed`, model enum values — *not* the upper-snake ones in BE
  `types/courseAssignment.ts`, which nothing uses). The client only ever reads it.
- **Only `ACTIVE` modules and tasks reach the employee.** Archived content is
  filtered server-side, so progress denominators only count published items.
- **Ownership is enforced server-side** by looking the assignment up with
  `{ _id, employeeId }`, and a task is rejected unless its module belongs to the
  assigned course. Don't re-implement those checks in the UI.
- **`LINK` tasks expose their URL as `link`; `FILE` tasks do not expose `content`**
  (it's an S3 key) — they're streamed through the proxy instead.

## How the content viewer decides what to render

`resolveTaskContent(task, fileUrl)` in `task-content.ts` returns a `kind`:

| Task | Rendered as |
| --- | --- |
| YouTube (`watch?v=`, `youtu.be`, `/embed/`, `/shorts/`, `/live/`), Vimeo, Google Drive `/file/d/` | `embed` — provider iframe in a 16:9 box |
| Link ending in a media extension (`.mp4`, `.mp3`, `.png`, …) | native `video`/`audio`/`image` |
| Any other link (blog, article, docs) | `external` — an "open in a new tab" card |
| Uploaded file, by `contentMimeType` (falling back to the `contentFileName` extension) | `video` / `audio` / `image` / `pdf` / `text` inline |
| Office documents, archives, unknown types | `download` — "open in a new tab" card |

Arbitrary sites are **never** put in an iframe: `X-Frame-Options` would blank
them out silently, so the card is the honest fallback. Office files can't use
Office Online / Google Docs viewers either — our content URL is authenticated
and those services can't reach it.

Completion is marked in two ways, both routed through the player (the single
place that talks to the progress API): the explicit **Complete and continue**
button, and `onFinished` — fired when a video/audio ends or an external resource
is opened. `onFinished` never *un*-completes and never re-fires on a task that
is already complete.
