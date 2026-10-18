import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { IconBrandReact } from '@tabler/icons-react';
import TechIcon from '../tech-icons';

describe('TechIcon', () => {
  it('shows the technology name while hovering the icon', async () => {
    const { container } = render(
      <MantineProvider>
        <TechIcon
          icon={IconBrandReact}
          name='React'
          color='text-blue-500'
          hoverColor='text-blue-700'
          size={8}
        />
      </MantineProvider>
    );

    const icon = container.querySelector('svg') as SVGElement;
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-blue-500');

    fireEvent.mouseEnter(icon);
    expect(await screen.findByText('React')).toBeInTheDocument();

    fireEvent.mouseLeave(icon);
  });
});
