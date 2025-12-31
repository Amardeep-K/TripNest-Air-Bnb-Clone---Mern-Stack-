const ListingSkeleton = () => {
  return (
    <div className="card bg-gray-900 h-[25em] w-[25em] mb-7 shadow-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-800"></div>

      <div className="card-body flex flex-col justify-between">
        <div>
          {/* Title Skeleton */}
          <div className="h-6 w-3/4 bg-gray-700 rounded mb-4"></div>
          
          {/* Description Lines */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-800 rounded"></div>
          </div>
        </div>

        <div className="card-actions flex items-center justify-between mt-4">
          {/* Price Badge Skeleton */}
          <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
          
          {/* Button Skeleton */}
          <div className="h-10 w-28 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingSkeleton;