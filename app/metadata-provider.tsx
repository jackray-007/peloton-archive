'use client';

import StructuredData from '@/components/StructuredData';

export default function MetadataProvider() {
  return (
    <>
      <StructuredData type="organization" />
      <StructuredData type="website" />
    </>
  );
}

