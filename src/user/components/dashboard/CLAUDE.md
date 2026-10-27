# Content Writer Module

The Content Writer is an employee role that authors **courses** which are later
assigned to users. A course is a tree:

```
Course ──< Module ──< Task (a "content item")
```

A **Task** is the actual learning content and is intentionally flexible: it is
either an uploaded **file** (PDF, Word, Excel, PowerPoint, TXT, CSV, or image —
PNG/JPG/WEBP) or an external **link** (YouTube, blog post, article, any public
URL). Viewers open a task and the content is shown in a new browser tab.

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
| `edit-course/QuizQuestionsPage.tsx` | Quiz question authoring page (`/dashboard/content-writer/quiz-questions`) — create, edit, show/hide and delete the questions of one QUIZ task. The task id comes from the `?taskId=`/`?courseId=` URL params (how a course owner opens an existing quiz from Course Details), falling back to sessionStorage for the just-created flow. |
| `edit-course/QuizBuilder.tsx` | Presentational question editor + existing-question list with per-question edit / show-hide / delete actions. |
| `edit-course/quiz-helpers.ts` | Pure helpers: draft factories, per-type option rules, validation and local ↔ API mappers. |
| `edit-course/task-popup-state.ts` | sessionStorage bridge that points the quiz page at the QUIZ task just created (used as a fallback when the URL carries no `taskId`). |
| `content-writer/CloneCourseModal.tsx` | Clones an **archived** course into a new ACTIVE one: picks modules/tasks, calls `POST /clonecourse`, and copies the quiz questions of every cloned QUIZ task. |

Data layer (shared, not in this folder):
- Services: `src/services/user-services.ts` (`getCourseByIdContentWriter`, `addCourseContentWriter`, `addCourseModuleContentWriter`, `addCourseTaskContentWriter`, `updateCourseContentWriter`, `updateCourseModuleContentWriter`, `updateCourseTaskContentWriter`, `getCourseTaskContentUrl`).
- Query hooks: `src/hooks/queries/useUserQueries.ts` (`useGetAllCoursesByUser`, `useGetCourseById`).
- Mutation hooks: `src/hooks/mutations/useUserMutations.ts` (`useAddCourse`, `useAddCourseModule`, `useAddCourseTask`, `useUpdateCourse`, `useUpdateCourseModule`, `useUpdateCourseTask`).
- Types: `src/interfaces/contentwriter.ts` (`Course`, `Module`, `Task`, `CourseStatus`, `AddModulePayload`, `AddTaskPayload`, `UpdateCoursePayload`, `UpdateModulePayload`, `UpdateTaskPayload`).

## Quiz questions (SRYTAL-BE, mounted at `/`)

A `QUIZ` task owns a list of questions. The authoring page
(`QuizQuestionsPage`) is opened right after a QUIZ task is created, or from a
quiz task card in Course Details (its `Edit questions` action navigates to
`/dashboard/content-writer/quiz-questions?taskId=<id>&courseId=<id>`); a question
is made of a `question`, a `type` (`RADIO` | `CHECKBOX` | `TOGGLE` | `DROPDOWN` |
`TEXTAREA`), a `status` (`SHOW`/`HIDE`) and — except for `TEXTAREA` — a list of
`{ value, isanswer }` options.

| Endpoint | Notes |
| --- | --- |
| `POST /createQuizQuestion` | JSON `{ taskId, question, type, status, options? }`. |
| `GET /getAllQuizQuestions/:taskId` | `{ success, data: questions }` (non-deleted, oldest first). |
| `GET /getQuizQuestion/:id` | `{ success, data: question }` — single question. |
| `PUT /updateQuizQuestion/:questionId` | JSON partial `{ question?, type?, options?, status? }`; `taskId` is never reassigned. |
| `PATCH /updateQuizQuestionStatus/:questionId` | JSON `{ status: 'SHOW' \| 'HIDE' }`. |
| `DELETE /deleteQuizQuestion/:questionId` | Soft delete (`isDeleted = true`). |

Data layer:
- Services: `src/services/user-services.ts` (`getAllQuizQuestions`, `createQuizQuestion`, `getQuizQuestionById`, `updateQuizQuestion`, `updateQuizQuestionStatus`, `deleteQuizQuestion`).
- Query hooks: `useGetAllQuizQuestions`, `useGetQuizQuestion` (`hooks/queries/useUserQueries.ts`; key `quizQuestions(taskId)` / `quizQuestion(questionId)`).
- Mutation hooks: `useCreateQuizQuestion`, `useUpdateQuizQuestion`, `useUpdateQuizQuestionStatus`, `useDeleteQuizQuestion` (`hooks/mutations/useUserMutations.ts`) — all invalidate `quizQuestions(taskId)` when a task id is supplied.
- Types: `src/interfaces/quiz.ts` (`QuizQuestionApiModel`, `QuizQuestionApiPayload`, `QuizQuestionApiUpdatePayload`, …).

