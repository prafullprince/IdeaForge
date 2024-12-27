import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const CartPage = () => {
  // store
  const { totalItems, items } = useSelector((state: any) => state.cart);

  return (
    <div className="flex flex-col w-11/12 lg:w-[80%] mx-auto mt-6 min-h-screen">
      {/* header */}
      <div className="flex items-center gap-1">
        <Link className="text-[#838894] text-sm" to={"/"}>
          Home /{" "}
        </Link>
        <Link className="text-[#838894] text-sm" to={`/dashboard/profile`}>
          {" "}
          Dashboard /{" "}
        </Link>
        <span className="text-[#FFD60A] font-medium text-sm">Cart</span>
      </div>
      {/* total */}
      <div className="text-[#64efa9] text-xl font-edu-sa font-semibold mt-4">
        <span className="text-3xl">{totalItems}</span> Courses in cart
      </div>
      {/* content box */}
      <div className="border-richblack-600 flex flex-col gap-4">
        {items?.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {items?.map((item: any) => (
              <CartItem key={item._id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
