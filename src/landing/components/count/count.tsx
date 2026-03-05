import { useState, useEffect, useRef } from "react";
import { Card, Text, Badge } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { getVisitorCount } from '@services/common-services';

const VisitorCount = () => {
  const [count, setCount] = useState<number>(0);
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getVisitorCount().then((visitorCount) => setCount(visitorCount));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCount();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.9 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [count]);

  const animateCount = () => {
    let start = 0;
    const end = count;
    const duration = 500;
    const increment = Math.ceil(end / (duration / 100));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayedCount(start);
    }, 100);
  };

  return (
    <div ref={countRef}>
      <Card
        p="lg"
        radius="md"
        className="bg-transparent text-center w-full md:w-2/3 lg:w-1/2 mx-auto my-6 transform hover:scale-105 transition-transform"
      >
        <div className="flex space-x-10 justify-center items-center">
          <Badge color="blue" variant="light">
            Visitors
          </Badge>
          <IconEye size={24} className="text-blue-500" />
        </div>

        <div className="mt-4 text-5xl font-bold text-indigo-700">
          {displayedCount}
        </div>

        <Text color="dimmed" size="sm" className="mt-2">
          People have visited this site.
        </Text>
      </Card>
    </div>
  );
};

export default VisitorCount;
