import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@landing/components/header/header', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-header'>Header</div>
}));

jest.mock('@landing/components/main/main', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-main'>Main</div>
}));

jest.mock('@landing/components/about/about', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-about'>About</div>
}));

jest.mock('@landing/components/services/services', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-services'>Services</div>
}));

jest.mock('@landing/components/technologies/technologies', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-technologies'>Technologies</div>
}));

jest.mock('@landing/components/promo/promo', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-promo'>PromoBanner</div>
}));

jest.mock('@landing/components/choose/choose', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-whychooseus'>WhyChooseUs</div>
}));

jest.mock('@landing/components/count/count', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-visitorcount'>VisitorCount</div>
}));

jest.mock('@landing/components/contact/contact', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-contact'>Contact</div>
}));

jest.mock('@landing/components/footer/footer', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-footer'>Footer</div>
}));

jest.mock('@components/common/scroll-to-top/ScrollToTop', () => ({
  __esModule: true,
  default: () => <div data-testid='scroll-to-top'>ScrollToTop</div>
}));

jest.mock('@mantine/hooks', () => ({
  useMediaQuery: () => false
}));

jest.mock('@hooks/lazy-loading', () => ({
  LazySection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}));

import Landing from '../landing';

describe('Landing Page', () => {
  it('renders without crashing', () => {
    render(<Landing />);
    expect(screen.getByTestId('landing-header')).toBeInTheDocument();
    expect(screen.getByTestId('landing-main')).toBeInTheDocument();
    expect(screen.getByTestId('landing-about')).toBeInTheDocument();
    expect(screen.getByTestId('landing-services')).toBeInTheDocument();
    expect(screen.getByTestId('landing-technologies')).toBeInTheDocument();
    expect(screen.getByTestId('landing-promo')).toBeInTheDocument();
    expect(screen.getByTestId('landing-whychooseus')).toBeInTheDocument();
    expect(screen.getByTestId('landing-visitorcount')).toBeInTheDocument();
    expect(screen.getByTestId('landing-contact')).toBeInTheDocument();
    expect(screen.getByTestId('landing-footer')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });
});
