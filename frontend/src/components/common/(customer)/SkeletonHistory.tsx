const SkeletonHistory = () => {
  return (
    <div className="md:p-10 p-4">
      <div className="md:flex sm:flex-1 flex-1 flex-col justify-between w-full mb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:mb-8 mb-3 md:w-1/2 w-full">
          <div className="flex w-full flex-col">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-200 rounded-md animate-pulse" />
              Order History
            </h1>
            <p className="text-gray-500 mt-1">
              Check the status of recent orders and manage your returns.
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:gap-10 gap-2 md:w-1/2 w-full">
          <div className="flex gap-5 items-center">
            <h1 className="uppercase tracking-widest">Payment:</h1>
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, idx) => {
                return (
                  <div
                    key={idx}
                    className={`px-5 py-2 rounded-md bg-slate-300 animate-pulse
                      `}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-5 w-full items-center">
            <h1 className="uppercase text-xs font-medium tracking-widest">
              Status:
            </h1>
            <div className="md:flex grid grid-cols-5 gap-1 w-full">
              {Array.from({ length: 8 }).map((_, idx) => {
                return (
                  <div
                    key={idx}
                    className={`px-5 py-2 rounded-md bg-slate-300 animate-pulse
                      `}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, idx) => {
        return (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow my-5"
          >
            <div className="p-4 sm:p-6 flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 bg-slate-50/50">
              <div className="flex flex-wrap gap-4 sm:gap-8">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Order ID
                  </p>
                  <p className="font-bold bg-slate-300 px-1 py-2 rounded-md animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Date Placed
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <p className="font-bold bg-slate-300 px-1 py-2 rounded-md animate-pulse w-full" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Total Amount
                  </p>
                  <p className="font-bold bg-slate-300 px-1 py-2 rounded-md animate-pulse" />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                    Status
                  </p>
                  <p className="font-bold bg-slate-300 px-1 py-2 rounded-md animate-pulse w-full" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                    Payment
                  </p>
                  <p className="font-bold bg-slate-300 px-1 py-2 rounded-md animate-pulse w-full" />
                </div>
                <p className="font-bold bg-slate-300 rounded-md animate-pulse w-15 h-4" />
              </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 overflow-hidden">
                  <div className="inline-block h-12 w-12 rounded-lg ring-2 ring-white object-cover bg-gray-100 animate-pulse" />
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gray-200 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <p className="bg-gray-400 animate-pulse h-2.5 w-10 rounded-md" />
                  <p className="text-xs text-gray-500">
                    Track package for status updates
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium`}
                >
                  <div className="w-16 h-5 bg-slate-200 rounded-md" />
                </div>
                <div className="w-16 h-5 bg-slate-200 rounded-md" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonHistory;
