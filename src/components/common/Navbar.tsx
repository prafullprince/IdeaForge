import { Link } from "react-router-dom";
import logoImg from "../../assets/Logo/Logo-Small-Light.png";
import NavLink from "../Navbar/NavLink";
import { useSelector } from "react-redux";
import NullUser from "../Navbar/NullUser";
import LoggedUser from "../Navbar/LoggedUser";


const Navbar = () => {

  // store
  const { token } = useSelector((state:any)=>state.auth);

  return (
    <div className="border-b border-opacity-30 flex items-center border-b-pure-greys-300 bg-richblack-900 shadow-2xl">
        {/* box */}
        <div className="w-11/12 lg:w-[80%] mx-auto flex justify-between items-center py-1 md:py-0">

            {/* logo */}
            <Link to={"/"} className="flex items-center gap-2">
                <img src={logoImg} alt="logo" className="w-8 h-8" />
                <p className="text-[#F9F9F9] text-lg hidden sm:block">StudyNotion</p>
            </Link>

            {/* navLinks */}
            <NavLink />

            {/* buttons */}
            {/* token === null */}
            {
              token === null && <NullUser />
            }

            {/* token !== null */}
            {
              token !== null && <LoggedUser />
            }
        </div>
    </div>
  )
}

export default Navbar
