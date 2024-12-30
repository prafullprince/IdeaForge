import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchApi } from "../services/apiCall/extra";
import CourseCard from "../components/common/CourseCard";

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
      <div className="w-[90%] lg:w-[80%] mx-auto">
        {/* search results */}
        <div className="flex flex-col gap-4 my-12">
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
