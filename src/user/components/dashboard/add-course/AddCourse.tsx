import {
  Container,
  Card,
  Stack,
  Title,
  Text,
  TextInput,
  Group,
  FileInput,
  Image,
  Box,
  Paper,
  ActionIcon,
  Badge,
  Divider
} from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import { Placeholder } from '@tiptap/extensions';
import {
  IconUpload,
  IconX,
  IconArrowLeft,
  IconPhoto,
  IconCheck
} from '@tabler/icons-react';
import React, { useReducer, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import { useAddCourse } from '@hooks/mutations/useUserMutations';
import { CommonButton } from '@components/common/button/CommonButton';
import { getErrorMessage } from '@utils/common/get-error-message';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const { mutateAsync: addCourse, isPending: isSubmitting } = useAddCourse();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [, forceDescriptionCheck] = useReducer((tick: number) => tick + 1, 0);

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
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: 'Write your course description here...'
      })
    ],
    onUpdate: () => forceDescriptionCheck(),
    onTransaction: () => forceDescriptionCheck(),
    onSelectionUpdate: () => forceDescriptionCheck()
  });

  const handleToolbarMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.mantine-RichTextEditor-control') ||
      target.closest('.mantine-RichTextEditor-controlsGroup')
    ) {
      setTimeout(() => {
        if (editor && !editor.isFocused) {
          editor.commands?.focus();
        }
      }, 0);
    }
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnailFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = async () => {
    const description = editor?.getHTML() || '';
    try {
      await addCourse({
        name: courseName,
        description,
        image: thumbnailFile
      });
      showSuccessToast('Course added successfully!');
      navigate(-1);
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to add course'));
    }
  };

  const isFormValid = Boolean(
    courseName.trim() && thumbnailFile && editor?.getText().trim()
  );

  return (
    <Container
      size='lg'
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <Stack gap='lg'>
        {/* Header */}
        <Stack gap='sm'>
          <Group justify='space-between' align='flex-start' wrap='wrap'>
            <Group gap='sm' align='flex-start' style={{ flex: 1 }}>
              <ActionIcon
                variant='subtle'
                color='gray'
                size={isMobile ? 'md' : 'lg'}
                onClick={() => navigate(-1)}
                mt={{ base: 4, sm: 0 }}
              >
                <IconArrowLeft size={isMobile ? 18 : 20} />
              </ActionIcon>
              <Stack gap={4} style={{ flex: 1 }}>
                <Title order={isMobile ? 2 : 1}>Create New Course</Title>
                <Text size={isMobile ? 'xs' : 'sm'} c='dimmed'>
                  Fill in the details below to create a new course
                </Text>
              </Stack>
            </Group>
            <Badge
              size={isMobile ? 'md' : 'lg'}
              variant='light'
              color='blue'
              mt={{ base: 'xs', sm: 0 }}
            >
              Draft
            </Badge>
          </Group>
          <Divider />
        </Stack>

        {/* Main Form */}
        <Card
          shadow='sm'
          p={{ base: 'md', sm: 'xl' }}
          radius='md'
          withBorder
          style={{
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Stack gap='lg'>
            {/* Course Name */}
            <Box>
              <TextInput
                label='Course Name'
                placeholder='Enter course name'
                size={isMobile ? 'sm' : 'md'}
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
                required
                description='Give your course a clear and descriptive name'
                styles={{
                  input: {
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color,
                    borderColor: currentThemeConfig.borderColor || '#ccc'
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: currentThemeConfig.color
                  },
                  description: {
                    color: currentThemeConfig.color,
                    fontSize: isMobile ? '11px' : '13px'
                  }
                }}
              />
            </Box>

            {/* Thumbnail Upload */}
            <Box>
              <Text
                size={isMobile ? 'sm' : 'md'}
                fw={600}
                mb='xs'
                c={currentThemeConfig.color}
              >
                Course Thumbnail{' '}
                <Text component='span' c='red'>
                  *
                </Text>
              </Text>
              <Text size={isMobile ? 'xs' : 'sm'} c={'dimmed'} mb='md'>
                Upload a high-quality image that represents your course
                {!isMobile && ' (Recommended: 1280x720px)'}
              </Text>

              {!thumbnailPreview ? (
                <FileInput
                  placeholder='Click to upload or drag and drop'
                  accept='image/*'
                  value={thumbnailFile}
                  onChange={handleThumbnailChange}
                  leftSection={<IconUpload size={isMobile ? 16 : 18} />}
                  size={isMobile ? 'sm' : 'md'}
                  styles={{
                    input: {
                      cursor: 'pointer',
                      minHeight: isMobile ? '80px' : '120px',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: currentThemeConfig.headerBackgroundColor,
                      color: currentThemeConfig.color,
                      borderColor: currentThemeConfig.borderColor,
                      fontSize: isMobile ? '12px' : '14px'
                    }
                  }}
                />
              ) : (
                <Paper
                  radius='md'
                  withBorder
                  p={isMobile ? 'sm' : 'md'}
                  style={{
                    position: 'relative',
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color,
                    borderColor: currentThemeConfig.borderColor
                  }}
                >
                  <Stack gap='md'>
                    <Group
                      gap={isMobile ? 'sm' : 'md'}
                      align='center'
                      wrap={isMobile ? 'wrap' : 'nowrap'}
                    >
                      <Image
                        src={thumbnailPreview}
                        height={isMobile ? 80 : 120}
                        style={{ maxWidth: isMobile ? '100%' : '200px' }}
                        radius='md'
                        fit='cover'
                        alt='Course thumbnail'
                      />
                      <Stack gap='xs' style={{ flex: 1, minWidth: 0 }}>
                        <Text
                          size={isMobile ? 'xs' : 'sm'}
                          fw={500}
                          c={currentThemeConfig.color}
                          lineClamp={1}
                        >
                          {thumbnailFile?.name}
                        </Text>
                        <Text size='xs' c={'dimmed'}>
                          {thumbnailFile
                            ? (thumbnailFile.size / 1024 / 1024).toFixed(2)
                            : 0}{' '}
                          MB
                        </Text>
                        <CommonButton
                          variant='light'
                          color='red'
                          size='xs'
                          leftSection={<IconX size={12} />}
                          onClick={handleRemoveThumbnail}
                          style={{ width: 'fit-content' }}
                        >
                          Remove
                        </CommonButton>
                      </Stack>
                    </Group>
                  </Stack>
                </Paper>
              )}
            </Box>

            {/* Course Description */}
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
                  margin-right: ${isMobile ? '4px' : '10px'} !important;
                  padding-right: ${isMobile ? '4px' : '10px'} !important;
                  border-right: 1px solid ${currentThemeConfig.borderColor} !important;
                  gap: 4px !important;
                }
                .mantine-RichTextEditor-controlsGroup:last-child {
                  margin-right: 0 !important;
                  padding-right: 0 !important;
                  border-right: none !important;
                }
              `}</style>
              <Text
                size={isMobile ? 'sm' : 'md'}
                fw={600}
                mb='xs'
                c={currentThemeConfig.color}
              >
                Course Description{' '}
                <Text component='span' c='red'>
                  *
                </Text>
              </Text>
              <Text size={isMobile ? 'xs' : 'sm'} c={'dimmed'} mb='md'>
                Provide a detailed description of what students will learn
              </Text>

              <RichTextEditor
                editor={editor}
                styles={{
                  root: {
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color,
                    borderColor: currentThemeConfig.borderColor,
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    fontSize: isMobile ? '13px' : '14px'
                  },
                  toolbar: {
                    backgroundColor: currentThemeConfig.cardBackground,
                    color: currentThemeConfig.color,
                    borderBottom: `1px solid ${currentThemeConfig.borderColor}`,
                    padding: isMobile ? '6px 8px' : '10px 14px',
                    gap: isMobile ? '6px' : '10px',
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
                    minHeight: isMobile ? 150 : 200,
                    padding: isMobile ? '0.5rem' : '1rem',
                    fontSize: isMobile ? '13px' : '14px',
                    lineHeight: 1.6
                  }
                }}
              >
                <RichTextEditor.Toolbar
                  sticky
                  stickyOffset={isMobile ? 0 : 60}
                  onMouseDown={handleToolbarMouseDown}
                >
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
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
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content
                  style={{
                    minHeight: isMobile ? '200px' : '300px',
                    maxHeight: isMobile ? '400px' : '500px',
                    overflowY: 'auto'
                  }}
                />
              </RichTextEditor>
            </Box>
          </Stack>
        </Card>

        {/* Action Buttons */}
        <Card shadow='sm' p={{ base: 'md', sm: 'lg' }} radius='md' withBorder>
          <Group justify='space-between' wrap='wrap'>
            <CommonButton
              variant='default'
              onClick={() => navigate(-1)}
              fullWidth={isMobile}
            >
              Cancel
            </CommonButton>
            <CommonButton
              leftSection={<IconCheck size={18} />}
              disabled={!isFormValid || isSubmitting}
              onClick={handleSubmit}
              fullWidth={isMobile}
            >
              {isSubmitting ? 'Creating...' : 'Create Course'}
            </CommonButton>
          </Group>
        </Card>

        {/* Help Card */}
        <Card
          shadow='sm'
          p={{ base: 'md', sm: 'lg' }}
          radius='md'
          withBorder
          bg='blue.0'
        >
          <Group gap={isMobile ? 'sm' : 'md'} align='flex-start'>
            <IconPhoto size={isMobile ? 24 : 32} color='#228BE6' />
            <Stack gap={4} style={{ flex: 1 }}>
              <Text size={isMobile ? 'xs' : 'sm'} fw={600}>
                Tips for a Great Course
              </Text>
              <Text size='xs' c='dimmed' style={{ lineHeight: 1.6 }}>
                • Use a clear, high-resolution thumbnail image
                <br />
                • Write a compelling description that highlights key learning
                outcomes
                <br />
                • Keep your course name concise and descriptive
                <br />• Include what students will achieve after completing the
                course
              </Text>
            </Stack>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
};

export default AddCourse;
