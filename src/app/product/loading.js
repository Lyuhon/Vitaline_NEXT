// app/loading.js
'use client';

import Image from 'next/image';

export default function Loading() {
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