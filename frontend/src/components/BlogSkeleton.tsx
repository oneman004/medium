

export default function BlogSkeleton() {
  return (
    <div className="flex flex-col border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer animate-pulse">
      <div className="flex">
        <div className="px-2 flex justify-center">
          <div className="w-8 h-8 bg-slate-200 rounded-full" aria-hidden="true" />
        </div>
        <div className="px-2 flex flex-col justify-center">
          <div className="w-24 h-4 bg-slate-200 rounded" aria-hidden="true" />
        </div>
        <div className="flex flex-col justify-center px-2">
          <div className="w-1 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
        </div>
        <div className="px-2 flex flex-col justify-center">
          <div className="w-20 h-4 bg-slate-200 rounded" aria-hidden="true" />
        </div>
      </div>
      <div className="pl-2 pt-2 flex flex-col">
        <div className="font-bold text-3xl h-8 w-3/4 bg-slate-200 rounded mb-2" aria-hidden="true" />
        <div className="text-slate-600 font-light text-l pb-6 space-y-2">
          <div className="w-full h-4 bg-slate-200 rounded" aria-hidden="true" />
          <div className="w-full h-4 bg-slate-200 rounded" aria-hidden="true" />
          <div className="w-2/3 h-4 bg-slate-200 rounded" aria-hidden="true" />
        </div>
        <div className="text-slate-500 font-thin text-sm">
          <div className="w-24 h-4 bg-slate-200 rounded" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}