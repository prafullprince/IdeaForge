import toast from "react-hot-toast";
import rzpLogo from "../../assets/Logo/Logo-Full-Light.png";
import { apiConnector } from "../apiConnector";
import { courseEndPoints } from "../api";

// load razorpay script
function loadScript(src: any) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

// buy course
export async function buyCourse(
  courseId: any,
  token: any,
  userDetails: any,
  navigate: any,
) {
  const tid = toast.loading("Loading...");
  try {
    // load scripts
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("error on loading");
    }

    // creating razorpay order
    const orderResponse = await apiConnector(
      "POST",
      courseEndPoints.CATURE_PAYMENT,
      { courseId },
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    if (!orderResponse.data.success) {
      throw new Error("error order");
    }

    // opening the razorpay SDK/creating dialogue box
    const options = {
      key: "rzp_test_sK1gtaCq17ERAl",
      currency: orderResponse.data.paymentResponse.currency,
      amount: orderResponse.data.paymentResponse.amount,
      order_id: orderResponse.data.paymentResponse.id,
      name: "StudyNotion",
      description: "Thank you for purchasing",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.name}`,
        email: `${userDetails.email}`,
      },
      handler: function (response: any) {
        // send successfullyMail
        // sendPaymentSuccessEmail(response, orderResponse.data.amount, token);
        // verifyPayment
        verifyPayment(
          courseId,
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature,
          token,
          navigate,
        );
      },
    };

    // open dialog box of razorpay SDK
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response: any) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });
  } catch (error: any) {
    console.log(error);
    console.log(error.message);
    toast.error(error.response.data.message);
  }
  toast.dismiss(tid);
}

// verify payment function
async function verifyPayment(
  courseId: any,
  razorpay_payment_id: any,
  razorpay_order_id: any,
  razorpay_signature: any,
  token: any,
  navigate: any
) {
  const toastId = toast.loading("Verifying Payment...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndPoints.VERIFY_PAYMENT,
      { courseId, razorpay_payment_id, razorpay_order_id, razorpay_signature },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful. You are Added to the course ");
    navigate("/dashboard/enrolled-courses");
    //   dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error);
    toast.error("Could Not Verify Payment.");
  }
  toast.dismiss(toastId);
}
