import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Card,
  Group,
  Modal,
  Paper,
  PasswordInput,
  Stack,
  Text,
  ThemeIcon,
  Tooltip
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconAlertTriangle,
  IconCheck,
  IconClipboardCheck,
  IconClock,
  IconCopy,
  IconExternalLink,
  IconKey,
  IconRoute,
  IconRobot,
  IconShieldCheck,
  IconShieldLock,
  IconWand,
  IconX
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { useGetUserOpenRouterKey } from '@hooks/queries/useUserQueries';
import { useSaveUserOpenRouterKey } from '@hooks/mutations/useUserMutations';
import { OPENROUTER_API_KEY_STORAGE } from '@user/components/dashboard/course-portal/OpenRouterSetup';

export interface OpenRouterKeyModalProps {
  opened: boolean;
  onClose: () => void;
  userId?: string;
  onKeyUpdated?: (newKey: string) => void;
  onOpenSetupGuide?: () => void;
}

export const OpenRouterKeyModal: React.FC<OpenRouterKeyModalProps> = ({
  opened,
  onClose,
  userId,
  onKeyUpdated,
  onOpenSetupGuide
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isDarkTheme, appColors: colors } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const { data: keyResponse, refetch } = useGetUserOpenRouterKey(
    userId,
    opened
  );
  const saveKeyMutation = useSaveUserOpenRouterKey();

  const [inputKey, setInputKey] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedMasked, setCopiedMasked] = useState<boolean>(false);

  const existingKey =
    keyResponse?.data?.openrouterKey ||
    localStorage.getItem(OPENROUTER_API_KEY_STORAGE) ||
    '';

  const hasConfiguredKey = !!existingKey && existingKey.trim().length > 0;

  const maskKey = (key: string) => {
    if (!key || key.length < 10) return '••••••••••••••••';
    const prefix = key.slice(0, 8);
    const suffix = key.slice(-4);
    return `${prefix}••••••••••••••••${suffix}`;
  };

  const handleCopyMaskedKey = () => {
    if (!existingKey) return;
    navigator.clipboard.writeText(existingKey);
    setCopiedMasked(true);
    showSuccessToast('OpenRouter API key copied to clipboard!');
    setTimeout(() => setCopiedMasked(false), 2000);
  };

  const handlePasteClipboard = async () => {
    try {
      if (navigator?.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputKey(text.trim());
          if (errorMsg) setErrorMsg('');
          showSuccessToast('Pasted from clipboard');
        }
      }
    } catch {
      // Permission denied or unavailable
    }
  };

  const handleLaunchSetupGuide = () => {
    onClose();
    if (onOpenSetupGuide) {
      onOpenSetupGuide();
    } else {
      navigate('../course-assignments?setup=true', {
        state: { openSetup: true }
      });
    }
  };

  const handleValidateAndSave = async () => {
    const trimmed = inputKey.trim();
    if (!trimmed) {
      setErrorMsg('Please enter an OpenRouter API key to validate.');
      return;
    }

    if (trimmed.length < 15) {
      setErrorMsg(
        'API key seems too short. OpenRouter keys typically start with "sk-or-v1-".'
      );
      return;
    }

    setErrorMsg('');

    try {
      const response = await saveKeyMutation.mutateAsync(trimmed);
      localStorage.setItem(OPENROUTER_API_KEY_STORAGE, trimmed);

      const msg = response?.message || 'Key is Valid and saved successfully !';
      showSuccessToast(msg);

      setInputKey('');
      if (onKeyUpdated) onKeyUpdated(trimmed);
      refetch();
    } catch (apiError: any) {
      const message =
        apiError?.response?.data?.message ||
        apiError?.message ||
        'Invalid Key !';
      setErrorMsg(message);
      showErrorToast(message);
    }
  };

  const formattedUpdatedAt = keyResponse?.data?.updatedAt
    ? new Date(keyResponse.data.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size='lg'
      radius='xl'
      centered
      padding={0}
      overlayProps={{
        backgroundOpacity: isDarkTheme ? 0.65 : 0.45,
        blur: 4
      }}
      styles={{
        content: {
          backgroundColor: isDarkTheme ? '#0b1120' : '#ffffff',
          border: `1px solid ${isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          boxShadow: isDarkTheme
            ? '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.06)'
            : '0 25px 60px -15px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.04)',
          maxHeight: isMobile ? '96vh' : '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        },
        body: {
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden'
        }
      }}
    >
      <div
        style={{
          padding: isMobile ? '16px 18px' : '20px 24px',
          background: isDarkTheme
            ? 'linear-gradient(180deg, #111827 0%, #0b1120 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          borderBottom: `1px solid ${isDarkTheme ? '#1e293b' : '#f1f5f9'}`,
          flexShrink: 0
        }}
      >
        <Group justify='space-between' align='center' wrap='nowrap'>
          <Group gap='md' wrap='nowrap'>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <IconKey size={22} color='#ffffff' stroke={2} />
            </div>

            <div>
              <Group gap='xs' align='center'>
                <Text
                  fw={700}
                  size='md'
                  c={colors.primaryText}
                  style={{ letterSpacing: '-0.2px' }}
                >
                  OpenRouter API Key Management
                </Text>
                <Badge
                  variant='light'
                  color='indigo'
                  size='xs'
                  radius='sm'
                  leftSection={<IconShieldLock size={11} />}
                >
                  Encrypted
                </Badge>
              </Group>
              <Text size='xs' c={colors.mutedText} mt={2}>
                Personal API credentials for API course mentors, coding
                assistants & evaluation
              </Text>
            </div>
          </Group>

          <ActionIcon
            variant='subtle'
            color='gray'
            radius='md'
            size='lg'
            onClick={onClose}
            aria-label='Close modal'
            style={{
              color: colors.mutedText,
              transition: 'all 0.15s ease'
            }}
          >
            <IconX size={18} />
          </ActionIcon>
        </Group>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: isMobile ? 'calc(96vh - 120px)' : 'calc(90vh - 136px)'
        }}
      >
        <Stack gap='md' p={isMobile ? '16px' : '24px'}>
          <Paper
            radius='lg'
            p='md'
            style={{
              background: hasConfiguredKey
                ? isDarkTheme
                  ? 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.8) 75%)'
                  : 'radial-gradient(ellipse at top left, rgba(236, 253, 245, 0.95) 0%, #ffffff 75%)'
                : isDarkTheme
                  ? 'radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.8) 75%)'
                  : 'radial-gradient(ellipse at top left, rgba(254, 243, 199, 0.9) 0%, #ffffff 75%)',
              border: `1px solid ${
                hasConfiguredKey
                  ? isDarkTheme
                    ? 'rgba(16, 185, 129, 0.35)'
                    : 'rgba(16, 185, 129, 0.3)'
                  : isDarkTheme
                    ? 'rgba(245, 158, 11, 0.35)'
                    : 'rgba(245, 158, 11, 0.3)'
              }`,
              boxShadow: hasConfiguredKey
                ? isDarkTheme
                  ? '0 4px 20px rgba(0, 0, 0, 0.4)'
                  : '0 4px 20px rgba(16, 185, 129, 0.08)'
                : isDarkTheme
                  ? '0 4px 20px rgba(0, 0, 0, 0.4)'
                  : '0 4px 20px rgba(245, 158, 11, 0.08)'
            }}
          >
            <Group justify='space-between' align='center' mb='xs' wrap='nowrap'>
              <Group gap='xs' align='center'>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: hasConfiguredKey ? '#10b981' : '#f59e0b',
                    display: 'inline-block',
                    boxShadow: hasConfiguredKey
                      ? '0 0 10px #10b981'
                      : '0 0 10px #f59e0b'
                  }}
                />
                <Text
                  fw={700}
                  size='xs'
                  c={hasConfiguredKey ? '#10b981' : '#d97706'}
                  style={{ letterSpacing: 0.6, textTransform: 'uppercase' }}
                >
                  CURRENT API KEY STATUS
                </Text>
                <Badge
                  size='sm'
                  variant='filled'
                  color={hasConfiguredKey ? 'teal' : 'orange'}
                  radius='sm'
                >
                  {hasConfiguredKey ? 'Active & Verified' : 'Not Configured'}
                </Badge>
              </Group>

              <Badge
                variant='light'
                color={hasConfiguredKey ? 'teal' : 'gray'}
                size='xs'
                radius='sm'
                leftSection={
                  hasConfiguredKey ? (
                    <IconShieldCheck size={11} />
                  ) : (
                    <IconAlertTriangle size={11} />
                  )
                }
              >
                {hasConfiguredKey ? 'Authenticated Provider' : 'Key Required'}
              </Badge>
            </Group>

            {hasConfiguredKey ? (
              <Stack gap={8} mt={6}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '8px 12px',
                    borderRadius: 8,
                    backgroundColor: isDarkTheme ? '#020617' : '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <Group gap='xs' wrap='nowrap' style={{ overflow: 'hidden' }}>
                    <ThemeIcon
                      size={24}
                      radius='sm'
                      color='teal'
                      variant='light'
                      style={{ flexShrink: 0 }}
                    >
                      <IconKey size={14} />
                    </ThemeIcon>
                    <Text
                      ff='monospace'
                      fw={600}
                      size='xs'
                      c='#38bdf8'
                      style={{
                        letterSpacing: 0.8,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {maskKey(existingKey)}
                    </Text>
                  </Group>

                  <Button
                    size='xs'
                    variant={copiedMasked ? 'filled' : 'subtle'}
                    color={copiedMasked ? 'teal' : 'indigo'}
                    leftSection={
                      copiedMasked ? (
                        <IconCheck size={13} />
                      ) : (
                        <IconCopy size={13} />
                      )
                    }
                    onClick={handleCopyMaskedKey}
                    radius='md'
                    style={{
                      flexShrink: 0,
                      height: 28,
                      fontSize: 11,
                      fontWeight: 600,
                      color: copiedMasked ? '#ffffff' : '#60a5fa'
                    }}
                  >
                    {copiedMasked ? 'Copied!' : 'Copy Key'}
                  </Button>
                </div>

                <Group
                  justify='space-between'
                  align='center'
                  mt={2}
                  wrap='wrap'
                >
                  {formattedUpdatedAt ? (
                    <Group gap={4} align='center'>
                      <IconClock size={12} color='#64748b' />
                      <Text size='10px' c={colors.mutedText}>
                        Last validated: {formattedUpdatedAt}
                      </Text>
                    </Group>
                  ) : (
                    <Text size='10px' c={colors.mutedText}>
                      Stored in secure session
                    </Text>
                  )}

                  <Group gap={4} align='center'>
                    <IconWand size={12} color='#10b981' />
                    <Text size='10px' c={colors.mutedText} fw={500}>
                      Full API Course Features Unlocked
                    </Text>
                  </Group>
                </Group>
              </Stack>
            ) : (
              <Stack gap='xs' mt={4}>
                <Text
                  size='xs'
                  c={colors.secondaryText}
                  style={{ lineHeight: 1.5 }}
                >
                  No OpenRouter API key found. Interactive API course mentors,
                  code review exercises, and learning labs require a valid
                  OpenRouter API key.
                </Text>
                <Group gap={6} align='center'>
                  <IconRobot size={13} color='#f59e0b' />
                  <Text size='11px' c='#d97706' fw={500}>
                    Free models are readily available via OpenRouter (e.g. Meta
                    Llama 3, Mistral, Qwen).
                  </Text>
                </Group>
              </Stack>
            )}
          </Paper>

          <Card
            withBorder
            p='lg'
            radius='lg'
            style={{
              backgroundColor: isDarkTheme ? '#0f172a' : '#f8fafc',
              borderColor: isDarkTheme ? '#1e293b' : '#e2e8f0'
            }}
          >
            <Stack gap='sm'>
              <Group justify='space-between' align='center' wrap='nowrap'>
                <Group gap='xs' wrap='nowrap'>
                  <ThemeIcon
                    size={28}
                    radius='md'
                    variant='light'
                    color='indigo'
                  >
                    <IconWand size={16} />
                  </ThemeIcon>
                  <div>
                    <Text fw={700} size='sm' c={colors.primaryText}>
                      {hasConfiguredKey
                        ? 'Update / Rotate API Key'
                        : 'Enter OpenRouter API Key'}
                    </Text>
                  </div>
                </Group>

                <Anchor
                  href='https://openrouter.ai/keys'
                  target='_blank'
                  rel='noopener noreferrer'
                  size='xs'
                  c='indigo'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  openrouter.ai/keys
                  <IconExternalLink size={12} />
                </Anchor>
              </Group>

              <Text size='xs' c={colors.mutedText} style={{ lineHeight: 1.4 }}>
                The backend performs a live validation check with OpenRouter's
                official auth servers before storing your key.
              </Text>

              <PasswordInput
                label='New OpenRouter API Key'
                placeholder='sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                value={inputKey}
                onChange={e => {
                  setInputKey(e.currentTarget.value);
                  if (errorMsg) setErrorMsg('');
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleValidateAndSave();
                  }
                }}
                error={errorMsg}
                leftSection={<IconKey size={16} color='#6366f1' />}
                rightSection={
                  !inputKey ? (
                    <Tooltip
                      label='Paste from clipboard'
                      position='left'
                      withArrow
                    >
                      <ActionIcon
                        size='sm'
                        variant='subtle'
                        color='gray'
                        onClick={handlePasteClipboard}
                      >
                        <IconClipboardCheck size={14} />
                      </ActionIcon>
                    </Tooltip>
                  ) : undefined
                }
                size='sm'
                radius='md'
                styles={{
                  label: {
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.primaryText,
                    marginBottom: 4
                  },
                  input: {
                    backgroundColor: isDarkTheme ? '#020617' : '#ffffff',
                    borderColor: isDarkTheme ? '#334155' : '#cbd5e1',
                    color: colors.primaryText,
                    fontFamily: 'monospace',
                    fontSize: 12,
                    height: 38
                  }
                }}
              />

              <Group justify='space-between' align='center' mt='xs' wrap='wrap'>
                <Group gap={6} align='center'>
                  <IconShieldLock size={15} color='#10b981' />
                  <Text size='11px' c={colors.mutedText}>
                    Encrypted and securely tied to your user account.
                  </Text>
                </Group>

                <Button
                  color='indigo'
                  size='sm'
                  radius='md'
                  loading={saveKeyMutation.isPending}
                  onClick={handleValidateAndSave}
                  style={{
                    background:
                      'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                    boxShadow: '0 3px 12px rgba(79, 70, 229, 0.35)',
                    fontWeight: 600,
                    height: 36,
                    paddingLeft: 16,
                    paddingRight: 16
                  }}
                  leftSection={<IconCheck size={15} />}
                >
                  Validate & Save Key
                </Button>
              </Group>
            </Stack>
          </Card>

          <Paper
            withBorder
            p='sm'
            radius='lg'
            style={{
              backgroundColor: isDarkTheme
                ? 'rgba(99, 102, 241, 0.05)'
                : 'rgba(238, 242, 255, 0.6)',
              borderColor: isDarkTheme
                ? 'rgba(99, 102, 241, 0.2)'
                : 'rgba(99, 102, 241, 0.25)'
            }}
          >
            <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
              <Group gap='sm' wrap='nowrap'>
                <ThemeIcon
                  size={34}
                  radius='md'
                  variant='light'
                  color='indigo'
                  style={{
                    background: isDarkTheme
                      ? 'rgba(99, 102, 241, 0.2)'
                      : 'rgba(99, 102, 241, 0.12)',
                    flexShrink: 0
                  }}
                >
                  <IconRoute size={18} />
                </ThemeIcon>
                <div>
                  <Text size='xs' fw={600} c={colors.primaryText}>
                    Need a new key or is your current key expired?
                  </Text>

                  <Text size='11px' c={colors.mutedText} mt={6}>
                    Follow our interactive 11-step visual guide to create a free
                    OpenRouter key in the Courses menu.
                  </Text>
                </div>
              </Group>

              <Group gap='xs'>
                <Button
                  size='xs'
                  variant='light'
                  color='indigo'
                  radius='md'
                  leftSection={<IconRoute size={14} />}
                  onClick={handleLaunchSetupGuide}
                  style={{
                    height: 32,
                    fontSize: 11,
                    fontWeight: 600
                  }}
                >
                  Open Setup Guide
                </Button>
              </Group>
            </Group>
          </Paper>
        </Stack>
      </div>

      <div
        style={{
          padding: isMobile ? '12px 18px' : '14px 24px',
          borderTop: `1px solid ${isDarkTheme ? '#1e293b' : '#f1f5f9'}`,
          backgroundColor: isDarkTheme ? '#0b1120' : '#ffffff',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <Button
          variant='default'
          radius='md'
          size='sm'
          onClick={onClose}
          style={{
            height: 34,
            fontWeight: 500
          }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default OpenRouterKeyModal;
