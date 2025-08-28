import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-[#f5f5f6]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1F1F1F] p-5 space-y-10 hidden md:block">
        <div className="mb-2">
          <Skeleton
            height={46}
            width={210}
            baseColor="#2c2c2c"
            highlightColor="#3e3e3e"
          />
        </div>
        <div className="mb-5">
          <Skeleton
            height={46}
            width={210}
            baseColor="#2c2c2c"
            highlightColor="#3e3e3e"
          />
        </div>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div className="mb-3" key={i}>
              <Skeleton
                height={34}
                width={210}
                baseColor="#2c2c2c"
                highlightColor="#3e3e3e"
              />
            </div>
          ))}
      </aside>

      <main className="flex-1 pb-6 py-1 ">
        <div className="flex justify-between items-center border-b py-2 border-[#001B4429] px-6">
          <Skeleton height={40} width={340} />
          <div className="flex items-center space-x-7">
            <div className="flex items-center gap-5">
              <Skeleton height={20} width={90} />
              <Skeleton height={20} width={90} />
            </div>
            <Skeleton circle height={50} width={50} />
          </div>
        </div>
        <div className="bg-[white] py-4  mb-6 border-b border-[#001B4429] px-6">
          <h2>Overview</h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-8 px-3 md:h-[150px]">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl shadow bg-white space-y-3 relative"
              >
                <div className="flex justify-between items-start">
                  <Skeleton circle height={25} width={24} />
                  <Skeleton height={14} width={12} />
                </div>

                <div className="mb-3">
                  <Skeleton height={17} width={100} />
                </div>

                <Skeleton height={32} width={120} />

                <div className="absolute bottom-5 right-4">
                  <Skeleton height={28} width={60} borderRadius={16} />
                </div>
              </div>
            ))}
        </div>
        <div className="flex gap-5 md:flex-row flex-col px-3">
          {/* Graph */}
          <div className="col-span-2 bg-white p-6 rounded-xl md:w-[930px] w-full shadow space-y-6 border border-[#001B4429]">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              {/* Left Text */}
              <div className="space-y-2">
                <Skeleton height={24} width={180} /> {/* Average Revenue */}
                <div className="flex items-center space-x-3">
                  <Skeleton height={32} width={100} /> {/* 64,23% */}
                  <Skeleton height={24} width={50} borderRadius={999} />{" "}
                  {/* Badge */}
                </div>
                <Skeleton height={16} width={120} />{" "}
              </div>

              <div className="flex items-center space-x-3">
                <Skeleton height={36} width={160} borderRadius={7} />
                <Skeleton height={36} width={100} borderRadius={7} />
              </div>
            </div>
            <div className="flex items-end justify-between h-[250px] px-1">
              {[240, 200, 160, 190, 170, 120, 150, 180, 100, 85, 115, 195].map(
                (h, i) => (
                  <Skeleton key={i} height={h} width={44} borderRadius={4} />
                )
              )}
            </div>
          </div>

          <div className="bg-white py-4 px-5 rounded-lg shadow space-y-5 border border-[#001B4429] md:w-[290px] w-full">
            <Skeleton height={35} width={190} />
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton height={30} width={180} className="rounded-md" />{" "}
                  <Skeleton height={20} width={100} className="rounded" />{" "}
                  <Skeleton height={15} width={160} className="rounded" />{" "}
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSkeleton;
