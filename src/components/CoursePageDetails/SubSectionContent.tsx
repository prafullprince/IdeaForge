import { RiComputerLine } from "react-icons/ri";


const SubSectionContent = ({section}:any) => {
  return (
    <div className="px-8 py-4 flex flex-col gap-3">
        {
            section?.subSections?.length === 0 ? (<p>No content available</p>) : (
                <>
                    {
                        section?.subSections?.map((data:any)=>(
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <RiComputerLine className="text-[#C5C7D4]" />
                                    <p className="text-sm font-medium text-[#F1F2FF]">{data?.title}</p>
                                </div>
                                <div>2 min</div>
                            </div>
                        ))
                    }
                </>
            )
        }
    </div>
  )
}

export default SubSectionContent
