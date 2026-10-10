import { useEffect, useState, MouseEvent } from 'react';
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
  resetKey?: string | number;
  required?: boolean;
}

const DescriptionEditor = ({
  label,
  value,
  onChange,
  resetKey,
  required
}: DescriptionEditorProps) => {
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [, forceUpdate] = useState({});

  const activeBg =
    currentThemeConfig?.button?.color || 'var(--mantine-color-indigo-6)';
  const activeText = currentThemeConfig?.button?.textColor || '#ffffff';

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
    onUpdate: ({ editor: instance }) => onChange(instance.getHTML()),
    onTransaction: () => forceUpdate({}),
    onSelectionUpdate: () => forceUpdate({})
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

  const handleToolbarMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.mantine-RichTextEditor-control') ||
      target.closest('.mantine-RichTextEditor-controlsGroup')
    ) {
      setTimeout(() => {
        if (editor && !editor.isFocused) {
          editor.commands.focus();
        }
      }, 0);
    }
  };

  return (
    <Box>
      <style>{`
        .mantine-RichTextEditor-control[data-active],
        .mantine-RichTextEditor-control[data-active="true"],
        .mantine-RichTextEditor-control[aria-pressed="true"],
        button[data-active="true"].mantine-RichTextEditor-control {
          background-color: ${activeBg} !important;
          color: ${activeText} !important;
          font-weight: 600 !important;
          box-shadow: 0 2px 8px ${activeBg}45 !important;
        }
        .mantine-RichTextEditor-control[data-active] svg,
        .mantine-RichTextEditor-control[data-active="true"] svg,
        .mantine-RichTextEditor-control[aria-pressed="true"] svg {
          color: ${activeText} !important;
          stroke: ${activeText} !important;
        }
        .mantine-RichTextEditor-control:hover:not([data-active]):not([aria-pressed="true"]) {
          background-color: ${activeBg}20 !important;
        }
        .mantine-RichTextEditor-controlsGroup {
          gap: 4px !important;
        }
        .mantine-RichTextEditor-controlsGroup:last-child {
          margin-right: 0 !important;
          padding-right: 0 !important;
          border-right: none !important;
        }
      `}</style>
      <Text
        size='sm'
        fw={600}
        mb={6}
        style={{ color: currentThemeConfig.color }}
      >
        {label}
        {required && (
          <Text component='span' c='red' fw={700}>
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
            borderColor: currentThemeConfig.borderColor,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
          },
          toolbar: {
            backgroundColor: currentThemeConfig.cardBackground,
            color: currentThemeConfig.color,
            borderBottom: `1px solid ${currentThemeConfig.borderColor}`,
            padding: isMobile ? '6px 8px' : '10px 14px',
            gap: isMobile ? '6px' : '5px',
            flexWrap: 'wrap'
          },
          control: {
            color: currentThemeConfig.color,
            border: 'none',
            borderRadius: '6px',
            minWidth: isMobile ? '28px' : '32px',
            minHeight: isMobile ? '28px' : '32px',
            transition: 'all 0.15s ease'
          },
          content: {
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            padding: isMobile ? '0.75rem' : '1rem',
            fontSize: isMobile ? '13px' : '14px',
            lineHeight: 1.6
          }
        }}
      >
        <RichTextEditor.Toolbar onMouseDown={handleToolbarMouseDown}>
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
            minHeight: isMobile ? 140 : 180,
            maxHeight: isMobile ? 240 : 320,
            overflowY: 'auto'
          }}
        />
      </RichTextEditor>
    </Box>
  );
};

export default DescriptionEditor;
