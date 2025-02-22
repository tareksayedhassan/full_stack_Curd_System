import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: { id: 1, isLoggedIn: true },
  reducers: {},
});

export default AuthSlice.reducer;
