import { useDispatch, useSelector } from "react-redux";
import { ISidebarLink, sidebarLinks } from "../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { BsWindowSidebar } from "react-icons/bs";
import { setIsOpenSidebar } from "../../slices/globalSlice";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { logout } from "../../services/apiCall/auth";
import { useNavigate } from "react-router-dom";


export interface IModalData {
  text1: string;
  text2: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: any;
  btn2Handler: any;
  heading: string;
}

const Sidebar = () => {
  // store
  const { user } = useSelector((state: any) => state.profile);
  const { isOpenSidebar } = useSelector((state: any) => state.global);

  // hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  // // match route
  // const matchRoute = (route: any) => {
  //   return matchPath({ path: route }, location.pathname);
  // };

  //   state
  const [modalData, setModalData] = useState<IModalData | null>(null);

  return (
    <div
      className={`bg-pure-greys-900 min-h-screen relative ${
        isOpenSidebar ? "sm:w-[300px] w-fit" : "sm:w-[80px] w-0"
      } ease-[cubic-bezier(0,1.93,0,1.93)] transition-all duration-1000`}
    >
      {/* sidebar button */}
      <button
        onClick={() => dispatch(setIsOpenSidebar())}
        className={`absolute top-2 hover:bg-richblack-800 ${
          isOpenSidebar ? "px-4 mx-[20px]" : "sm:px-4 sm:mx-3 px-2 mx-2"
        } py-2 rounded-lg transition-all duration-200`}
      >
        <BsWindowSidebar className="text-3xl text-richblack-400 font-extrabold relative" />
        {!isOpenSidebar && (
          <div className="absolute w-1 h-1 bg-[#e8ff15] top-3 right-5 rounded-full"></div>
        )}
      </button>
      {/* sidebar links */}
      <div className={`${isOpenSidebar ? "block" : "sm:block hidden"}`}>
        {/* box */}
        <div className="flex flex-col gap-1 py-8 mt-12">
          {sidebarLinks.map((link: ISidebarLink) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        {/* dash line */}
        <div className="px-4">
          <div className="w-full h-[1px] bg-richblack-500"></div>
        </div>
        {/* cart */}
        {/* {user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <Link to={"/dashboard/cart"}
          className={`flex gap-3 items-center relative mt-8 ${
            isOpenSidebar ? "py-3 px-6 mx-2" : "py-[12px] px-4 w-fit mx-2"
          } rounded-lg font-thin ${
            matchRoute("/dashboard/cart")
              ? "bg-[#3D2A01] text-yellow-25 font-medium"
              : "text-richblack-25"
          }`}
          >
            <FaShoppingBag className="text-3xl" />
            {isOpenSidebar && <p className="sm:block hidden">Cart</p>}
          </Link>
        )} */}
        {/* settings */}
        <div className="mt-8">
          <SidebarLink
            iconName="VscSettingsGear"
            link={{ path: "/dashboard/settings", name: "Settings" }}
          />
        </div>
        {/* logout */}
        <button
          onClick={() => {
            setModalData({
              text1: "Are you sure ?",
              text2: "you will be logged out.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => {
                logout(dispatch, navigate);
                setModalData(null);
              },
              btn2Handler: () => {
                setModalData(null);
              },
              heading: "Logout Modal",
            });
          }}
          className={`mt-2 flex items-center gap-3 ${
            isOpenSidebar
              ? "py-3 px-4 mx-3 w-full"
              : "py-[12px] px-2 w-[80px] mx-3"
          } text-richblack-25`}
        >
          <TbLogout2 className="text-3xl" />
          {isOpenSidebar && <p className="sm:block hidden">Logout</p>}
        </button>
      </div>
      {modalData && (
        <ConfirmationModal modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
};

export default Sidebar;
