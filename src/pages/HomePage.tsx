import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from "../components/HomePage/HighlightText";
import HighlightButton from "../components/HomePage/HighlightButton";
import HomeBanner from "../assets/Images/boxoffice.png";
import CodeBlocks from "../components/HomePage/CodeBlocks";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import LearningSection from "../components/HomePage/LearningSection";

const HomePage = () => {
  return (
    <div className="w-full mb-[700px]">
      {/* section1 -> instructor button,heading,para,authBtn */}
      <div className="lg:w-[80%] w-11/12 mx-auto mt-4">
        <BackgroundBeamsWithCollision>
          <div className="lg:w-11/12 w-[98%] mx-auto flex flex-col items-start lg:items-center lg:my-20 my-4">
            {/* instructorBtn */}
            <div className="w-full flex justify-start md:justify-center">
              <button className="flex gap-2 items-center px-6 py-3 bg-richblack-800 rounded-full text-[16px] leading-5 font-medium text-richblack-50 hover:scale-95 transition-all duration-200 shadow-sm shadow-richblack-400">
                <p>Become an Instructor</p>
                <FaArrowRightLong />
              </button>
            </div>
            {/* heading */}
            <div className="text-[#F1F2FF] font-semibold text-4xl leading-[44px] tracking-[-2%] mt-9">
              Empower Your Future with
              <span>
                <HighlightText text={"Coding Skills"} />
              </span>
            </div>
            {/* para */}
            <p className="text-black text-[16px] leading-6 font-medium max-w-4xl mt-4 break-words text-wrap text-left">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.{" "}
            </p>
            {/* authBtn */}
            <div className="">
              <div className="flex gap-4 mt-6 lg:mt-9">
                <HighlightButton isActive={true} linkto="/login">
                  Learn More
                </HighlightButton>
                <HighlightButton isActive={false} linkto="/signup">
                  Book a Demo
                </HighlightButton>
              </div>
               
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </div>
      {/* section 2 -> Video */}
      <div className="lg:w-[80%] w-11/12 mt-16 mx-auto flex justify-center">
        <img src={HomeBanner} alt="banner" width={800} height={400} />
      </div>
      {/* section 3 -> codeBlocks */}
      <div className="lg:w-[80%] w-11/12 mx-auto mt-16 lg:mt-[120px] flex flex-col gap-20 lg:gap-[150px]">
        <CodeBlocks
          heading={
            <>
              Unlock your <HighlightText text={"coding potential"} /> with our
              online courses.
            </>
          }
          para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          btnText1="Try it Yourself"
          btnText2="Learn More"
          isReverse={false}
        />
        <CodeBlocks
          heading={
            <>
              Start <HighlightText text={"coding in seconds"} />.
            </>
          }
          para="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          btnText1="Continue Lesson"
          btnText2="Learn More"
          isReverse={true}
        />
      </div>
      {/* section 4 -> courses available */}
      <LearningSection />
      {/* section 5 -> features/skills you will get,images template */}
      <div></div>
      {/* section 6 -> become an intructor */}
      <div></div>
      {/* section 7 -> ratingAndReviews */}
      <div></div>
      {/* section 8 -> footer */}
      <div></div>
    </div>
  );
};

export default HomePage;
