import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Center, Code, Stack, Text, Title } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * App-level error boundary. Catches render-time errors in the React tree and
 * shows a recoverable fallback instead of a blank white screen. Network/async
 * errors are handled separately via DataView + getErrorMessage.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface the component stack to the console for debugging.
    console.error('Uncaught render error:', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (!error) return children;
    if (fallback) return fallback(error, this.reset);

    return (
      <Center mih='100vh' p='md'>
        <Stack align='center' gap='md' maw={460}>
          <IconAlertTriangle size={56} color='var(--mantine-color-red-6)' />
          <Title order={3} ta='center'>
            Something went wrong
          </Title>
          <Text c='dimmed' ta='center' size='sm'>
            An unexpected error occurred. You can try again, or reload the page
            if the problem persists.
          </Text>
          {import.meta.env.DEV && (
            <Code block w='100%' style={{ whiteSpace: 'pre-wrap' }}>
              {error.message}
            </Code>
          )}
          <Button.Group>
            <Button variant='default' onClick={this.reset}>
              Try again
            </Button>
            <Button onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </Button.Group>
        </Stack>
      </Center>
    );
  }
}

export default ErrorBoundary;
