import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ScrollArea, Tooltip, UnstyledButton } from '@mantine/core';
import {
  IconChevronDown,
  IconChevronLeft,
  IconLayoutSidebarLeftExpand,
  IconMenu2,
  IconX
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { logoutUser } from '@services/user-services';
import { sidebarCollapsedAtom } from '@atoms/sidebar';
import { OrganizationConfig } from '@interfaces/organization';
import { resolveIcon } from './iconMap';
import { LogoutButton } from '../Buttons/buttons';
import OrgLogo from './OrgLogo';
import classes from './Sidebar.module.css';

export interface SidebarMenuNode {
  key: string;
  label: string;
  url?: string;
  icon: string;
  isSystem?: boolean;
  children?: SidebarMenuNode[];
}

interface SidebarProps {
  menu: SidebarMenuNode[];
  organizationConfig: OrganizationConfig;
  isLoading?: boolean;
}

function SidebarMenu({ menu, organizationConfig, isLoading }: SidebarProps) {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast } = useCustomToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useRecoilState(sidebarCollapsedAtom);

  const org = organizationConfig.organization_name;
  const c = themeConfig.color;
  const bg = themeConfig.backgroundColor;

  const close = useCallback(() => setMobileOpen(false), []);

  const handleLogout = () => {
    logoutUser();
    showSuccessToast('Successfully logged out');
  };

  // Shared sidebar content (logo header, scrollable nav list, logout footer).
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className={classes.header} style={{ ['--sidebar-border' as any]: `${c}1f` }}>
        <OrgLogo
          logo={organizationConfig.organization_theme.logo}
          name={org}
          width={150}
          height={38}
          style={{ borderRadius: 8 }}
        />
      </div>

      <ScrollArea className={classes.nav} scrollbarSize={6} type='hover'>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{ height: 44, borderRadius: 10, margin: '2px 0', background: `${c}0d` }}
              />
            ))
          : menu.map(node => (
              <SidebarNode key={node.key} node={node} org={org} color={c} bg={bg} onNavigate={close} />
            ))}
      </ScrollArea>

      <div className={classes.footer} style={{ ['--sidebar-border' as any]: `${c}1f` }}>
        <span style={{ fontSize: 12, color: `${c}99`, fontWeight: 500 }}>Sign out</span>
        <LogoutButton handleLogout={handleLogout} />
      </div>
    </div>
  );

  // Stable tree — all three always mounted; CSS decides what's visible at each
  // breakpoint. Avoids remount/state-loss from JS-driven branch switching.
  return (
    <>
      {/* Mobile-only hamburger (hidden ≥768px via CSS) */}
      <UnstyledButton
        className={classes.hamburger}
        onClick={() => setMobileOpen(true)}
        aria-label='Open menu'
        style={{ backgroundColor: bg, ['--sidebar-border' as any]: `${c}1f` }}
      >
        <IconMenu2 size={22} color={c} />
      </UnstyledButton>

      {/* Desktop reopen button — only when collapsed (hidden <768px via CSS) */}
      {collapsed && (
        <Tooltip label='Open sidebar' position='right'>
          <UnstyledButton
            className={classes.desktopOpen}
            onClick={() => setCollapsed(false)}
            aria-label='Open sidebar'
            style={{ backgroundColor: bg, ['--sidebar-border' as any]: `${c}1f` }}
          >
            <IconLayoutSidebarLeftExpand size={22} color={c} />
          </UnstyledButton>
        </Tooltip>
      )}

      {/* Desktop persistent rail (hidden <768px via CSS, and when collapsed) */}
      {!collapsed && (
        <nav
          className={`${classes.sidebar} ${classes.desktopOnly}`}
          style={{ backgroundColor: bg, ['--sidebar-border' as any]: `${c}1f` }}
        >
          <Tooltip label='Collapse sidebar' position='right'>
            <UnstyledButton
              className={classes.collapseBtn}
              onClick={() => setCollapsed(true)}
              aria-label='Collapse sidebar'
            >
              <IconChevronLeft size={18} color={c} />
            </UnstyledButton>
          </Tooltip>
          {content}
        </nav>
      )}

      {/* Mobile drawer — only mounted when open, so the slide-in keyframe runs
          cleanly once (no transform-toggle quirks) */}
      {mobileOpen && (
        <>
          <div className={classes.backdrop} onClick={close} />
          <aside
            className={classes.mobilePanel}
            style={{ backgroundColor: bg, ['--sidebar-border' as any]: `${c}1f` }}
          >
            <UnstyledButton
              className={classes.closeBtn}
              onClick={close}
              aria-label='Close menu'
            >
              <IconX size={20} color={c} />
            </UnstyledButton>
            {content}
          </aside>
        </>
      )}
    </>
  );
}

/* ── Single nav node (handles leaf + accordion parent) ── */
interface SidebarNodeProps {
  node: SidebarMenuNode;
  org: string;
  color: string;
  bg: string;
  onNavigate: () => void;
}

function SidebarNode({ node, org, color: c, bg, onNavigate }: SidebarNodeProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const hasChildren = !!node.children?.length;
  const Icon = resolveIcon(node.icon);

  const isActive = !!node.url && location.pathname === `/${org}/${node.url}`;
  const childActive = useMemo(
    () => node.children?.some(ch => ch.url && location.pathname === `/${org}/${ch.url}`),
    [node.children, location.pathname, org]
  );

  const [expanded, setExpanded] = useState<boolean>(!!childActive);
  const [hovered, setHovered] = useState(false);

  const go = (url?: string) => {
    if (!url) return;
    navigate(`/${org}/${url}`);
    onNavigate();
  };

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(prev => !prev);
      return;
    }
    go(node.url);
  };

  const highlight = isActive;

  return (
    <div style={{ width: '100%' }}>
      <UnstyledButton
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-current={isActive ? 'page' : undefined}
        aria-expanded={hasChildren ? expanded : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          padding: '10px 12px',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: highlight ? 600 : 500,
          color: highlight ? bg : c,
          background: highlight
            ? `linear-gradient(135deg, ${c}f2 0%, ${c}cc 100%)`
            : hovered
              ? `${c}0f`
              : 'transparent',
          boxShadow: highlight ? `0 4px 14px ${c}33` : 'none',
          transition: 'background 0.18s ease, color 0.18s ease'
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
            borderRadius: 8,
            flexShrink: 0,
            background: highlight ? 'rgba(255,255,255,0.22)' : `${c}14`
          }}
        >
          <Icon size={17} stroke={highlight ? 2 : 1.7} />
        </span>
        <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {node.label}
        </span>
        {hasChildren && (
          <IconChevronDown
            size={15}
            style={{
              opacity: 0.6,
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.22s ease'
            }}
          />
        )}
      </UnstyledButton>

      {hasChildren && (
        <div
          style={{
            display: 'grid',
            gridTemplateRows: expanded ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.26s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div style={{ padding: '4px 0 4px 22px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {node.children!.map(child => {
                const active = !!child.url && location.pathname === `/${org}/${child.url}`;
                return (
                  <UnstyledButton
                    key={child.key}
                    onClick={() => go(child.url)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: active ? 600 : 450,
                      color: active ? c : `${c}9c`,
                      background: active ? `${c}16` : 'transparent',
                      border: `1px solid ${active ? `${c}26` : 'transparent'}`,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span
                      style={{
                        width: active ? 7 : 5,
                        height: active ? 7 : 5,
                        borderRadius: '50%',
                        background: active ? c : `${c}45`,
                        flexShrink: 0
                      }}
                    />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {child.label}
                    </span>
                  </UnstyledButton>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(SidebarMenu);
