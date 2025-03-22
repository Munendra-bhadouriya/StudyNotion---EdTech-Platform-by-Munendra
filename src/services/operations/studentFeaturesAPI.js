import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from '../../assets/Logo/rzp_logo.png'
import { setPaymentLoading } from "../../slices/courseSlice";
import { removeFromCart, resetCart } from "../../slices/cartSlice";
import { useSelector } from "react-redux";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {

        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch, cart, fromCart) {
    const toastId = toast.loading("Loading...");

    try {
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Razorpay SDK failed to load.");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorisation: `Bearer ${token}`
        });


        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: 'LearED',
            description: 'Thank You for purchasing the course',
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                //send successful vala mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch, cart, fromCart)
            }
        }

        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    }
    catch (error) {
        console.log("PAYMENT API ERROR....", error);
        toast.error("Could not make payment")
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorisation: `Bearer ${token}`
        })
    }
    catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR...", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch, cart, fromCart) {
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));
    console.log("bodydata", bodyData);

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorisation: `Bearer ${token}`
        });

        console.log("PAYMENT VERIFY API RESPONSE...", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("payment successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");

        if (fromCart) {
            dispatch(resetCart());
        }
        else {
            if (cart.includes(bodyData.courses[0])) {
                dispatch(removeFromCart(bodyData.courses[0]));
            }
        }
        
    }
    catch (error) {
        console.log("PAYMENT VERIFY ERROR...", error);
        toast.error("Could not verify payment");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

