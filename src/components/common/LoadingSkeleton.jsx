/**
 * Loading Skeleton Components
 * Shimmer loading effects for better UX
 */

export const ProductCardSkeleton = () => {
  return (
    <div className="card overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 skeleton"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        <div className="h-5 skeleton mb-2 w-3/4"></div>
        <div className="h-4 skeleton mb-2 w-1/2"></div>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="h-4 skeleton w-24"></div>
        </div>
        
        {/* Price */}
        <div className="h-6 skeleton mb-3 w-1/3"></div>
        
        {/* Buttons */}
        <div className="flex space-x-2">
          <div className="flex-1 h-10 skeleton rounded-lg"></div>
          <div className="h-10 w-10 skeleton rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Skeleton */}
          <div>
            <div className="h-96 skeleton mb-4 rounded-xl"></div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 skeleton rounded-lg"></div>
              ))}
            </div>
          </div>
          
          {/* Info Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 skeleton mb-2 w-2/3"></div>
            <div className="h-5 skeleton mb-4 w-1/4"></div>
            <div className="h-6 skeleton mb-6 w-1/3"></div>
            <div className="h-5 skeleton mb-6 w-1/5"></div>
            <div className="h-10 skeleton mb-4 w-32"></div>
            <div className="h-12 skeleton w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CartItemSkeleton = () => {
  return (
    <div className="card p-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 skeleton rounded-lg"></div>
        <div className="flex-1">
          <div className="h-5 skeleton mb-2 w-3/4"></div>
          <div className="h-4 skeleton mb-3 w-1/4"></div>
          <div className="h-8 skeleton w-28"></div>
        </div>
        <div className="text-right">
          <div className="h-6 skeleton mb-4 w-20"></div>
          <div className="h-5 skeleton w-5"></div>
        </div>
      </div>
    </div>
  );
};

export const OrderCardSkeleton = () => {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-5 skeleton mb-2 w-1/3"></div>
          <div className="h-4 skeleton w-1/4"></div>
        </div>
        <div className="h-6 skeleton w-20 rounded-full"></div>
      </div>
      
      <div className="space-y-3 mb-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex space-x-3">
            <div className="w-16 h-16 skeleton rounded"></div>
            <div className="flex-1">
              <div className="h-4 skeleton mb-1 w-2/3"></div>
              <div className="h-3 skeleton w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="h-4 skeleton w-1/4"></div>
        <div className="h-6 skeleton w-1/5"></div>
      </div>
    </div>
  );
};

export const TableRowSkeleton = ({ columns = 5 }) => {
  return (
    <tr className="animate-pulse">
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 skeleton w-full"></div>
        </td>
      ))}
    </tr>
  );
};

export const DashboardCardSkeleton = () => {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 skeleton mb-2 w-1/2"></div>
          <div className="h-8 skeleton w-2/3"></div>
        </div>
        <div className="w-10 h-10 skeleton rounded-full"></div>
      </div>
      <div className="h-4 skeleton mt-3 w-3/4"></div>
    </div>
  );
};
