import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthorized: false,
  loading: true,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setIsAuthorized, setLoading } = userSlice.actions;
