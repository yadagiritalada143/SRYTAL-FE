import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import CourseThumbnail from '../CourseThumbnail';

const renderThumb = (props: any) => {
  return render(
    <MantineProvider>
      <CourseThumbnail name='My Course' size={40} {...props} />
    </MantineProvider>
  );
};

describe('CourseThumbnail', () => {
  it('renders the image with the course name as alt text when src is present', () => {
    renderThumb({ src: 'http://example.com/thumb.png', radius: 'sm' });

    const img = screen.getByRole('img', {
      name: 'My Course'
    }) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'http://example.com/thumb.png');
  });

  it('falls back to the placeholder when the image fails to load', () => {
    renderThumb({ src: 'http://example.com/broken.png' });

    fireEvent.error(screen.getByRole('img', { name: 'My Course' }));

    const placeholder = screen.getByLabelText('My Course');
    expect(placeholder).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders a gradient placeholder with initials when no src is given', () => {
    renderThumb({ radius: 'sm' });
    const placeholder = screen.getByLabelText('My Course');
    expect(placeholder).toBeInTheDocument();
    expect(screen.getByText('MC')).toBeInTheDocument();

    expect(placeholder.style.borderRadius).toContain(
      'var(--mantine-radius-sm)'
    );
    expect(placeholder.style.display).toBe('flex');
  });

  it('uses up to two uppercase word initials', () => {
    const { rerender } = renderThumb({ radius: 0 });

    rerender(
      <MantineProvider>
        <CourseThumbnail name='Advanced JavaScript' size={64} radius={0} />
      </MantineProvider>
    );
    expect(screen.getByText('AJ')).toBeInTheDocument();

    rerender(
      <MantineProvider>
        <CourseThumbnail name='React' size={64} radius={0} />
      </MantineProvider>
    );
    expect(
      within(screen.getByLabelText('React')).getByText('R')
    ).toBeInTheDocument();

    rerender(
      <MantineProvider>
        <CourseThumbnail name='   ' size={64} radius={0} />
      </MantineProvider>
    );
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
