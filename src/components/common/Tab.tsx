import React from "react"

// props type
interface TabComponentProps {
    data:string[],
    tabData:string,
    setTabData:React.Dispatch<React.SetStateAction<string>>,
    which:string
}


const Tab = ({data,tabData,setTabData,which}:TabComponentProps) => {
  return (
    <div className={`px-2 py-[6px] w-fit sm:w-full rounded-lg ${which === "homepage" ? "shadow-lg grid place-items-start grid-cols-2 sm:flex sm:items-center shadow-yellow-50 bg-richblack-800" : "shadow-sm flex items-center shadow-yellow-50 bg-pure-greys-900"}`}>
        {
            data.map((el:string,idx:number)=>(
                <button onClick={()=>setTabData(el)} className={`${tabData === el ? "bg-richblack-900 px-4 py-[6px] rounded-lg font-medium" : "px-4 py-[6px] sm:py-0 text-richblack-100"}`} key={idx}>
                    {el}
                </button>
            ))
        }
    </div>
  )
}

export default Tab;
