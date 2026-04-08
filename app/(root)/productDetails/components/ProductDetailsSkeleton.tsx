const ProductDetailsSkeleton = () => {
  return (
    <div className="animate-pulse grid grid-cols-[1fr_350px] gap-2 max-tablet:grid-cols-1! mb-6">
      <div className="grid grid-cols-[100px_minmax(0,550px)] max-lg:grid-cols-1 max-lg:grid-flow-dense justify-center items-center gap-3">
        <div className="max-lg:flex self-start max-lg:order-2 max-sm:overflow-x-auto h-fi">
          <div className="max-lg:flex self-start max-lg:order-2 max-sm:overflow-x-auto gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-20 w-27.5 h-27.5 bg-gray-300 rounded-sm mb-2"
              ></div>
            ))}
          </div>
        </div>
        {/* bigImg */}
        <div className="grid justify-center self-start max-lg:order-1">
          <div className="max-lg:h-60 h-90 aspect-square bg-gray-300 rounded-md w-100"></div>
        </div>
      </div>
      {/* start Details */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* الاسم */}
          <div className="h-8 bg-gray-300 rounded-md w-3/4"></div>

          {/* السعر */}
          <div className="h-6 bg-gray-300 rounded-md w-24"></div>

          {/* التقييم والحالة */}
          <div className="h-4 bg-gray-300 rounded-md w-32"></div>
        </div>

        {/* الوصف */}
        <div className="space-y-1">
          <div className="h-4.5 bg-gray-300 rounded-md w-full"></div>
          <div className="h-4.5 bg-gray-300 rounded-md w-full"></div>
          <div className="h-4.5 bg-gray-300 rounded-md w-2/3"></div>
        </div>

        <div className="w-full h-px bg-gray-100 my-2" />

        {/* الخيارات والعداد (CounterWithOptions) */}
        <div className="flex gap-2 items-center">
          <div className="h-9 bg-gray-300 rounded-md w-29"></div>
          <div className="h-9 bg-gray-300 rounded-md w-34"></div>
          <div className="h-9 bg-gray-300 rounded-md w-10"></div>
        </div>

        {/* معلومات التوصيل (Free delivery section) */}
        <div className="border border-gray-200 rounded-sm p-2 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-1 items-center py-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
