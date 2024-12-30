import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { coursePageDetailsApi } from "../services/apiCall/course";
import CourseContent from "../components/CoursePageDetails/CourseContent";
import InstructorDetails from "../components/CoursePageDetails/InstructorDetails";
import { useDispatch, useSelector } from "react-redux";
import { removeItems, setItems } from "../slices/cartSlice";
import FullPage from "../spinner/FullPage";
import { buyCourse } from "../services/apiCall/payment";
import RatingAndReviews from "../components/CoursePageDetails/RatingAndReviews";


const CoursePageDetails = () => {
  // hook
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store
  const { items } = useSelector((state:any)=>state.cart);
  const { token } = useSelector((state:any)=>state.auth);
  const { user } = useSelector((state:any)=>state.profile);

  // state
  const [courseDetails, setCourseDetails] = useState<any | null>(null);
  const [inCart,setInCart] = useState<any>(false);
  const [loading,setLoading] = useState<boolean>(false);
  const [ratings,setRatings] = useState<number>(4.5);
  
  // handleBuyCourse
  async function handleBuyCourse(){
    try {
      await buyCourse(courseId,token,user,navigate);
    } catch (error) {
      console.log(error);
    }
  }

  // sideEffects -> pageDetails apiCall
  useEffect(() => {
    async function pageDetails() {
      setLoading(true);
      try {
        const result: any = await coursePageDetailsApi(courseId);
        setCourseDetails(result);
        setRatings(3.5);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    pageDetails();
  }, [courseId]);

  // sideEffect to check is course available in cart
  useEffect(()=>{
    const isItemAvailable = items?.some((item:any)=> item?._id === courseDetails?._id);
    console.log(isItemAvailable)
    if(isItemAvailable){
      setInCart(true);
    } else {
      setInCart(false);
    }
  },[items,courseDetails]);

  // spinner
  if(loading) return <FullPage />

  return (
    <div className="w-full break-words text-wrap text-left">
      {/* section 1 */}
      <div className="bg-pure-greys-800 py-8">
        <div className="lg:w-[80%] w-11/12 mx-auto relative flex flex-col gap-4">
          {/* header section info */}
          <div className="flex flex-col gap-3 lg:w-[70%]">
            {/* header */}
            <div className="flex items-center gap-1">
              <Link className="text-[#838894] text-sm" to={"/"}>
                Home /{" "}
              </Link>
              <Link
                className="text-[#838894] text-sm"
                to={`/catalog/${courseDetails?.category?.categoryName?.split(" ").join("-").toLowerCase()}`}
              >
                {" "}
                Learning /{" "}
              </Link>
              <span className="text-[#FFD60A] font-medium text-sm">
                {courseDetails?.category?.categoryName}
              </span>
            </div>
            {/* courseName */}
            <div className="text-[#F1F2FF] font-medium text-3xl">
              {courseDetails?.courseName}
            </div>
            {/* courseDesc */}
            <div className="text-[#999DAA] text-sm">
              {courseDetails?.courseDesc}
            </div>
            {/* ratingAndReviews */}
            <RatingAndReviews ratings={ratings} />
            {/* instructor name */}
            <div className="text-base text-[#DBDDEA]">
              Created by {courseDetails?.instructor?.name}
            </div>
            {/* timestaps */}
          </div>

          {/* cart,buy -> upto tab */}
          <div className="flex lg:hidden sm:w-[80%] md:w-[60%] flex-col shadow-inner hover:shadow-lg">
            {/* image */}
            <div>
              <img src={courseDetails?.thumbnail} className="w-full h-[200px] rounded-t-lg" />
            </div>
            {/* details */}
            <div className="flex flex-col gap-4 py-6 bg-pure-greys-700 rounded-b-lg px-4 xl:px-6">
              {/* price */}
              <p className="text-[#F1F2FF] text-3xl font-bold">Rs. {courseDetails?.price}</p>
              {
                inCart ? 
                (<button onClick={()=>dispatch(removeItems(courseDetails?._id))} className="bg-[#FFD60A] py-3 px-6 rounded-lg text-[#000814] font-medium text-lg">Remove from Cart</button>) : 
                (<button onClick={()=>dispatch(setItems(courseDetails))} className="bg-[#FFD60A] py-3 px-6 rounded-lg text-[#000814] font-medium text-lg">Add to Cart</button>)
              }
              <button onClick={handleBuyCourse} className="bg-richblack-900 py-4 px-6 rounded-lg">Buy now</button>
            </div>
          </div>
          {/* cart,buy -> from laptop */}
          <div className="hidden absolute top-1 right-0 left-[75%] lg:flex flex-col shadow-inner hover:shadow-lg">
            {/* image */}
            <div>
              <img src={courseDetails?.thumbnail} className="w-full h-[200px] rounded-t-lg" />
            </div>
            {/* details */}
            <div className="flex flex-col gap-4 py-6 bg-pure-greys-700 rounded-b-lg px-4 xl:px-6">
              {/* price */}
              <p className="text-[#F1F2FF] text-3xl font-bold">Rs. {courseDetails?.price}</p>
              {
                inCart ? 
                (<button onClick={()=>dispatch(removeItems(courseDetails?._id))} className="bg-[#FFD60A] py-3 px-6 rounded-lg text-[#000814] font-medium text-lg">Remove from Cart</button>) : 
                (<button onClick={()=>dispatch(setItems(courseDetails))} className="bg-[#FFD60A] py-3 px-6 rounded-lg text-[#000814] font-medium text-lg">Add to Cart</button>)
              }
              <button onClick={handleBuyCourse} className="bg-richblack-900 py-4 px-6 rounded-lg">Buy now</button>
            </div>
          </div>
        </div>
      </div>
      {/* box */}
      <div className="w-11/12 lg:w-[80%] mx-auto">
        {/* content */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          {/* section 2 -> what you will learn */}
          <div className="border border-[#2C333F] p-8 mt-8">
            {/* whatWillYouLearn */}
            <div className="text-[#F1F2FF] font-medium text-3xl">
              What you'll learn
            </div>
            <div className="mt-3 gap-2 break-words text-wrap text-left">
              {courseDetails?.sections?.length === 0 ? (
                <p className="text-richblack-5">No content available</p>
              ) : (
                <>
                  {courseDetails?.sections?.map((sectionData: any) => (
                    <p className="text-[#C5C7D4] text-sm font-medium" key={sectionData?._id}>
                      &rarr; {sectionData?.sectionName}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* section 3 -> courseContent */}
          <CourseContent courseDetails={courseDetails} />

          {/* section 4 -> Instructor Details */}
          <InstructorDetails courseDetails={courseDetails} />
        </div>
      </div>
    </div>
  );
};

export default CoursePageDetails;
