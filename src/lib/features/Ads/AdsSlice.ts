import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdsState {
  ads: any;
}

const initialState: AdsState = {
  ads: null,
};

const editAdsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    editAds: (state, action: PayloadAction<any>) => {
      state.ads = action.payload;
    },
  },
});

export const { editAds } = editAdsSlice.actions;

export default editAdsSlice.reducer;
