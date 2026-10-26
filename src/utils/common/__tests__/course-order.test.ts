import {
  applyIdOrder,
  compareByOrderIdx,
  getNextOrderIdx,
  moveItem,
  sortByOrderIdx,
  sortCourseContent
} from '../course-order';

describe('course-order', () => {
  describe('compareByOrderIdx', () => {
    it('orders items by ascending orderIdx', () => {
      expect(compareByOrderIdx({ orderIdx: 1 }, { orderIdx: 2 })).toBeLessThan(
        0
      );
      expect(
        compareByOrderIdx({ orderIdx: 3 }, { orderIdx: 2 })
      ).toBeGreaterThan(0);
      expect(compareByOrderIdx({ orderIdx: 2 }, { orderIdx: 2 })).toBe(0);
    });

    it('sorts items without an index after indexed ones', () => {
      expect(compareByOrderIdx({}, { orderIdx: 5 })).toBeGreaterThan(0);
      expect(compareByOrderIdx({ orderIdx: 5 }, {})).toBeLessThan(0);
    });
  });

  describe('sortByOrderIdx', () => {
    it('returns a sorted copy without mutating the input', () => {
      const items = [
        { _id: 'c', orderIdx: 3 },
        { _id: 'a', orderIdx: 1 },
        { _id: 'b', orderIdx: 2 }
      ];

      expect(sortByOrderIdx(items).map(item => item._id)).toEqual([
        'a',
        'b',
        'c'
      ]);
      expect(items.map(item => item._id)).toEqual(['c', 'a', 'b']);
    });

    it('keeps legacy items without an index in their original order', () => {
      const items = [
        { _id: 'legacy-1' },
        { _id: 'indexed', orderIdx: 1 },
        { _id: 'legacy-2' }
      ];

      expect(sortByOrderIdx(items).map(item => item._id)).toEqual([
        'indexed',
        'legacy-1',
        'legacy-2'
      ]);
    });

    it('returns an empty array for missing input', () => {
      expect(sortByOrderIdx()).toEqual([]);
      expect(sortByOrderIdx(null)).toEqual([]);
    });
  });

  describe('getNextOrderIdx', () => {
    it('starts at 1 for an empty list', () => {
      expect(getNextOrderIdx()).toBe(1);
      expect(getNextOrderIdx([])).toBe(1);
    });

    it('returns one past the highest existing index', () => {
      expect(getNextOrderIdx([{ orderIdx: 1 }, { orderIdx: 4 }])).toBe(5);
    });

    it('falls back to the list length when indexes are missing', () => {
      expect(getNextOrderIdx([{}, {}, {}])).toBe(4);
      expect(getNextOrderIdx([{ orderIdx: 2 }, {}, {}])).toBe(4);
    });
  });

  describe('applyIdOrder', () => {
    const items = [{ _id: 'a' }, { _id: 'b' }, { _id: 'c' }];

    it('applies the given id sequence', () => {
      expect(applyIdOrder(items, ['c', 'a', 'b']).map(item => item._id)).toEqual(
        ['c', 'a', 'b']
      );
    });

    it('appends ids that are not present in the list', () => {
      expect(applyIdOrder(items, ['b', 'missing']).map(item => item._id)).toEqual(
        ['b', 'a', 'c']
      );
    });

    it('returns the original order when no override is given', () => {
      expect(applyIdOrder(items, null).map(item => item._id)).toEqual([
        'a',
        'b',
        'c'
      ]);
    });
  });

  describe('moveItem', () => {
    it('moves an item to a new position', () => {
      expect(moveItem(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a']);
      expect(moveItem(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b']);
    });

    it('returns the list unchanged for invalid positions', () => {
      const items = ['a', 'b', 'c'];
      expect(moveItem(items, 1, 1)).toBe(items);
      expect(moveItem(items, -1, 1)).toBe(items);
      expect(moveItem(items, 1, 5)).toBe(items);
    });
  });

  describe('sortCourseContent', () => {
    it('sorts modules and the tasks inside each module', () => {
      const course = {
        courseName: 'Course',
        modules: [
          {
            _id: 'm2',
            orderIdx: 2,
            tasks: [
              { _id: 't2', orderIdx: 2 },
              { _id: 't1', orderIdx: 1 }
            ]
          },
          { _id: 'm1', orderIdx: 1, tasks: [] }
        ]
      };

      const sorted = sortCourseContent(course);

      expect(sorted.modules.map(module => module._id)).toEqual(['m1', 'm2']);
      expect(sorted.modules[1]?.tasks?.map(task => task._id)).toEqual([
        't1',
        't2'
      ]);
    });

    it('returns courses without modules untouched', () => {
      const course = { courseName: 'Course', modules: undefined };
      expect(sortCourseContent(course)).toBe(course);
    });
  });
});
