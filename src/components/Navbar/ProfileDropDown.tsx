import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDashboard3Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiCall/auth";

const ProfileDropDown = () => {
  // store
  const { user } = useSelector((state: any) => state.profile);

  // hook
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state
  const [isOpen, setIsOpen] = useState(false);

  // sideEffect
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mt-2">
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <img
          src={user?.image}
          width={32}
          height={32}
          className="border-0 rounded-full max-w-[28px] max-h-[28px] sm:max-w-8 sm:max-h-8"
        />
      </button>

      {isOpen && (
        <div
          ref={dropDownRef}
          className="absolute mt-2 right-0 bg-[#343541] rounded-md shadow-lg flex flex-col items-start px-2 py-2 text-white z-50"
        >
          <button
            onClick={() => {
              navigate("/dashboard/profile");
              setIsOpen(false);
            }}
            className="flex gap-2 items-center px-3 py-2 w-full hover:bg-richblack-600 rounded-md transition-all duration-200"
          >
            <RiDashboard3Line className="text-xl" />
            <p>Dashboard</p>
          </button>
          <button
            onClick={() => {
              logout(dispatch, navigate);
              setIsOpen(false);
            }}
            className="flex gap-2 items-center px-3 py-2 hover:bg-richblack-600 rounded-md transition-all duration-200 w-full"
          >
            <TbLogout2 className="text-xl" />
            <p>Logout</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
