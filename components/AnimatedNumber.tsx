'use client';

import { useState } from 'react';

export function AnimatedNumber({ value, className }: { value: string; className?: string }) {
  const [prev, setPrev] = useState(value);
  const [key, setKey] = useState(0);

  if (value !== prev) {
    setPrev(value);
    setKey((k) => k + 1);
  }

  return (
    <div key={key} className={`${className ?? ''} ${key > 0 ? 'animate-number-roll' : ''}`}>
      {value}
    </div>
  );
}
