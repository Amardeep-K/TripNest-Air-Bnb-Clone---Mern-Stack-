const ListingDetailsSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* 1. Sticky Header & Title Placeholder */}
      <div className="h-10 w-1/3 bg-gray-800 rounded mb-6 mt-4"></div>

      {/* 2. IMAGE GRID SKELETON */}
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8 h-[40em]">
        {/* Main large image */}
        <div className="col-span-2 row-span-2 bg-gray-800 h-full"></div>
        {/* 4 smaller images */}
        <div className="bg-gray-800 h-full"></div>
        <div className="bg-gray-800 h-full"></div>
        <div className="bg-gray-800 h-full"></div>
        <div className="bg-gray-800 h-full"></div>
      </div>

      {/* 3. TWO COLUMN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SECTION */}
        <div className="lg:w-2/3">
          <div className="h-7 w-40 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
          </div>

          <div className="divider opacity-10"></div>

          <div className="h-7 w-32 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 w-24 bg-gray-800 rounded"></div>
            <div className="h-4 w-24 bg-gray-800 rounded"></div>
            <div className="h-4 w-24 bg-gray-800 rounded"></div>
            <div className="h-4 w-24 bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* RIGHT SECTION (Booking Card) */}
        <div className="lg:w-1/3 h-80 bg-gray-800 rounded-2xl border border-gray-700"></div>
      </div>

      {/* 4. MAP SKELETON */}
      <div className="mt-10 mb-10">
        <div className="h-7 w-48 bg-gray-700 rounded mb-4"></div>
        <div className="h-64 w-full bg-gray-800 rounded-xl"></div>
      </div>
    </div>
  );
};

export default ListingDetailsSkeleton;