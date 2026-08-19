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
