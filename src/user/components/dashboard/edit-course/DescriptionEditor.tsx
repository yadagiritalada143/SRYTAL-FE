import { useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import { useMediaQuery } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';

interface DescriptionEditorProps {
  label: string;
  /** HTML string. Re-applied to the editor whenever `resetKey` changes. */
  value: string;
  onChange: (html: string) => void;
  /**
   * Change this to push `value` back into the editor — used when a modal
   * reopens on a different record and the editor instance is reused.
   */
  resetKey?: string;
  required?: boolean;
}

/**
 * Rich-text editor for course descriptions. Descriptions are stored as HTML,
 * so edits have to go through the same editor used when creating a course.
 */
const DescriptionEditor = ({
  label,
  value,
  onChange,
  resetKey,
  required
}: DescriptionEditorProps) => {
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: value,
    onUpdate: ({ editor: instance }) => onChange(instance.getHTML())
  });

  // Seed the editor when it first mounts for a given record. Guarded on the
  // current HTML so typing does not fight the effect.
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, resetKey]);

  return (
    <Box>
      <Text size='sm' fw={500} mb={6} c={currentThemeConfig.color}>
        {label}
        {required && (
          <Text component='span' c='red'>
            {' '}
            *
          </Text>
        )}
      </Text>
      <RichTextEditor
        editor={editor}
        styles={{
          root: {
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          },
          toolbar: {
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            border: 'none',
            padding: isMobile ? '4px' : '6px',
            gap: isMobile ? '2px' : '4px',
            flexWrap: 'wrap'
          },
          control: {
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            border: 'none',
            minWidth: isMobile ? '26px' : '30px',
            minHeight: isMobile ? '26px' : '30px'
          },
          content: {
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            padding: isMobile ? '0.5rem' : '0.75rem',
            fontSize: isMobile ? '13px' : '14px'
          }
        }}
      >
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content
          style={{
            minHeight: isMobile ? 140 : 200,
            maxHeight: isMobile ? 240 : 320,
            overflowY: 'auto'
          }}
        />
      </RichTextEditor>
    </Box>
  );
};

export default DescriptionEditor;
