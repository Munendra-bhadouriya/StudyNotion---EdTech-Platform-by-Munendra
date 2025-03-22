import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice"
import {resetCart} from '../../slices/cartSlice'
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST", endpoints.SENDOTP_API, { email });
            console.log("SEND OTP RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
        }
        catch (error) {
            console.log(error);
            if (error.status === 401)
                toast.error("User already registered");
            else
                toast.error("Failed to send otp");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const signup = (firstName, lastName, email, password, confirmPassword, accountType, otp, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST", endpoints.SIGNUP_API, { firstName, lastName, email, password, confirmPassword, accountType, otp });

            console.log("SIGNUP RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signed up Successfully");
            navigate("/login");
        }
        catch (error) {
            console.log("SIGN UP Error");
            toast.error("Failed to SIGN UP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export const login = (email, password, accountType, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", endpoints.LOGIN_API, { email, password, accountType });
            console.log("LOGIN RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Logged in Successfully");
            dispatch(setToken(response.data.token));

            dispatch(setUser({ ...response.data.user }));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");
        }
        catch (error) {
            console.log("Login Error");
            toast.error("Failed to Login");
        }
        dispatch(setLoading(false));
    }
}

export const logout = (navigate) =>{
    return async (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        //update loacl storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        toast.success("Logged out");
        navigate("/");
    }
}

export const resetPassword = (password, confirmPassword, token) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, { password, confirmPassword, token });

            console.log("RESET PASSWORD RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password Reset Successfully");
        }
        catch (error) {
            console.log("RESET PASSWORD Error");
            toast.error("Failed to reset password");
        }
        dispatch(setLoading(false));
    }
}

export const getPasswordResetToken = (email, setEmailSent) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, { email });

            console.log("RESET PASSWORD TOKEN RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch (error) {
            console.log("RESET PASSWORD TOKEN Error");
            toast.error("Failed to send mail");
        }
        dispatch(setLoading(false));
    }
};