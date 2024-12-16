import { BsCart3 } from "react-icons/bs"
import { IoSearchSharp } from "react-icons/io5"
import ProfileDropDown from "./ProfileDropDown"


const LoggedUser = () => {
  return (
    <div className="flex items-center gap-4 px-4">
      {/* search */}
      <button>
        <IoSearchSharp className="text-2xl text-richblack-50" />
      </button>
      {/* cart */}
      <button>
        <BsCart3 className="text-xl text-richblack-50" />
      </button>
      {/* Profile dropDown */}
      <ProfileDropDown />
    </div>
  )
}

export default LoggedUser
