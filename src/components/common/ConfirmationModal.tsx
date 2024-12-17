import { useEffect, useRef } from "react";

const ConfirmationModal = ({ modalData,setModalData }: any) => {

    // hook
    const btnRef = useRef<HTMLDivElement | null>(null);
    
    // sideEffect
    useEffect(()=>{
        function clickOutsideHandler(e:MouseEvent){
            if(btnRef.current && !btnRef.current.contains(e.target as Node)){
                setModalData(null)
            }
        }
        document.addEventListener("mousedown",clickOutsideHandler);
        return ()=>{
            document.removeEventListener("mousedown",clickOutsideHandler);
        }
    },[]);


  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 z-[1000] backdrop-blur-sm">
      <div className="flex items-center justify-center max-w-sm h-screen mx-auto">
        <div ref={btnRef} className="flex flex-col gap-2 bg-richblack-800 p-6 relative border-richblack-400 rounded-lg w-[350px]">
          {/* heading */}
          <div className="bg-richblack-900 font-semibold text-pink-100 rounded-t-lg text-xl absolute top-0 w-full right-0 left-0 h-10 flex items-center justify-between px-6">
            {modalData.heading}
            <button
              onClick={modalData.btn2Handler}
              className="text-2xl text-pink-300"
            >
              X
            </button>
          </div>
          {/* text */}
          <p className="text-richblack-5 mt-8 text-xl">{modalData.text1}</p>
          <p className="text-richblack-25">{modalData.text2}</p>
          {/* buttons */}
          <div className="flex w-full justify-start gap-4 mt-4">
            <button
              onClick={modalData.btn1Handler}
              className="px-4 py-2 bg-yellow-50 text-richblack-900 rounded-lg"
            >
              {modalData.btn1Text}
            </button>
            <button
              onClick={modalData.btn2Handler}
              className="px-4 py-2 bg-richblack-900 text-white rounded-lg"
            >
              {modalData.btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
