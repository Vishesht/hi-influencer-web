import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const influencerSlice = createSlice({
  name: "influencer",
  initialState: {
    influencer: null,
  },
  reducers: {
    influencerData: (state, action: PayloadAction<any>) => {
      state.influencer = action.payload;
    },
  },
});

export const { influencerData } = influencerSlice.actions;

export default influencerSlice.reducer;
