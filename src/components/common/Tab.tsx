import React from "react"

interface TabComponentProps {
    data:string[],
    tabData:string,
    setTabData:React.Dispatch<React.SetStateAction<string>>
}

const Tab = ({data,tabData,setTabData}:TabComponentProps) => {
  return (
    <div className="grid place-items-start grid-cols-2 sm:flex sm:items-center bg-richblack-800 px-2 py-[6px] w-full rounded-lg shadow-lg shadow-yellow-50">
        {
            data.map((el:string,idx:number)=>(
                <button onClick={()=>setTabData(el)} className={`${tabData === el ? "bg-richblack-900 px-4 py-[6px] rounded-lg" : "px-4 py-[6px] sm:py-0 text-richblack-50"}`} key={idx}>
                    {el}
                </button>
            ))
        }
    </div>
  )
}

export default Tab;
