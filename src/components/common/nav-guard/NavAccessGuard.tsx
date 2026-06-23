import { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMyNavMenu } from '@hooks/queries/useNavQueries';

/**
 * Enforces admin-configured menu access on navigation. A path is blocked only
 * when it matches a **known menu URL** (the most specific one, by longest match)
 * that the user has NOT been granted. Unmanaged action/detail pages (e.g.
 * edit-employee, course details) are reached from within a granted section and
 * are always allowed. The surface root (".../dashboard") matches exactly only,
 * so it never prefix-blocks the pages nested under it.
 */
const NavAccessGuard = () => {
  const location = useLocation();
  const { data, isLoading } = useGetMyNavMenu();

  const relPath = useMemo(
    () => location.pathname.split('/').slice(2).join('/'),
    [location.pathname]
  );

  const decision = useMemo(() => {
    if (!data?.surface) return { blocked: false as const };

    const managedUrls: string[] = data.managedUrls ?? [];
    const allowed = new Set<string>(data.allowedUrls ?? []);
    const surfaceRoot = `${data.surface}/dashboard`;

    let best: string | null = null;
    for (const url of managedUrls) {
      const isRoot = url === surfaceRoot;
      const matches = relPath === url || (!isRoot && relPath.startsWith(url + '/'));
      if (matches && (best === null || url.length > best.length)) best = url;
    }

    if (best === null) return { blocked: false as const };
    if (allowed.has(best)) return { blocked: false as const };

    // Redirect target: first allowed page, else the surface dashboard root.
    const target = (data.allowedUrls && data.allowedUrls[0]) || surfaceRoot;
    const org = location.pathname.split('/')[1];
    return { blocked: true as const, to: `/${org}/${target}` };
  }, [data, relPath, location.pathname]);

  // Don't block during the initial fetch — avoids a flash/redirect before the
  // menu is known. Enforcement applies once data is available.
  if (isLoading || !decision.blocked) return <Outlet />;

  return <Navigate to={decision.to} replace />;
};

export default NavAccessGuard;
