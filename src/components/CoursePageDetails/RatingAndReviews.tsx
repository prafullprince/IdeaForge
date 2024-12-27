import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const RatingAndReviews = ({ ratings }: any) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-xl font-semibold text-yellow-50 mt-1">{ratings}</p>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index: any) => {
          if (Math.floor(ratings) > index) {
            return <FaStar className=" text-[#E7C009] text-xl" key={index} />;
          } else if (ratings > index) {
            return (
              <FaStarHalfAlt key={index} className=" text-[#E7C009] text-xl" />
            );
          } else {
            return <FaRegStar key={index} className="text-yellow-50 text-xl" />;
          }
        })}
      </div>
    </div>
  );
};

export default RatingAndReviews;
