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

interface IModalData {
    text1: string,
    text2: string,
    btn1Text: string,
    btn2Text: string,
    btn1Handler: any,
    btn2Handler: any,
    heading: string
}

const Sidebar = () => {
  // store
  const { user } = useSelector((state: any) => state.auth);
  const { isOpenSidebar } = useSelector((state: any) => state.global);

  // hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   state
  const [modalData, setModalData] = useState<IModalData | null>(null);

  //   [cubic-bezier(0,1.47,.59,.71)]

  return (
    <div
      className={`bg-black min-h-screen ${
        isOpenSidebar ? "w-[300px]" : "w-[80px]"
      } ease-in transition-all duration-200`}
    >
      <div>
        {/* sidebar button */}
        <button
          onClick={() => dispatch(setIsOpenSidebar())}
          className={`mt-4 hover:bg-richblack-800 relative px-2 py-2 ml-2 rounded-lg transition-all duration-200`}
        >
          <BsWindowSidebar className="text-3xl text-richblack-300 font-extrabold relative" />
          {!isOpenSidebar && (
            <div className="absolute w-1 h-1 bg-[#e8ff15] top-3 right-3 rounded-full"></div>
          )}
        </button>
        {/* box */}
        <div className="flex flex-col gap-1 py-8">
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
                text1:"Are you sure ?",
                text2:"you will be logged out.",
                btn1Text:"Logout",
                btn2Text:"Cancel",
                btn1Handler:()=>{
                    logout(dispatch,navigate);
                    setModalData(null);
                },
                btn2Handler:()=>{
                    setModalData(null);
                },
                heading: "Logout Modal"
            })
          }}
          className={`mt-1 flex items-center gap-3 ${
            isOpenSidebar ? "py-3 px-4 mx-3 w-full" : "py-[12px] px-2 w-[80px] mx-3"
          } text-richblack-25`}
        >
          <TbLogout2 className="text-3xl" />
          {isOpenSidebar && <p className="">Logout</p>}
        </button>
      </div>
      {
        modalData && <ConfirmationModal modalData={modalData} setModalData={setModalData} />
      }
    </div>
  );
};

export default Sidebar;
