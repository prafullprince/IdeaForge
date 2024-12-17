import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setIsOpenSidebar } from "../slices/globalSlice";

const DashboardLayoutPage = () => {

  // hook
  const btnRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  // sideEffect
  useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (btnRef.current && btnRef.current.contains(e.target as Node)) {
        dispatch(setIsOpenSidebar(false));
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler);

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-auto">
      {/* box */}
      <div className="flex">
        {/* sidebar */}
        <Sidebar />
        {/* outlet */}
        <div ref={btnRef} className="bg-pure-greys-900 w-full py-6">
          <div className="w-11/12 mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayoutPage;
