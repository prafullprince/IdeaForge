import { IoSearchSharp } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const NullUser = () => {

  // hook
  const location = useLocation();

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
      {/* signup/login */}
      {
        location.pathname === "/signup" ? 
            (<Link to={"/login"} className="w-[72px] text-center py-[6px] border border-richblack-500 rounded-lg text-richblack-50">Login</Link>) :
            (<Link to={"/signup"} className="w-[72px] text-center py-[6px] border border-richblack-500 rounded-lg text-richblack-50">Signup</Link>)
      }
    </div>
  );
};

export default NullUser;
