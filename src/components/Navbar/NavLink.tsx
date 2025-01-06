import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { fetchAllCategoryApi } from "../../services/apiCall/category";

interface ICategory {
  _id: string;
  categoryName: string;
  CategoryDesc: string;
}

const NavLink = () => {
  
  // hook
  const prevCategoriesRef = useRef<ICategory[]>([]);
  const location = useLocation();

  // matchRoute function
  const matchRoute = (route: any) => {
    return matchPath({ path: route }, location.pathname);
  };

  // state
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
    <ul className="md:flex items-center gap-6 py-3 xl:py-4 hidden">
      {NavbarLinks.map((link, idx) => (
        <li key={idx}>
          {link.title === "Catalog" ? (
            <div className="relative flex items-center gap-[2px] cursor-pointer group">
              <p>{link.title}</p>
              <IoMdArrowDropdown className="text-xl" />
              <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 text-richblack-900 opacity-0 transition-all  duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] px-2 py-4 gap-1">
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
          ) : (
            <Link
              to={link.path}
              className={`${
                matchRoute(link?.path) ? "text-yellow-50" : "text-richblack-25"
              }`}
            >
              <p>{link.title}</p>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLink;
