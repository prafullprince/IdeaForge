

const InstructorDetails = ({courseDetails}:any) => {
  return (
    <div className="flex flex-col gap-3 mt-8">
        <div className="text-[#F1F2FF] font-semibold text-2xl">Author</div>
        <div className="flex gap-4 items-center">
            <img src={courseDetails?.instructor?.image} alt="author" className="w-[52px] h-[52px] rounded-full shadow-lg shadow-richblack-300" />
            <p className="text-[#F1F2FF] font-medium text-base">{courseDetails?.instructor?.name}</p>
        </div>
        <div className="text-[#C5C7D4] text-sm">{courseDetails?.benefits}</div>
    </div>
  )
}

export default InstructorDetails
