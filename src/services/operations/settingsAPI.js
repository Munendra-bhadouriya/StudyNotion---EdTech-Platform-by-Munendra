import toast from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints;


export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
        try {
          console.log(UPDATE_DISPLAY_PICTURE_API)
        const response = await apiConnector(
          "PUT",
          UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.data))
        localStorage.setItem("user", JSON.stringify(response.data.data));
        
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
}
  
export function updateProfile(data, token){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
        Authorisation: `Bearer ${token}`
      });

      console.log("UPDATE_PROFILE_API... response", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile updated successfully.")
      dispatch(setUser(response.data.updatedUserDetails));
      localStorage.setItem("user", JSON.stringify(response.data.data));

    }
    catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId);
  }
}

export const changePassword = async (data, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
      Authorisation: `Bearer ${token}`
    });

    console.log("CHANGE_PASSWORD_API... response", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password changed successfully.")
  }
  catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error("Could Not Update Password")
  }
  toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}