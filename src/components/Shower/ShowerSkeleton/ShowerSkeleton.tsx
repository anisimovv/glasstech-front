import Image from "next/image";
import placeholderPick from "../../../../public/images/cabins/no-picture.jpeg";

export const ShowerSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row max-w-[600px] mx-4 sm:mx-auto mt-[-100px] bg-slate-50 rounded-lg drop-shadow-lg">
      <div className="flex flex-col sm:w-[240px] shrink-0 bg-white rounded-lg">
        <div className="mx-4 mt-10 w-2/3 h-6 bg-slate-100 rounded-lg" />
        <div className="flex flex-grow items-center justify-center w-full pb-8">
          <Image
            className="mx-auto"
            src={placeholderPick}
            width="156"
            height="250"
            alt="shower picture"
            placeholder="blur"
            priority
          />
        </div>
        <div className="flex justify-between items-center p-4 border-t-2 border-slate-50">
          <div className="w-1/2">
            <h2 className="text-lg text-slate-700">Total price</h2>
            <h3 className="text-xs text-slate-400 leading-tight">
              Tax and delivery included
            </h3>
          </div>
          <div className="w-1/3 h-5 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="p-8 grow overflow-hidden">
        <div className="mb-6">
          {[1, 2, 3, 4].map((element) => {
            return (
              <div className="w-full h-10 mb-4 bg-slate-100 rounded-lg" key={element} />
            );
          })}
        </div>
        {[1, 2].map((element) => {
          return (
            <div className="w-full h-10 mb-4 bg-slate-100 rounded-lg" key={element} />
          );
        })}
      </div>
    </div>
  );
};
