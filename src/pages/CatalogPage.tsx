import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  categoryPageDetailsApi,
  fetchAllCategoryApi,
} from "../services/apiCall/category";
import Header from "../components/CatalogPage/Header";
import CategoryTab from "../components/CatalogPage/CategoryTab";
import Corousel from "../components/common/Corousel";
import FullPage from "../spinner/FullPage";

const CatalogPage = () => {
  // hook
  const { catalogName } = useParams();

  // state
  const [categoryId, setCategoryId] = useState<any | null>(null);
  const [course, setCourse] = useState<any | null>(null);
  const [categoryDescription, setCategoryDescription] = useState<any | null>(null);
  const [categoryName, setCategoryName] = useState<any | null>(null);
  const [loading,setLoading] = useState<any | any>(false);

  // fetchCategoryPageDetails
  useEffect(() => {
    async function fetchCategoryPageDetails() {
      setLoading(true);
      try {
        const result = await categoryPageDetailsApi(categoryId);
        setCourse(result?.courses);
        setCategoryName(result?.categoryName);
        setCategoryDescription(result?.categoryDesc);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchCategoryPageDetails();
  }, [categoryId]);

  // fetchCategoryId
  useEffect(() => {
    async function categoryDetails() {
      try {
        const result = await fetchAllCategoryApi();
        const filteredCateory = result?.filter(
          (cat: any) =>
            cat?.categoryName.split(" ").join("-").toLowerCase() === catalogName
        )[0];
        setCategoryId(filteredCateory?._id);
      } catch (error) {
        console.log(error);
      }
    }
    categoryDetails();
  }, [catalogName]);

  // spinner
  if(loading) return <FullPage />

  return (
    <div className="min-h-screen w-full">
      {/* header */}
      <Header
        categoryName={categoryName}
        categoryDescription={categoryDescription}
      />
      {/* box */}
      <div className="w-11/12 lg:w-[80%] mx-auto flex mt-12">
        {/* content */}
        <div className="flex flex-col w-full">
          {/* section 1 */}
          <div className="flex flex-col gap-4">
            {/* header */}
            <div className="flex flex-col gap-4">
              <p className="text-[#F1F2FF] text-3xl font-semibold">
                Courses to get you started
              </p>
              <CategoryTab />
            </div>
            {/* slider */}
            <div className="w-full">
              <Corousel>
                {course?.map((item: any) => (
                  <Link to={`/course/details/${item._id}`}
                    key={item?._id}
                    className="cursor-pointer"
                  >
                    <img
                      src={item?.thumbnail}
                      className="min-w-[300px] h-[220px] bg-cover rounded-lg"
                    />
                  </Link>
                ))}
              </Corousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
