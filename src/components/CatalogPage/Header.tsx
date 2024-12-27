import { Link } from "react-router-dom"
import categoryLogo from "../../assets/Images/aboutus2.webp"

const Header = ({categoryName,categoryDescription}:{categoryName:any,categoryDescription:any}) => {
  return (
    <div className="bg-pure-greys-800">
      {/* content */}
      <div className="w-[90%] md:w-[80%] mx-auto py-10 flex sm:justify-between gap-4 sm:flex-row flex-col">
        {/* left part */}
        <div className="py-2 flex flex-col justify-center">
          {/* catalog route */}
          <div className="flex gap-2">
            <p className=" text-sm text-[#838894]"><Link to={"/"}>Home</Link> / Catalog /</p>
            <span className=" text-sm font-medium text-[#FFD60A]">{categoryName}</span>
          </div>
          {/* categoryName */}
          <div className="mt-3">
            <p className="text-[#F1F2FF] text-3xl font-medium">{categoryName}</p>
          </div>
          {/* category description */}
          <div className="mt-3">
            <p className="text-[#999DAA] text-sm">{categoryDescription}</p>
          </div>
        </div>
        {/* right part */}
        <div className="sm:flex sm:flex-col my-1">
          <img src={categoryLogo} className="rounded-full aspect-square w-40 h-40" />
        </div>
      </div>
    </div>
  )
}

export default Header
