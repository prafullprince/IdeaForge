import { FaArrowRight } from "react-icons/fa6"
import { Link } from "react-router-dom"


interface HighlightButtonProps {
    children:string,
    isActive:boolean,
    linkto:string
}

const HighlightButton = ({children,isActive,linkto}:HighlightButtonProps) => {
  return (
    <Link to={linkto} className={`hover:scale-95 duration-200 transition-all ${isActive ? "bg-[#FFD60A] text-[#000814]" : "bg-richblack-900 text-[#F1F2FF]"} sm:px-4 sm:py-2 px-3 py-2 font-medium leading-6 text-[16px] rounded-lg shadow-sm shadow-[#FFFFFF82] flex gap-1 items-center`}>
      <p className="lg:font-medium lg:text-lg">{children}</p>
      {
        isActive ? (<FaArrowRight />) : null
      }
    </Link>
  )
}
export default HighlightButton
