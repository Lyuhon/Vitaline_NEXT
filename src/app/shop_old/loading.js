'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) {
      window.scrollTo(0, 0);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <div className="loading-container">
      <Image
        src="/vitaline-logo.webp"
        alt="Vitaline Logo"
        width={200}
        height={120}
        priority
        className="loading-image"
      />
    </div>
  );
}