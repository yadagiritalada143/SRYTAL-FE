interface OrderableItem {
  orderIdx?: number | null;
}

interface CourseWithModules extends OrderableItem {
  modules?: Array<OrderableItem & { tasks?: OrderableItem[] }>;
}

const hasNumericOrderIdx = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

export const compareByOrderIdx = (
  a: OrderableItem,
  b: OrderableItem
): number => {
  const aIdx = hasNumericOrderIdx(a?.orderIdx)
    ? a.orderIdx
    : Number.POSITIVE_INFINITY;
  const bIdx = hasNumericOrderIdx(b?.orderIdx)
    ? b.orderIdx
    : Number.POSITIVE_INFINITY;
  if (aIdx === bIdx) return 0;
  return aIdx < bIdx ? -1 : 1;
};

export const sortByOrderIdx = <T extends OrderableItem>(
  items?: T[] | null
): T[] => (Array.isArray(items) ? [...items].sort(compareByOrderIdx) : []);

export const getNextOrderIdx = (items?: OrderableItem[] | null): number => {
  if (!Array.isArray(items) || items.length === 0) return 1;
  const highest = items.reduce(
    (max, item) =>
      hasNumericOrderIdx(item?.orderIdx) ? Math.max(max, item.orderIdx) : max,
    0
  );
  return Math.max(highest, items.length) + 1;
};

export const applyIdOrder = <T extends { _id: string }>(
  items: T[],
  ids?: string[] | null
): T[] => {
  if (!Array.isArray(ids) || ids.length === 0) return items;

  const remaining = new Map(items.map(item => [item._id, item]));
  const ordered: T[] = [];

  ids.forEach(id => {
    const item = remaining.get(id);
    if (item) {
      ordered.push(item);
      remaining.delete(id);
    }
  });

  remaining.forEach(item => ordered.push(item));
  return ordered;
};

export const moveItem = <T>(items: T[], from: number, to: number): T[] => {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= items.length ||
    to >= items.length
  ) {
    return items;
  }
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};

export const sortCourseContent = <T extends CourseWithModules>(
  course: T
): T => {
  if (!course || typeof course !== 'object' || !Array.isArray(course.modules)) {
    return course;
  }

  return {
    ...course,
    modules: sortByOrderIdx(course.modules).map(module => ({
      ...module,
      tasks: sortByOrderIdx(module.tasks)
    }))
  };
};