Per-type rules (mirrored client-side by `validateQuizQuestion` in
`quiz-helpers.ts`): `RADIO`/`DROPDOWN`/`CHECKBOX` need **at least 2** options
(`RADIO`/`DROPDOWN` exactly one correct, `CHECKBOX` at least two correct);
`TOGGLE` needs exactly 2 options with exactly one correct; `TEXTAREA` has no
options.

The `CHECKBOX` rule (a multiple-choice question needs **at least two** correct
answers) is enforced in three places on the frontend:

1. `getQuizQuestionFieldErrors` (`quiz-helpers.ts`) produces the
   `correctAnswer` field error, which keeps the **Add question** button
   disabled and shows *"Mark at least 2 options as the correct answers."*.
2. The `QuestionEditor` in `QuizBuilder.tsx` shows that message for
   multiple-choice questions as soon as the type is picked (it does not wait
   for a blur) and renders a live *"N correct answers marked (minimum 2)"*
   badge next to the options.
3. `assertQuizQuestionIsSubmittable` (`quiz-helpers.ts`) is called by
   `toQuizQuestionPayload` / `toQuizQuestionUpdatePayload` and throws a
   `QuizQuestionValidationError` when a multiple-choice question with fewer
   than two correct answers is about to be sent to the API.

> **Known backend gap.** The backend's `validateOptions`
> (`src/controllers/contentwriter/createQuizQuestionController.ts`) still only
> requires `correctCount >= 1` for `CHECKBOX`, so a request sent straight to
> `POST /createQuizQuestion` (or `PUT /updateQuizQuestion/:id`) bypasses the
> frontend guard and can still create a multiple-choice question with a single
> correct answer. Closing that gap needs a backend change; until then the
> guard in point 3 is what keeps the authoring UI honest.

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

| `POST /clonecourse` | JSON `{ courseId, courseName, modules: [{ moduleId, taskIds }] }`. The source course must be `ARCHIVE`; the clone is created as `ACTIVE`. Returns `{ success, data: { courseId, modules: [{ moduleId, tasks: [{ taskId, taskName, type, status }] }] } }` — the modules/tasks are echoed in the **requested order**. |

## Cloning an archived course

`content-writer/CloneCourseModal.tsx` clones an archived course into a new
active one.

The backend clone only duplicates the course/module/task **shells**. A `QUIZ`
task's questions live in their own collection and are therefore **not** copied —
without extra work the cloned quiz opens empty for the assigned employee. The
modal compensates on the frontend:

1. The task rows are labelled by type, so a `QUIZ` task shows a **Quiz** badge
   (not `Link`).
2. After `POST /clonecourse` succeeds, every cloned `QUIZ` task is paired with
   its source task (the response echoes the modules/tasks in the requested
   order, so they are paired by position and cross-checked by `type`).
3. For each pair, `copyQuizQuestionsToTask(sourceTaskId, targetTaskId)`
   (`src/services/user-services.ts`) reads the source questions with
   `GET /getAllQuizQuestions/:taskId` and re-creates them on the cloned task
   with `POST /createQuizQuestion` — the same endpoints the authoring page
   uses, so no backend change is needed.

While the copy runs the modal stays locked (`Copying Quiz Questions...`). If a
question cannot be copied, the course is still reported as cloned but the toast
names the quizzes that need attention.

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
`${BASE_URL}/getCourseTaskContent/:id?auth_token=<token>` and we
`window.open(...)` it. Everything is proxied through the backend — the frontend
never holds the raw file/link; the backend decides whether to redirect (links)
or stream (files). The token is in the query string because a new tab cannot
send custom headers.

`QUIZ` tasks have no `content` to proxy, so their card shows an **Edit questions**
action that routes to the quiz authoring page (carrying `taskId`/`courseId`)
instead of opening the proxy — hitting `/getCourseTaskContent/:id` for a quiz
otherwise 404s with `Task not found !`.

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
| `course-portal/QuizTaskViewer.tsx` | The learner-facing QUIZ experience: questions + **Validate** → review with **Re-attempt** / **Submit**. Talks only to the employee quiz endpoints (no answer key until validation). |
| `course-portal/quiz-attempt.ts` | Pure helpers: build the `validateQuiz` answers payload and recover the failed-submit result from the 400 response. Unit-tested in `quiz-attempt.test.ts`. |
| `course-portal/task-content.ts` | Pure resolver: task -> how to render it. Unit-tested in `task-content.test.ts`. |
| `course-portal/course-status.ts` | Shared status colour/label/due-date helpers used by both the list and the player. |

