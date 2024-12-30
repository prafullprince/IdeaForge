import { useNavigate } from "react-router-dom"

const CourseCard = ({item}:any) => {

    // hook
    const navigate = useNavigate();


  return (
    <div className="sm:w-[90%] w-[99%] mx-auto">
        {/* contentBox */}
        <button onClick={()=>{
            navigate(`/course/details/${item?._id}`)
        }} className="flex gap-4 flex-col items-start lg:flex-row lg:items-start lg:w-full xl:w-[90%] w-full mx-auto hover:bg-richblack-800 transition-all duration-300 rounded-lg px-4 py-6">
            {/* thumbnail */}
            <div className="sm:max-w-md sm:min-w-[448px] max-w-[280px] min-w-[280px]">
                <img src={item?.thumbnail} className="rounded-lg aspect-video w-full h-auto" />
            </div>
            {/* details */}
            <div className="sm:max-w-md sm:min-w-[448px] max-w-[300px] min-w-[300px] lg:w-full">
                <div className="flex flex-col gap-1 items-start break-words text-wrap w-[90%]">
                    <p className="text-xl text-richblack-5 text-left w-full">{item?.courseName}</p>
                    {/* views */}
                    {/* instructor */}
                    <button onClick={(e: any)=>{
                        navigate(`/profile/${item?.instructor?._id}`);
                        e.stopPropagation();
                    }} className="flex gap-2 items-center justify-start mt-2 text-left">
                        <img src={item?.instructor?.image} className="w-8 h-8 rounded-full" />
                        <p className="text-pure-greys-100 text-sm font-semibold">{item?.instructor?.name}</p>
                    </button>
                    <p className="mt-4 text-pure-greys-300 text-sm font-medium text-left w-full">{item?.courseDesc}</p>
                </div>
            </div>
        </button>
    </div>
  )
}

export default CourseCard
