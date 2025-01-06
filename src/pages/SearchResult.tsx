import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchApi } from "../services/apiCall/extra";
import CourseCard from "../components/common/CourseCard";
import { VscListFilter } from "react-icons/vsc";

const SearchResult = () => {

  // hook
  const [searchParams] = useSearchParams();
  const query:any = searchParams.get("v");

  // state
  const [course, setCourse] = useState<any>([]);

  // apiCall function
  async function searchApiCall() {
    try {
      const result = await searchApi(query);
      setCourse(result);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(course);

  // sideEffect -> apiCall on every query changes
  useEffect(() => {
    searchApiCall();
  }, [query]);

  return (
    <div className="">
      <div className="w-[90%] lg:w-[80%] mx-auto my-12">
        {/* filters */}
        <button className="flex items-center gap-2 text-xl hover:bg-richblack-600 px-3 py-1 rounded-lg transition-all duration-200">
          <p>Filters</p>
          <VscListFilter className="font-bold" />
        </button>
        {/* search results */}
        <div className="flex flex-col gap-4">
            {
                course?.map((item:any)=>(
                    <CourseCard key={item?._id} item={item} />
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