Data layer:
- Services: `src/services/user-services.ts` (`getMyAssignedCourses`, `getMyAssignedCourseById`, `updateMyTaskProgress`, `getQuizById`, `validateQuiz`, `submitQuiz`).
- Query hooks: `useGetMyAssignedCourses`, `useGetMyAssignedCourse`, `useGetQuiz` (`hooks/queries/useUserQueries.ts`).
- Mutation hook: `useUpdateMyTaskProgress` (`hooks/mutations/useUserMutations.ts`) — invalidates both `myCourse(id)` and `myCourses`; plus `useValidateQuiz` / `useSubmitQuiz`.
- Types: `src/interfaces/course-assignment.ts` (`AssignedCourse`, `AssignedCourseDetail`, `AssignedModule`, `AssignedTask`, `CourseProgress`, `CourseAssignmentStatus`) and — for quizzes — `src/interfaces/quiz.ts` (`QuizAttempt`, `QuizAttemptQuestion`, `QuizValidationResult`, `QuizSubmitResult`, …). Deliberately **separate** from `contentwriter.ts` — those are the authoring shapes and carry S3 keys the employee never receives.

## Backend contract (SRYTAL-BE, mounted at `/`)

| Endpoint | Notes |
| --- | --- |
| `GET /getMyAssignedCourses` | `{ success, courses }`. Summary only (no module/task tree) — status, progress, `totalModules`, `isOverdue`, signed `thumbnailUrl`. |
| `GET /getMyAssignedCourseById/:courseAssignmentId` | `{ success, course }` with the full `modules[] -> tasks[]` tree and per-task `isCompleted`. **404** if the assignment isn't the caller's. |
| `PUT /updateMyTaskProgress` | JSON `{ courseAssignmentId, taskId, isCompleted }`. Upserts the progress row and returns the recomputed `{ courseStatus, progress }`. |
| `GET /getQuizById/:taskId` | `{ success, data: { taskId, attemptId, taskName, totalQuestions, questions } }`. Employee-safe: questions/options are shuffled and carry **no** answer key (`optionId` + `value` only). **Every call mints a new `attemptId`** (pushed onto the progress row), so it must only run when a fresh attempt is actually wanted. |
| `POST /validateQuiz` | JSON `{ taskId, attemptId, answers: [{ questionId, selectedOptionIds?, textAnswer? }] }` → `{ success, data }` with the score and a per-question `review` (reveals `correctOptionIds`). Must run before `submitQuiz`; revalidating the same attempt is allowed. |
| `POST /submitQuiz` | JSON `{ taskId, attemptId }` → `{ success, data }`. A passing (or unscored) score finalizes the attempt and completes the task server-side. A **failing** score answers **400** with the result on `error.response.data.data` (`reattemptRequired: true`); the attempt is not finalized. A finalized attempt re-submits idempotently (`alreadySubmitted: true`); re-validating it answers **409**. |

Task content still goes through the content-writer proxy:
`GET /getCourseTaskContent/:id` (see `getCourseTaskContentUrl`).

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

## Taking a QUIZ task

`QUIZ` tasks render `QuizTaskViewer` instead of a media surface. The flow mirrors
the backend's two-step contract:

1. On mount it calls `useGetQuiz(task._id, !task.isCompleted)`, which fetches
   `getQuizById` **once** and mints an `attemptId`. Because every fetch mints a
   new attempt, that query is deliberately inert (`staleTime: Infinity`,
   `refetchOnWindowFocus/Reconnect: false`, `retry: false`) and is only re-run by
   an explicit `refetch()`.
2. **Validate** sends the answers (`buildQuizAnswers`) to `validateQuiz` and
   switches to a review state: each question shows a Correct/Incorrect badge and
   each option is tagged `Correct` / `Your answer` (on the right; untouched
   options are left untagged). A **validated** score summary is shown but the
   passing threshold is intentionally hidden from the learner.
3. **Submit** finalizes via `submitQuiz`. On a pass the viewer calls `onPassed`,
   which flows into the player's normal `updateMyTaskProgress` completion path;
   on a fail (400 with `reattemptRequired`) it shows the score and offers only
   **Re-attempt**. **Re-attempt** clears local state and `refetch()`es to mint a
   fresh attempt. After a *successful* submit both Re-attempt and Submit are
   hidden.
4. A quiz that is already `isCompleted` is not fetched at all — it shows a
   "Quiz completed" card.

The player hides its **Complete and continue** / **Mark as incomplete** toggle
for `QUIZ` tasks: a quiz is completed by passing it, never by ticking it off. It
also hides the **Course content** panel (and its mobile drawer trigger) while a
quiz is the active task, so the quiz uses the full width.
