



const AvatarSkeleton = ({ size }: { size: 'big' | 'small' }) => (
  <div 
    className={`rounded-full bg-slate-200 animate-pulse ${size === 'big' ? 'w-16 h-16' : 'w-8 h-8'}`} 
    aria-hidden="true" 
  />
)

export default function EachBlogSkeleton() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
        <div className="col-span-8">
          <div className="text-5xl font-extrabold h-14 w-3/4 bg-slate-200 rounded animate-pulse" aria-hidden="true" />
          <div className="text-slate-500 pt-2 h-6 w-48 bg-slate-200 rounded mt-2 animate-pulse" aria-hidden="true" />
          <div className="pt-4 space-y-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-4 bg-slate-200 rounded animate-pulse" aria-hidden="true" />
            ))}
          </div>
        </div>
        <div className="col-span-4">
          <div className="text-slate-600 text-lg h-6 w-16 bg-slate-200 rounded animate-pulse" aria-hidden="true" />
          <div className="flex w-full mt-4">
            <div className="pr-4 flex flex-col justify-center">
              <AvatarSkeleton size="big" />
            </div>
            <div className="flex-1">
              <div className="text-xl font-bold h-6 w-32 bg-slate-200 rounded animate-pulse" aria-hidden="true" />
              <div className="pt-2 text-slate-500 h-12 bg-slate-200 rounded mt-2 animate-pulse" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}