import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConnectionModal = ({
  modalData,
  setModalData,
  onFollow,
}: {
  modalData: any;
  setModalData: any;
  onFollow: any;
}) => {
  // hook
  const divRef = useRef<any>(null);
  const navigate = useNavigate();

  // store
  const { user } = useSelector((state: any) => state.profile);

  // sideEffects
  useEffect(() => {
    function clickOnOutside(e: any) {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setModalData(null);
      }
    }

    document.addEventListener("mousedown", clickOnOutside);

    return () => document.removeEventListener("mousedown", clickOnOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-0 backdrop-blur-sm z-[1000]">
      <div className="flex items-center justify-center w-full h-screen mx-auto">
        <div
          ref={divRef}
          className="flex flex-col gap-2 bg-[#111B21] p-6 relative border-richblack-400 rounded-lg w-fit"
        >
          {/* heading */}
          <div className="bg-richblack-900 font-semibold text-pink-100 rounded-t-lg text-xl absolute top-0 w-full right-0 left-0 h-10 flex items-center justify-between px-6">
            {modalData.heading}
            <button
              onClick={() => setModalData(null)}
              className="text-2xl text-pink-300"
            >
              X
            </button>
          </div>
          {/* Search */}
          <div></div>
          {/* connection list */}
          <div className="flex flex-col gap-2 my-8 overflow-auto h-[40vh]">
            {modalData?.connection?.length === 0 ? (
              <p>No followers</p>
            ) : (
              <>
                {modalData?.connection?.map((connector: any) => (
                  <button
                    onClick={() => {
                      navigate(`/profile/${connector?._id}`);
                      setModalData(null);
                    }}
                    key={connector._id}
                    className="flex sm:flex-row sm:justify-between sm:items-center flex-col gap-10 cursor-pointer hover:bg-richblack-700 px-4 py-2 transition-all duration-200 rounded-lg"
                  >
                    <div className="flex gap-4 sm:justify-between items-center">
                      <div>
                        <img
                          src={connector.image}
                          alt="user"
                          width={40}
                          height={40}
                          className="rounded-full border border-pink-50 min-w-10 min-h-10"
                        />
                      </div>
                      <div className="flex gap-[2px] flex-col items-start">
                        <p className="font-bold">{connector?.name}</p>
                        <p className="text-sm text-richblack-100">
                          {connector?.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      {user?.following?.some(
                        (foll: any) => foll?._id === connector?._id
                      ) ? (
                        <></>
                      ) : (
                        <div
                          onClick={() => {
                            onFollow(connector?._id);
                          }}
                          className="bg-blue-200 px-4 py-2 rounded-lg"
                        >
                          Follow
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionModal;
