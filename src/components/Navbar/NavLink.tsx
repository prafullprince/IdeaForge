import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { fetchAllCategoryApi } from "../../services/apiCall/category";

// interface ICategory {
//   _id: string;
//   categoryName: string;
//   CategoryDesc: string;
// }

const NavLink = () => {
  
  // hook
  // const prevCategoriesRef = useRef<ICategory[]>([]);
  const location = useLocation();

  // matchRoute function
  const matchRoute = (route: any) => {
    return matchPath({ path: route }, location.pathname);
  };

  // // state
  // const [loading, setLoading] = useState(false);
  // const [allCategory, setAllCategory] = useState<ICategory[]>([]);

  // // apiCall -> fetchAllCategory
  // useEffect(() => {
  //   async function fetchAllCategory() {
  //     setLoading(true);
  //     try {
  //       // apiCall
  //       const result = await fetchAllCategoryApi();
  //       if (JSON.stringify(result) !== JSON.stringify(prevCategoriesRef)) {
  //         setAllCategory(result);
  //         prevCategoriesRef.current = result;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   }
  //   fetchAllCategory();
  // }, []);

  return (
    <ul className="md:flex items-center gap-6 py-3 xl:py-4 hidden">
      {NavbarLinks.map((link, idx) => (
        <li key={idx}>
          {link.title === "Catalog" ? (
            <></>
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
