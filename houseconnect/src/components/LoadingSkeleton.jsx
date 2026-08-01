// ============================================================
// HouseConnect Kenya — Loading Skeleton Components
// ============================================================
// Reusable skeleton placeholders to show during data loading.
// ============================================================

/**
 * A pulsing placeholder block.
 */
const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

/**
 * Full-page dashboard loading skeleton.
 */
export const DashboardSkeleton = () => (
  <div className="space-y-8 p-6">
    {/* Header */}
    <div>
      <SkeletonBlock className="h-9 w-64 mb-2" />
      <SkeletonBlock className="h-5 w-48" />
    </div>

    {/* Stat cards */}
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
          <SkeletonBlock className="h-4 w-20 mb-3" />
          <SkeletonBlock className="h-8 w-16 mb-2" />
          <SkeletonBlock className="h-3 w-24" />
        </div>
      ))}
    </div>

    {/* Two-column section */}
    <div className="grid xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
        <SkeletonBlock className="h-6 w-40 mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 mb-4">
            <SkeletonBlock className="h-16 w-16 rounded-xl shrink-0" />
            <div className="flex-1">
              <SkeletonBlock className="h-5 w-3/4 mb-2" />
              <SkeletonBlock className="h-4 w-full mb-1" />
              <SkeletonBlock className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <SkeletonBlock className="h-6 w-32 mb-4" />
        <SkeletonBlock className="h-32 w-full rounded-xl" />
      </div>
    </div>

    {/* Two-column section */}
    <div className="grid xl:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
          <SkeletonBlock className="h-6 w-36 mb-4" />
          {[1, 2, 3].map((j) => (
            <div key={j} className="flex gap-3 mb-3">
              <SkeletonBlock className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1">
                <SkeletonBlock className="h-4 w-2/3 mb-1" />
                <SkeletonBlock className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/**
 * A table row skeleton for list pages.
 */
export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
    {/* Header */}
    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50">
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonBlock key={i} className="h-4 col-span-3" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0">
        {Array.from({ length: cols }).map((_, j) => (
          <SkeletonBlock key={j} className="h-4 col-span-3" />
        ))}
      </div>
    ))}
  </div>
);

/**
 * A card skeleton for grid layouts.
 */
export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    <SkeletonBlock className="h-40 w-full rounded-xl mb-4" />
    <SkeletonBlock className="h-5 w-3/4 mb-2" />
    <SkeletonBlock className="h-4 w-full mb-1" />
    <SkeletonBlock className="h-4 w-2/3 mb-3" />
    <div className="flex justify-between">
      <SkeletonBlock className="h-4 w-16" />
      <SkeletonBlock className="h-4 w-20" />
    </div>
  </div>
);

/**
 * Grid of card skeletons.
 */
export const CardGridSkeleton = ({ count = 6 }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Profile / details page skeleton.
 */
export const DetailSkeleton = () => (
  <div className="space-y-6 p-6">
    <SkeletonBlock className="h-8 w-72 mb-2" />
    <SkeletonBlock className="h-5 w-48" />
    <div className="grid lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <SkeletonBlock className="h-6 w-40 mb-4" />
          <SkeletonBlock className="h-4 w-full mb-2" />
          <SkeletonBlock className="h-4 w-full mb-2" />
          <SkeletonBlock className="h-4 w-2/3" />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <SkeletonBlock className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonBlock key={i} className="h-12 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
        <SkeletonBlock className="h-6 w-32 mb-4" />
        <SkeletonBlock className="h-10 w-full rounded-xl mb-3" />
        <SkeletonBlock className="h-10 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

/**
 * Inline text skeleton (for inline loading states).
 */
export const TextSkeleton = ({ width = "w-24", className = "" }) => (
  <SkeletonBlock className={`h-4 inline-block align-middle ${width} ${className}`} />
);

export default SkeletonBlock;
