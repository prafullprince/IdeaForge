import * as Icons from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";


const SidebarLink = ({ link, iconName }: any) => {
  // store
  const { isOpenSidebar } = useSelector((state: any) => state.global);

  // icon
  const Icon: any = (Icons as any)[iconName];

  // hook
  const location = useLocation();

  // match route
  const matchRoute = (route: any) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <Link
      to={link.path}
      className={`flex gap-3 items-center relative ${
        isOpenSidebar ? "py-3 px-6 mx-3" : "py-[12px] px-4 w-fit mx-3"
      } rounded-lg font-thin ${
        matchRoute(link.path)
          ? "bg-[#3D2A01] text-yellow-25 font-medium"
          : "text-richblack-25"
      }`}
    >
      <Icon className="text-2xl w-fit" />
      {isOpenSidebar && (
        <p
          className=""
        >
          {link.name}
        </p>
      )}
      <div className={`absolute ${matchRoute(link.path) ? "w-1 bg-yellow-50 h-full left-0" : ""}`}></div>
    </Link>
  );
};

export default SidebarLink;
