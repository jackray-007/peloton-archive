import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

