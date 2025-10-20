import {
  Container,
  Card,
  Stack,
  Title,
  Text,
  TextInput,
  Button,
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
import {
  IconUpload,
  IconX,
  IconPhoto,
  IconArrowLeft,
  IconCheck
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { useMediaQuery } from '@mantine/hooks';

export const ContentWriterAddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

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
    content: '<p>Write your course description here...</p>'
  });

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

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
    setIsSubmitting(true);

    // Get the HTML content from the editor
    const description = editor?.getHTML() || '';

    // Create form data for submission
    const formData = {
      courseName,
      description,
      thumbnail: thumbnailFile
    };

    console.log('Form Data:', formData);

    // Add your API call here
    // await createCourse(formData);

    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or redirect
    }, 1500);
  };

  const isFormValid =
    courseName.trim() && thumbnailFile && editor?.getText().trim();

  return (
    <Container
      size="lg"
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <Stack gap="lg">
        {/* Header */}
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start" wrap="wrap">
            <Group gap="sm" align="flex-start" style={{ flex: 1 }}>
              <ActionIcon
                variant="subtle"
                color="gray"
                size={isMobile ? 'md' : 'lg'}
                onClick={() => window.history.back()}
                mt={{ base: 4, sm: 0 }}
              >
                <IconArrowLeft size={isMobile ? 18 : 20} />
              </ActionIcon>
              <Stack gap={4} style={{ flex: 1 }}>
                <Title order={isMobile ? 2 : 1}>Create New Course</Title>
                <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                  Fill in the details below to create a new course
                </Text>
              </Stack>
            </Group>
            <Badge
              size={isMobile ? 'md' : 'lg'}
              variant="light"
              color="blue"
              mt={{ base: 'xs', sm: 0 }}
            >
              Draft
            </Badge>
          </Group>
          <Divider />
        </Stack>

        {/* Main Form */}
        <Card
          shadow="sm"
          p={{ base: 'md', sm: 'xl' }}
          radius="md"
          withBorder
          style={{
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Stack gap="lg">
            {/* Course Name */}
            <Box>
              <TextInput
                label="Course Name"
                placeholder="Enter course name"
                size={isMobile ? 'sm' : 'md'}
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
                required
                description="Give your course a clear and descriptive name"
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
                mb="xs"
                c={currentThemeConfig.color}
              >
                Course Thumbnail{' '}
                <Text component="span" c="red">
                  *
                </Text>
              </Text>
              <Text size={isMobile ? 'xs' : 'sm'} c={'dimmed'} mb="md">
                Upload a high-quality image that represents your course
                {!isMobile && ' (Recommended: 1280x720px)'}
              </Text>

              {!thumbnailPreview ? (
                <FileInput
                  placeholder="Click to upload or drag and drop"
                  accept="image/*"
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
                  radius="md"
                  withBorder
                  p={isMobile ? 'sm' : 'md'}
                  style={{
                    position: 'relative',
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color,
                    borderColor: currentThemeConfig.borderColor
                  }}
                >
                  <Stack gap="md">
                    <Group
                      gap={isMobile ? 'sm' : 'md'}
                      align="center"
                      wrap={isMobile ? 'wrap' : 'nowrap'}
                    >
                      <Image
                        src={thumbnailPreview}
                        height={isMobile ? 80 : 120}
                        width={isMobile ? '100%' : 200}
                        radius="md"
                        fit="cover"
                        alt="Course thumbnail"
                        style={{ maxWidth: isMobile ? '100%' : '200px' }}
                      />
                      <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                        <Text
                          size={isMobile ? 'xs' : 'sm'}
                          fw={500}
                          c={currentThemeConfig.color}
                          lineClamp={1}
                        >
                          {thumbnailFile?.name}
                        </Text>
                        <Text size="xs" c={'dimmed'}>
                          {(thumbnailFile!.size / 1024 / 1024).toFixed(2)} MB
                        </Text>
                        <Button
                          variant="light"
                          color="red"
                          size="xs"
                          leftSection={<IconX size={12} />}
                          onClick={handleRemoveThumbnail}
                          style={{ width: 'fit-content' }}
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Group>
                  </Stack>
                </Paper>
              )}
            </Box>

            {/* Course Description */}
            <Box>
              <Text
                size={isMobile ? 'sm' : 'md'}
                fw={600}
                mb="xs"
                c={currentThemeConfig.color}
              >
                Course Description{' '}
                <Text component="span" c="red">
                  *
                </Text>
              </Text>
              <Text size={isMobile ? 'xs' : 'sm'} c={'dimmed'} mb="md">
                Provide a detailed description of what students will learn
              </Text>

              <RichTextEditor
                editor={editor}
                styles={{
                  root: {
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color,
                    borderColor: currentThemeConfig.borderColor,
                    fontSize: isMobile ? '13px' : '14px'
                  },
                  toolbar: {
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color,
                    border: 'none',
                    padding: isMobile ? '4px' : '8px',
                    gap: isMobile ? '2px' : '4px',
                    flexWrap: 'wrap'
                  },
                  control: {
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color,
                    border: 'none',
                    minWidth: isMobile ? '28px' : '32px',
                    minHeight: isMobile ? '28px' : '32px',
                    padding: isMobile ? '4px' : '6px',
                    '&:hover': {
                      backgroundColor: currentThemeConfig.headerBackgroundColor
                    }
                  },
                  content: {
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color,
                    minHeight: isMobile ? 150 : 200,
                    padding: isMobile ? '0.5rem' : '1rem',
                    fontSize: isMobile ? '13px' : '14px'
                  },
                  linkEditor: {
                    backgroundColor: currentThemeConfig.headerBackgroundColor,
                    color: currentThemeConfig.color
                  }
                }}
              >
                <RichTextEditor.Toolbar sticky stickyOffset={isMobile ? 0 : 60}>
                  {!isMobile ? (
                    <>
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
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
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
                    </>
                  ) : (
                    <>
                      {/* Mobile: Essential controls only */}
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
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
                    </>
                  )}
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
        <Card shadow="sm" p={{ base: 'md', sm: 'lg' }} radius="md" withBorder>
          <Stack gap="sm" hiddenFrom="sm">
            {/* Mobile: Stacked buttons */}
            <Button
              fullWidth
              leftSection={<IconCheck size={16} />}
              disabled={!isFormValid}
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Create Course
            </Button>

            <Button
              fullWidth
              variant="default"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </Stack>

          <Group justify="space-between" wrap="nowrap" visibleFrom="sm">
            {/* Desktop: Horizontal buttons */}
            <Button variant="default" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Group gap="sm">
              <Button
                leftSection={<IconCheck size={18} />}
                disabled={!isFormValid}
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Create Course
              </Button>
            </Group>
          </Group>
        </Card>

        {/* Help Card */}
        <Card
          shadow="sm"
          p={{ base: 'md', sm: 'lg' }}
          radius="md"
          withBorder
          bg="blue.0"
        >
          <Group gap={isMobile ? 'sm' : 'md'} align="flex-start">
            <IconPhoto size={isMobile ? 24 : 32} color="#228BE6" />
            <Stack gap={4} style={{ flex: 1 }}>
              <Text size={isMobile ? 'xs' : 'sm'} fw={600}>
                Tips for a Great Course
              </Text>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }}>
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
