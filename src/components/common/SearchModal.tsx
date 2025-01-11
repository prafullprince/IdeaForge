import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { searchApi } from "../../services/apiCall/extra";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const SearchModal = ({
  modalData,
  setModalData,
}: {
  modalData: any;
  setModalData: any;
}) => {
  // state
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState<any>([]);
  console.log(course)

  // apiCall function
  async function searchApiCall() {
    try {
      const result = await searchApi(query);
      setCourse(result);
    } catch (error) {
      console.log(error);
    }
  }

  // sideEffect -> apiCall on every query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchApiCall();
    }, 300);

    return () => clearInterval(timeoutId);
  }, [query]);

  return (
    <div className="fixed inset-0 z-[1000] bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center w-full min-h-screen">
      <div className="w-11/12 mx-auto min-w-[350px] flex flex-col max-w-[1000px] rounded-b-lg">
        {/* header */}
        <div className="px-6 py-4 flex justify-between items-center bg-[#2C333F] border-b-[1px] border-b-[#424854]">
          <div className="text-[#FFFFFF] text-lg font-semibold">
            {modalData?.heading}
          </div>
          <button
            onClick={() => setModalData(null)}
            className="text-xl text-pink-200"
          >
            X
          </button>
        </div>
        {/* search input */}
        <div className="flex flex-col gap-[6px] py-4 bg-richblack-900 min-h-40">
          <div className="relative">
            <Input
              className="text-richblack-100 bg-richblack-800 px-14 w-[90%] mx-auto"
              type="text"
              placeholder="Search course, user...."
              name="query"
              value={query}
              onChange={(e: any) => {
                setQuery(e.target.value);
              }}
            />
            <div className="absolute top-[30%] text-xl font-bold text-white left-[7%]">
              <BsSearch className="text-richblack-300 text-xl" />
            </div>
          </div>
          {/* search results */}
          <div className={`flex flex-col gap-4 w-[90%] mx-auto bg-pure-greys-700 rounded-lg overflow-auto h-auto ${query ? "px-4 py-4" : ""}`}>
            {course?.length === 0 ? (
              <p>No course found</p>
            ) : (
              <>
                {course?.map((item: any) => (
                  <Link onClick={()=> {
                    // setQuery(item?.courseName);
                    setModalData(null);
                  }} to={`/searchResults?v=${query}`} key={item?._id} className="flex gap-2 break-words text-wrap">
                    <img src={item?.instructor?.image} className="w-8 h-8 min-w-8 min-h-8 rounded-full" />
                    <p>{item?.courseName}</p>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
