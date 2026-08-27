import { resolveTaskContent } from './task-content';
import { AssignedTask } from '@interfaces/course-assignment';

const FILE_URL = 'http://api.test/contentwriter/getCourseTaskContent/t1?auth_token=x';

const task = (overrides: Partial<AssignedTask>): AssignedTask => ({
  _id: 't1',
  taskName: 'Task',
  taskDescription: '',
  isCompleted: false,
  ...overrides
});

describe('resolveTaskContent — LINK tasks', () => {
  it.each([
    ['https://www.youtube.com/watch?v=hdI2bqOjy3c', 'hdI2bqOjy3c'],
    ['https://youtu.be/hdI2bqOjy3c', 'hdI2bqOjy3c'],
    ['https://www.youtube.com/embed/hdI2bqOjy3c', 'hdI2bqOjy3c'],
    ['https://www.youtube.com/shorts/hdI2bqOjy3c', 'hdI2bqOjy3c'],
    ['https://youtube.com/watch?v=hdI2bqOjy3c&t=42s', 'hdI2bqOjy3c']
  ])('embeds the YouTube url %s', (link, id) => {
    const resolved = resolveTaskContent(task({ type: 'LINK', link }), FILE_URL);
    expect(resolved.kind).toBe('embed');
    expect(resolved.url).toBe(`https://www.youtube.com/embed/${id}`);
    expect(resolved.externalUrl).toBe(link);
  });

  it('embeds Vimeo videos', () => {
    const resolved = resolveTaskContent(
      task({ type: 'LINK', link: 'https://vimeo.com/76979871' }),
      FILE_URL
    );
    expect(resolved).toMatchObject({
      kind: 'embed',
      url: 'https://player.vimeo.com/video/76979871'
    });
  });

  it('uses the preview frame for Google Drive files', () => {
    const resolved = resolveTaskContent(
      task({ type: 'LINK', link: 'https://drive.google.com/file/d/abc123/view?usp=sharing' }),
      FILE_URL
    );
    expect(resolved).toMatchObject({
      kind: 'embed',
      url: 'https://drive.google.com/file/d/abc123/preview'
    });
  });

  it('plays a link that points straight at a media file', () => {
    const resolved = resolveTaskContent(
      task({ type: 'LINK', link: 'https://cdn.test/intro.mp4' }),
      FILE_URL
    );
    expect(resolved.kind).toBe('video');
    expect(resolved.url).toBe('https://cdn.test/intro.mp4');
  });

  it('falls back to opening an ordinary article externally', () => {
    const link = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide';
    const resolved = resolveTaskContent(task({ type: 'LINK', link }), FILE_URL);
    expect(resolved).toMatchObject({ kind: 'external', externalUrl: link });
  });

  it('does not throw on a malformed url', () => {
    const resolved = resolveTaskContent(
      task({ type: 'LINK', link: 'not a url' }),
      FILE_URL
    );
    expect(resolved.kind).toBe('external');
  });
});

describe('resolveTaskContent — FILE tasks', () => {
  it.each([
    ['video/mp4', 'video'],
    ['audio/mpeg', 'audio'],
    ['image/png', 'image'],
    ['application/pdf', 'pdf'],
    ['text/plain', 'text']
  ])('renders %s inline as %s', (contentMimeType, kind) => {
    const resolved = resolveTaskContent(
      task({ type: 'FILE', contentMimeType }),
      FILE_URL
    );
    expect(resolved.kind).toBe(kind);
    expect(resolved.url).toBe(FILE_URL);
  });

  it('offers Office documents as a download — they have no in-browser viewer', () => {
    const resolved = resolveTaskContent(
      task({
        type: 'FILE',
        contentMimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }),
      FILE_URL
    );
    expect(resolved.kind).toBe('download');
  });

  it('falls back to the file extension when the mime type is missing', () => {
    const resolved = resolveTaskContent(
      task({ type: 'FILE', contentFileName: 'lesson-notes.pdf' }),
      FILE_URL
    );
    expect(resolved.kind).toBe('pdf');
  });

  it('treats an unknown, unnamed file as a download', () => {
    expect(resolveTaskContent(task({ type: 'FILE' }), FILE_URL).kind).toBe('download');
  });
});
