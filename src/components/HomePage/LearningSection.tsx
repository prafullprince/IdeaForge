import { useEffect, useState } from "react";
import Tab from "../common/Tab"
import HighlightText from "./HighlightText"
import { HomePageExplore } from "../../data/homepage-explore";

interface Course {
    heading:string,
    description:string,
    level:string,
    lessionNumber:number,
}

const LearningSection = () => {

    // data for tab
    const data:string[] = ["Free","New to coding","Most popular","Skills paths","Career paths"];

    // state
    const [tabData,setTabData] = useState<string>(data[0]);
    const [course,setCourse] = useState<Course[] | []>(HomePageExplore[0].courses);
    const [currentCourse,setCurrentCourse] = useState<string>(course[0].heading);
    console.log(currentCourse)
    console.log(course)

    // sideEffects
    useEffect(()=>{
        // filteredCourse a/c to tag
        const filteredCourse:Course[] = HomePageExplore.find((doc) => doc.tag === tabData )?.courses || [];
        setCourse(filteredCourse);
        setCurrentCourse(filteredCourse[0].heading);
    },[tabData])


  return (
    <div className="lg:w-[80%] w-11/12 mx-auto mt-32">
        <div className="w-full flex flex-col items-center">
            <h2 className="lg:text-5xl lg:font-semibold text-3xl font-medium">Unlock the <HighlightText text="Power of Code" /></h2>
            <p className="text-[#838894] font-medium mt-4">Learn to Build Anything You Can Imagine</p>
            <div className="mt-8">
                <Tab data={data} tabData={tabData} setTabData={setTabData} />
            </div>

        </div>
    </div>
  )
}

export default LearningSection
