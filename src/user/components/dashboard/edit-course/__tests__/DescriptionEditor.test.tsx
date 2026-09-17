import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { act } from 'react';
import DescriptionEditor from '../DescriptionEditor';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      headerBackgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

let mockOnUpdate: ((e: { editor: any }) => void) | null = null;
const setContentSpy = jest.fn();
const mockEditor = {
  getHTML: jest.fn(() => ''),
  commands: {
    setContent: setContentSpy
  }
};

jest.mock('@tiptap/react', () => ({
  useEditor: (opts: any) => {
    mockOnUpdate = opts.onUpdate;
    return mockEditor;
  }
}));

jest.mock('@tiptap/starter-kit', () => jest.fn());
jest.mock('@tiptap/extension-underline', () => jest.fn());
jest.mock('@tiptap/extension-superscript', () => jest.fn());
jest.mock('@tiptap/extension-subscript', () => jest.fn());
jest.mock('@tiptap/extension-highlight', () => jest.fn());
jest.mock('@tiptap/extension-text-align', () => ({
  configure: jest.fn(() => ({}))
}));

jest.mock('@mantine/tiptap', () => {
  const RTE: any = ({ children }: any) => (
    <div data-testid='rich-text-editor'>{children}</div>
  );
  RTE.Toolbar = ({ children }: any) => (
    <div data-testid='rte-toolbar'>{children}</div>
  );
  RTE.ControlsGroup = ({ children }: any) => <div>{children}</div>;
  RTE.Content = () => <div data-testid='rte-content' />;
  [
    'Bold',
    'Italic',
    'Underline',
    'Strikethrough',
    'ClearFormatting',
    'Highlight',
    'H1',
    'H2',
    'H3',
    'H4',
    'BulletList',
    'OrderedList',
    'Link',
    'Unlink',
    'AlignLeft',
    'AlignCenter',
    'AlignJustify',
    'AlignRight',
    'Undo',
    'Redo'
  ].forEach(name => {
    RTE[name] = () => null;
  });
  return { RichTextEditor: RTE, Link: jest.fn() };
});

const renderEditor = (
  props: Partial<Parameters<typeof DescriptionEditor>[0]> = {}
) => {
  return render(
    <MantineProvider>
      <DescriptionEditor
        label='Description'
        value='<p>Initial content</p>'
        onChange={jest.fn()}
        {...props}
      />
    </MantineProvider>
  );
};

describe('DescriptionEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnUpdate = null;
    setContentSpy.mockClear();
  });

  describe('Rendering', () => {
    it('renders the label text', () => {
      renderEditor({ label: 'Course Description' });
      expect(screen.getByText('Course Description')).toBeInTheDocument();
    });

    it('shows a required asterisk when required is true', () => {
      renderEditor({ label: 'Description', required: true });
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('does not show a required asterisk by default', () => {
      renderEditor({ label: 'Description' });
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('renders the rich text editor, toolbar and content area', () => {
      renderEditor();
      expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
      expect(screen.getByTestId('rte-toolbar')).toBeInTheDocument();
      expect(screen.getByTestId('rte-content')).toBeInTheDocument();
    });
  });

  describe('onChange callback', () => {
    it('calls onChange with the editor HTML when onUpdate fires', () => {
      const onChange = jest.fn();
      renderEditor({ onChange });

      act(() => {
        mockOnUpdate?.({
          editor: { getHTML: () => '<p>Typed text</p>' }
        });
      });

      expect(onChange).toHaveBeenCalledWith('<p>Typed text</p>');
    });
  });

  describe('resetKey seeding', () => {
    it('calls setContent when resetKey changes and content differs', () => {
      const { rerender } = renderEditor({
        value: '<p>Original</p>',
        resetKey: 'record-1'
      });

      // On mount, the effect seeds content.
      expect(setContentSpy).toHaveBeenCalledWith('<p>Original</p>', {
        emitUpdate: false
      });

      setContentSpy.mockClear();

      rerender(
        <MantineProvider>
          <DescriptionEditor
            label='Description'
            value='<p>Updated content</p>'
            onChange={jest.fn()}
            resetKey='record-2'
          />
        </MantineProvider>
      );

      expect(setContentSpy).toHaveBeenCalledWith('<p>Updated content</p>', {
        emitUpdate: false
      });
    });

    it('does not re-seed when resetKey is unchanged', () => {
      const { rerender } = renderEditor({
        value: '<p>Same</p>',
        resetKey: 'record-1'
      });

      setContentSpy.mockClear();

      rerender(
        <MantineProvider>
          <DescriptionEditor
            label='Description'
            value='<p>Same</p>'
            onChange={jest.fn()}
            resetKey='record-1'
          />
        </MantineProvider>
      );

      expect(setContentSpy).not.toHaveBeenCalled();
    });
  });
});
