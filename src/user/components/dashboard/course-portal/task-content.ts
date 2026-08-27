import { AssignedTask } from '@interfaces/course-assignment';

/**
 * Works out how a task's content should be rendered in the course player.
 *
 * A task is either a LINK (an external URL) or a FILE (streamed from S3 through
 * `/contentwriter/getCourseTaskContent/:id`). Most providers refuse to be framed
 * — only the ones with a documented embed player below are shown inline; every
 * other link falls back to an "open in a new tab" card rather than rendering a
 * frame the browser will silently blank out.
 */
export type TaskContentKind =
  | 'video'
  | 'audio'
  | 'image'
  | 'pdf'
  | 'text'
  | 'embed'
  | 'external'
  | 'download';

export interface ResolvedTaskContent {
  kind: TaskContentKind;
  /** The URL to feed to the player/frame/link. */
  url: string;
  /** Human label for the content type, shown next to the task title. */
  label: string;
  /** Set when the content can only be opened outside the app. */
  externalUrl?: string;
}

const EXTENSION_MIME_TYPES: Record<string, string> = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogv: 'video/ogg',
  mov: 'video/quicktime',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  m4a: 'audio/mp4',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  txt: 'text/plain',
  md: 'text/markdown',
  csv: 'text/csv',
  html: 'text/html'
};

const extensionOf = (name?: string) => {
  const match = /\.([a-z0-9]+)(?:$|\?)/i.exec(name || '');
  return match ? match[1].toLowerCase() : '';
};

/** `contentMimeType` is set at upload time but older tasks may not have one. */
const mimeTypeOf = (task: AssignedTask) =>
  task.contentMimeType ||
  EXTENSION_MIME_TYPES[extensionOf(task.contentFileName)] ||
  '';

const kindForMimeType = (mimeType: string): TaskContentKind => {
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('text/')) return 'text';
  // Office documents and archives have no in-browser viewer we can point at:
  // the content URL is authenticated, so third-party preview services (Office
  // Online, Google Docs viewer) cannot reach it.
  return 'download';
};

const CONTENT_LABELS: Record<TaskContentKind, string> = {
  video: 'Video',
  audio: 'Audio',
  image: 'Image',
  pdf: 'PDF',
  text: 'Document',
  embed: 'Video',
  external: 'Link',
  download: 'File'
};

/** youtube.com/watch?v=, youtu.be/, /embed/, /shorts/ and /live/ all resolve. */
const youTubeId = (url: URL): string => {
  if (url.hostname.endsWith('youtu.be')) return url.pathname.slice(1);
  if (!url.hostname.includes('youtube.com')) return '';
  if (url.pathname === '/watch') return url.searchParams.get('v') || '';
  const match = /^\/(?:embed|shorts|live|v)\/([^/?]+)/.exec(url.pathname);
  return match ? match[1] : '';
};

const vimeoId = (url: URL): string => {
  if (!url.hostname.includes('vimeo.com')) return '';
  const match = /^\/(?:video\/)?(\d+)/.exec(url.pathname);
  return match ? match[1] : '';
};

/** Google Drive share links have a documented `/preview` frame variant. */
const googleDrivePreviewUrl = (url: URL): string => {
  if (!url.hostname.includes('drive.google.com')) return '';
  const match = /\/file\/d\/([^/]+)/.exec(url.pathname);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : '';
};

const resolveLink = (link: string): ResolvedTaskContent => {
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    // Not a URL we can reason about — hand it to the browser as-is.
    return { kind: 'external', url: link, label: 'Link', externalUrl: link };
  }

  const youTube = youTubeId(url);
  if (youTube) {
    return {
      kind: 'embed',
      url: `https://www.youtube.com/embed/${youTube}`,
      label: 'Video',
      externalUrl: link
    };
  }

  const vimeo = vimeoId(url);
  if (vimeo) {
    return {
      kind: 'embed',
      url: `https://player.vimeo.com/video/${vimeo}`,
      label: 'Video',
      externalUrl: link
    };
  }

  const drivePreview = googleDrivePreviewUrl(url);
  if (drivePreview) {
    return {
      kind: 'embed',
      url: drivePreview,
      label: 'Document',
      externalUrl: link
    };
  }

  // A link straight to a media file plays inline just like an upload would.
  const mimeType = EXTENSION_MIME_TYPES[extensionOf(url.pathname)];
  if (mimeType) {
    const kind = kindForMimeType(mimeType);
    if (kind !== 'download' && kind !== 'text') {
      return {
        kind,
        url: link,
        label: CONTENT_LABELS[kind],
        externalUrl: link
      };
    }
  }

  return { kind: 'external', url: link, label: 'Article', externalUrl: link };
};

export const resolveTaskContent = (
  task: AssignedTask,
  fileUrl: string
): ResolvedTaskContent => {
  if (task.type === 'LINK') {
    return resolveLink(task.link || '');
  }

  const kind = kindForMimeType(mimeTypeOf(task));
  return { kind, url: fileUrl, label: CONTENT_LABELS[kind] };
};
