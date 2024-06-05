import { Suspense } from "react";

const Loading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className='h-screen w-screen flex items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-50' />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default Loading;
