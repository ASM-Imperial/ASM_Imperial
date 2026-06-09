const ProductLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-200 aspect-square" />
          <div className="p-3">
            <div className="bg-gray-200 h-4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductLoadingSkeleton;