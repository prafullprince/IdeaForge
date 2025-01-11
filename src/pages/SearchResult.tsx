import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchResultsApi } from "../services/apiCall/extra";
import CourseCard from "../components/common/CourseCard";
import { VscListFilter } from "react-icons/vsc";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query: any = searchParams.get("v"); // Extract query from URL
  const scrollRef = useRef<HTMLDivElement>(null);

  // State
  const [courses, setCourses] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // API Call to fetch search results
  const fetchCourses = async () => {
    if (!query || loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await searchResultsApi(query, page);
      const fetchedCourses = response?.data || [];
      setCourses((prev) => [...prev, ...fetchedCourses]);
      setHasMore(page < (response?.totalPage || 1));
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Infinite Scroll Logic
  const handleScroll = () => {
    if (!scrollRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1); // Increment page to load more results
    }
  };

  // Reset State on Query Change
  useEffect(() => {
    setCourses([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // Fetch courses whenever page or query changes
  useEffect(() => {
    fetchCourses();
  }, [page, query]);

  // Attach Scroll Event Listener
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto my-12">
      {/* Filters */}
      <button className="flex items-center gap-2 text-xl hover:bg-richblack-600 px-3 py-1 rounded-lg transition-all duration-200">
        <p>Filters</p>
        <VscListFilter className="font-bold" />
      </button>

      {/* Search Results */}
      <div
        ref={scrollRef}
        className="flex flex-col gap-4 overflow-y-auto h-[80vh] rounded-lg p-4"
      >
        {courses.length > 0
          ? courses.map((item: any) => (
              <CourseCard key={item?._id} item={item} />
            ))
          : !loading && <p className="text-center">No results found</p>}

        {/* Loading Spinner */}
        {loading && (
          <div className="w-full flex justify-center items-center">
            <div className="div"></div>
          </div>
        )}

        {/* End of Results */}
        {!hasMore && !loading && courses.length > 0 && (
          <p className="text-center">You’ve reached the end of results</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
