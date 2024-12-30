import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

const ConnectionModal = ({modalData,setModalData}:{modalData:any,setModalData:any}) => {

  // hook
  const divRef = useRef<any>(null);
  const navigate = useNavigate();

  // sideEffects
  useEffect(()=>{

    function clickOnOutside(e:any){
      if(divRef.current && !divRef.current.contains(e.target)){
        setModalData(null);
      }
    }

    document.addEventListener("mousedown",clickOnOutside);

    return ()=> document.removeEventListener("mousedown",clickOnOutside);

  },[])



  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 z-[1000] backdrop-blur-sm">
      <div className="flex items-center justify-center w-full h-screen mx-auto">
        <div ref={divRef} className="flex flex-col gap-2 bg-pure-greys-700 p-6 relative border-richblack-400 rounded-lg w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%]">
          {/* heading */}
          <div className="bg-richblack-900 font-semibold text-pink-100 rounded-t-lg text-xl absolute top-0 w-full right-0 left-0 h-10 flex items-center justify-between px-6">
            {modalData.heading}
            <button
              onClick={()=>setModalData(null)}
              className="text-2xl text-pink-300"
            >
              X
            </button>
          </div>
          {/* Search */}
          <div></div>
          {/* connection list */}
          <div className="flex flex-col gap-2 my-8">
            {modalData?.connection?.length === 0 ? <p>No followers</p> : <>
                {
                    modalData?.connection?.map((connector:any)=>(
                        <button onClick={()=>{
                          navigate(`/profile/${connector?._id}`);
                          setModalData(null);
                          
                        }} key={connector._id} className="flex sm:flex-row sm:justify-between sm:items-center flex-col gap-2 cursor-pointer hover:bg-richblack-900 px-4 py-2 transition-all duration-200 rounded-lg">
                            <div className="flex gap-4 sm:justify-between items-center">
                                <div>
                                    <img src={connector.image} alt="user" width={40} height={40} className="rounded-full border border-pink-50" />
                                </div>
                                <div className="flex gap-[2px] flex-col items-start">
                                    <p>{connector?.name}</p>
                                    <p>{connector?.email}</p>
                                </div>
                            </div>
                            <div>
                                <button className="bg-pure-greys-900 px-4 py-2 rounded-lg">Remove</button>
                            </div>
                        </button>
                    ))
                }
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectionModal
