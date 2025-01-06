import { IoSearchSharp } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import SearchModal from "../common/SearchModal";
import { fetchAllCategoryApi } from "../../services/apiCall/category";
import { IoMdArrowDropdown } from "react-icons/io";

interface ICategory {
  _id: string;
  categoryName: string;
  CategoryDesc: string;
}

const NullUser = () => {
  // hook
  const location = useLocation();
  const { totalItems } = useSelector((state: any) => state.cart);
  const prevCategoriesRef = useRef<ICategory[]>([]);

  // state
  const [modalData, setModalData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState<ICategory[]>([]);

  // apiCall -> fetchAllCategory
  useEffect(() => {
    async function fetchAllCategory() {
      setLoading(true);
      try {
        // apiCall
        const result = await fetchAllCategoryApi();
        if (JSON.stringify(result) !== JSON.stringify(prevCategoriesRef)) {
          setAllCategory(result);
          prevCategoriesRef.current = result;
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchAllCategory();
  }, []);

  return (
    <div className="flex items-center gap-4 px-4">
      {/* catalog */}
      <div className="relative flex items-center gap-[2px] cursor-pointer group">
        <IoMdArrowDropdown className="text-3xl" />
        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-60%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 text-richblack-900 opacity-0 transition-all  duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] px-2 py-4 gap-1">
          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
          {loading ? (
            <span className="loader"></span>
          ) : (
            <>
              {allCategory?.length === 0 ? (
                <>No category found</>
              ) : (
                <>
                  {allCategory?.map((cat) => (
                    <Link
                      to={`/catalog/${cat?.categoryName
                        ?.split(" ")
                        .join("-")
                        .toLowerCase()}`}
                      className="text-black py-2 px-4 hover:bg-richblack-700 hover:text-white rounded-lg flex items-center transition-all duration-200"
                      key={cat._id}
                    >
                      {cat?.categoryName}
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* search */}
      <button
        onClick={() => {
          setModalData({
            heading: "Search Modal",
          });
        }}
      >
        <IoSearchSharp className="text-2xl text-richblack-50" />
      </button>
      {/* cart */}
      <Link className="relative" to={"/cart"}>
        <BsCart3 className="text-2xl text-richblack-50" />
        <div className="absolute top-0 bg-pink-200 px-[6px] translate-x-3 translate-y-[-8px] rounded-full text-base">
          {totalItems}
        </div>
      </Link>
      {/* signup/login */}
      {location.pathname === "/signup" ? (
        <Link
          to={"/login"}
          className="w-[72px] text-center py-[6px] border border-richblack-500 rounded-lg text-richblack-50"
        >
          Login
        </Link>
      ) : (
        <Link
          to={"/signup"}
          className="w-[72px] text-center py-[6px] border border-richblack-500 rounded-lg text-richblack-50"
        >
          Signup
        </Link>
      )}

      {modalData && (
        <SearchModal modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
};

export default NullUser;
