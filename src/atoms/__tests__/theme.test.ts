import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { themeAtom } from '@atoms/theme';
import React from 'react';

const ThemeReader = () => {
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(themeAtom);
  return React.createElement(
    'button',
    { onClick: () => setIsDarkTheme(!isDarkTheme) },
    String(isDarkTheme)
  );
};

const renderThemeAtom = () => {
  return render(
    React.createElement(
      RecoilRoot,
      null,
      React.createElement(ThemeReader, null)
    )
  );
};

describe('themeAtom', () => {
  afterEach(cleanup);

  it('starts in light mode', () => {
    renderThemeAtom();
    expect(screen.getByRole('button')).toHaveTextContent('false');
  });

  it('can be toggled between light and dark mode', () => {
    renderThemeAtom();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('true');
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('false');
  });
});
