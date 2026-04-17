export const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-dark-800 rounded-2xl p-5 border border-gray-100 dark:border-dark-700">
    <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/3 mb-3" />
    <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-2/3 mb-2" />
    <div className="h-3 bg-gray-100 dark:bg-dark-900 rounded w-1/2" />
  </div>
);

export const SkeletonRow = () => (
  <div className="animate-pulse flex items-center gap-4 p-4 border-b border-gray-100 dark:border-dark-700">
    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-700" />
    <div className="flex-1">
      <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/3 mb-2" />
      <div className="h-3 bg-gray-100 dark:bg-dark-900 rounded w-1/4" />
    </div>
    <div className="h-5 bg-gray-200 dark:bg-dark-700 rounded w-20" />
  </div>
);