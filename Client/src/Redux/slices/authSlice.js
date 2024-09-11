import { createSlice } from "@reduxjs/toolkit";
import { user as defaultUser } from "../../assets/data";

// Get the initial user from localStorage or fall back to defaultUser
const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : defaultUser,
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Store the user credentials and roles properly
      const { role, ...rest } = action.payload;

      state.user = {
        ...rest, // Add any additional data like username, email, etc.
        role: role || "user", // Ensure role exists, default to "user" if not
      };

      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
