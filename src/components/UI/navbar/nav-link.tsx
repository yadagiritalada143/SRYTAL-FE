import { useNavigate, useLocation } from 'react-router-dom';
import { NavbarLinkProps } from './types';
import { UnstyledButton } from '@mantine/core';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';

export function NavbarLink({
  icon: Icon,
  name,
  url,
  organization,
  isActive,
  onClick,
  setIsDrawerOpen,
  children
}: NavbarLinkProps) {
  const navigate = useNavigate();
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const previousLocationRef = useRef<string>('');

  const isActiveChild = useMemo(
    () =>
      children?.some(
        child =>
          location.pathname ===
          `/${organization.organization_name}/${child.url}`
      ),
    [children, location.pathname, organization.organization_name]
  );

  useEffect(() => {
    if (isActiveChild && previousLocationRef.current !== location.pathname) {
      setIsExpanded(true);
      previousLocationRef.current = location.pathname;
    }
  }, [isActiveChild, location.pathname]);

  const handleClick = useCallback(() => {
    if (children && children.length > 0) {
      setIsExpanded(prev => !prev);
      return;
    }
    if (onClick) onClick();
    if (url) {
      navigate(`/${organization.organization_name}/${url}`, { replace: false });
      setIsDrawerOpen();
    }
  }, [
    onClick,
    url,
    organization.organization_name,
    navigate,
    setIsDrawerOpen,
    children
  ]);

  const handleChildClick = useCallback(
    (childUrl: string) => {
      navigate(`/${organization.organization_name}/${childUrl}`, {
        replace: false
      });
      setIsDrawerOpen();
    },
    [organization.organization_name, navigate, setIsDrawerOpen]
  );

  const isChildActive = useCallback(
    (childUrl: string) =>
      location.pathname === `/${organization.organization_name}/${childUrl}`,
    [location.pathname, organization.organization_name]
  );

  const c = currentThemeConfig.color;
  const bg = currentThemeConfig.backgroundColor;

  const mainButtonStyle = useMemo(
    (): React.CSSProperties => ({
      color: isActive ? bg : c,
      background: isActive
        ? `linear-gradient(135deg, ${c}ee 0%, ${c}cc 100%)`
        : 'transparent',
      borderRadius: 12,
      boxShadow: isActive
        ? `0 4px 16px ${c}30, inset 0 1px 0 rgba(255,255,255,0.15)`
        : 'none',
      transform: isPressed ? 'scale(0.975)' : 'scale(1)',
      transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)'
    }),
    [isActive, c, bg, isPressed]
  );

  return (
    <div className='w-full select-none'>
      {/* ── Main Button ── */}
      <UnstyledButton
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        style={mainButtonStyle}
        data-active={isActive || undefined}
        aria-label={`Navigate to ${name}`}
        aria-current={isActive ? 'page' : undefined}
        aria-expanded={children?.length ? isExpanded : undefined}
        role='menuitem'
        tabIndex={0}
        className={[
          'group relative flex items-center gap-3',
          'w-full px-3.5 py-3',
          'text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          !isActive && 'hover:bg-white/[0.06]'
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Hover shimmer overlay (inactive only) */}
        {!isActive && (
          <span
            className='pointer-events-none absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            style={{
              background: `linear-gradient(135deg, ${c}0c 0%, transparent 60%)`
            }}
          />
        )}

        {/* Icon container */}
        <span
          className='relative flex-shrink-0 flex items-center justify-center w-[34px] h-[34px] rounded-[9px] transition-all duration-200'
          style={{
            background: isActive ? 'rgba(255,255,255,0.2)' : `${c}14`,
            boxShadow: isActive
              ? 'inset 0 1px 0 rgba(255,255,255,0.25)'
              : `inset 0 1px 0 ${c}10`
          }}
        >
          <Icon stroke={isActive ? 2 : 1.6} size={16} />
        </span>

        {/* Label */}
        <span
          className='flex-1 truncate'
          style={{
            fontWeight: isActive ? 600 : 500,
            opacity: isActive ? 1 : 0.82,
            letterSpacing: '0.01em'
          }}
        >
          {name}
        </span>

        {/* Chevron */}
        {children && children.length > 0 && (
          <span
            style={{
              opacity: isExpanded ? 0.7 : 0.38,
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition:
                'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
              display: 'flex',
              flexShrink: 0
            }}
          >
            <IconChevronDown stroke={2.5} size={13} />
          </span>
        )}

        {/* Active left accent bar */}
        {isActive && (
          <span
            className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full'
            style={{
              height: '52%',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 100%)'
            }}
          />
        )}
      </UnstyledButton>

      {/* ── Children accordion ── */}
      {children && children.length > 0 && (
        <div
          aria-hidden={!isExpanded}
          style={{
            display: 'grid',
            gridTemplateRows: isExpanded ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div className='pt-1.5 pb-2.5 pl-[18px] pr-1'>
              <div className='relative pl-5'>
                {/* Gradient guide rail */}
                <span
                  className='absolute left-0 top-3 bottom-3 w-px rounded-full'
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${c}30 20%, ${c}30 80%, transparent 100%)`
                  }}
                />

                <div className='flex flex-col gap-1'>
                  {children.map((child, idx) => {
                    const active = isChildActive(child.url);
                    return (
                      <ChildItem
                        key={child.url}
                        child={child}
                        active={active}
                        themeColor={c}
                        idx={idx}
                        isExpanded={isExpanded}
                        onChildClick={handleChildClick}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   Child item — extracted for clean state isolation
──────────────────────────────────────────────── */
interface ChildItemProps {
  child: { url: string; name: string };
  active: boolean;
  themeColor: string;
  idx: number;
  isExpanded: boolean;
  onChildClick: (url: string) => void;
}

function ChildItem({
  child,
  active,
  themeColor: c,
  idx,
  isExpanded,
  onChildClick
}: ChildItemProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <UnstyledButton
      onClick={() => onChildClick(child.url)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      role='menuitem'
      tabIndex={0}
      className='relative flex items-center w-full px-3 py-[10px] text-sm focus-visible:outline-none focus-visible:ring-2'
      style={{
        color: active ? c : `${c}72`,
        background: active ? `${c}14` : hovered ? `${c}09` : 'transparent',
        borderRadius: 9,
        border: `1px solid ${active ? `${c}22` : 'transparent'}`,
        fontWeight: active ? 600 : 450,
        letterSpacing: '0.01em',
        transform: pressed ? 'scale(0.975)' : 'scale(1)',
        // Staggered fade-in on expand
        opacity: isExpanded ? 1 : 0,
        transitionDelay: isExpanded ? `${idx * 45 + 50}ms` : '0ms',
        transition: `
          color 0.15s ease,
          background 0.15s ease,
          border-color 0.15s ease,
          transform 0.12s ease,
          opacity 0.2s ease ${isExpanded ? idx * 45 + 50 : 0}ms
        `
      }}
    >
      {/* Dot on the guide rail */}
      <span
        className='absolute flex items-center justify-center'
        style={{ left: -21 }}
      >
        <span
          style={{
            width: active ? 7 : 4,
            height: active ? 7 : 4,
            borderRadius: '50%',
            background: active ? c : `${c}38`,
            boxShadow: active ? `0 0 0 2.5px ${c}20` : 'none',
            transition: 'all 0.2s ease'
          }}
        />
      </span>

      {/* Name */}
      <span className='flex-1 truncate'>{child.name}</span>

      {/* Active glow dot badge */}
      {active && (
        <span
          className='ml-auto flex-shrink-0 rounded-full'
          style={{
            width: 6,
            height: 6,
            background: c,
            boxShadow: `0 0 8px ${c}90`
          }}
        />
      )}
    </UnstyledButton>
  );
}
