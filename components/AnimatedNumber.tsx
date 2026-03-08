'use client';

import { useEffect, useRef, useState } from 'react';

export function AnimatedNumber({ value, className }: { value: string; className?: string }) {
  const prevRef = useRef(value);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (value !== prevRef.current) {
      prevRef.current = value;
      setKey((k) => k + 1);
    }
  }, [value]);

  return (
    <div key={key} className={`${className ?? ''} ${key > 0 ? 'animate-number-roll' : ''}`}>
      {value}
    </div>
  );
}
