import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeItems } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }: any) => {
  // hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <button
      onClick={()=> navigate(`/course/details/${item._id}`)}
      className="flex cursor-pointer hover:bg-pure-greys-800 transition-all duration-200 rounded-lg flex-col mt-4 gap-2 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-b-[#2C333F] break-words text-wrap"
    >
      <div className="flex gap-4 sm:flex-row flex-col">
        <div>
          <img
            src={item?.thumbnail}
            className="w-[185px] h-[150px] min-w-[185px] min-h-[150px] rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2 items-start break-words text-left">
          <p className="text-[#F1F2FF] text-lg font-medium">
            {item?.courseName}
          </p>
          <p className="text-[#838894]">{item?.courseDesc}</p>
          {/* reviews */}
          <p className="font-medium text-sm text-pure-greys-500">
            Created by {item?.instructor?.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={(e: any) => {
            dispatch(removeItems(item?._id));
            e.stopPropagation();
          }}
          className="bg-[#161D29] hover:scale-95 transition-all duration-200 w-fit border border-[#2C333F] rounded-lg px-3 py-2 mt-2 text-[#EF476F] font-medium flex gap-1 items-center"
        >
          <MdDelete className="text-2xl" />
          Remove
        </button>
        <p className="text-[#FFD60A] font-semibold text-2xl">
          Rs. {item?.price}
        </p>
      </div>
    </button>
  );
};

export default CartItem;
