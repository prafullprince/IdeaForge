import { BsCart3 } from "react-icons/bs"
import { IoSearchSharp } from "react-icons/io5"
import ProfileDropDown from "./ProfileDropDown"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import SearchModal from "../common/SearchModal"


const LoggedUser = () => {

  // store
  const { totalItems } = useSelector((state:any)=> state.cart);

  const [modalData,setModalData] = useState<any>(null);

  return (
    <div className="flex items-center gap-4 px-4">
      {/* search */}
      <button onClick={()=>{
        setModalData({
          heading: "Search Modal"
        })
      }}>
        <IoSearchSharp className="text-2xl text-richblack-50" />
      </button>
      {/* cart */}
      <Link className="relative" to={"/cart"}>
        <BsCart3 className="text-2xl text-richblack-50" />
        <div className="absolute top-0 bg-pink-200 px-[6px] translate-x-3 translate-y-[-8px] rounded-full text-base">{totalItems}</div>
      </Link>
      {/* Profile dropDown */}
      <ProfileDropDown />


      {
        modalData && <SearchModal modalData={modalData} setModalData={setModalData} />
      }
    </div>
  )
}

export default LoggedUser
