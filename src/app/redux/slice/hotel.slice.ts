import { Hotel } from "../../utils/types/hotel";
import { createSlice } from "@reduxjs/toolkit";
import { getHotelListService } from "@/app/lib/service/hotel.service";
import { AppDispatch } from "../store";

interface HotelListState {
  // mapData: any;
  data: Hotel []| null;
  error: string | null;
  message: string | null;
  loading: boolean;
  loadingMore: boolean;
}

const initialState: HotelListState = {
 
  data: [],
  error: null,
  message: null,
  loading: true,
  loadingMore: false,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    create: (state) => {
      state.loading = true;
    },
    createSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.message = "Data saved successfully";
      state.loading = false;
    },
    createFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    update: (state, action) => {
      if (state.data) {
        state.data = [...state?.data, ...action?.payload];
        state.message = "Data updated successfully";
        state.error = null;
      } else {
        state.error = "No data available to update";
      }
      state.loading = false;
    },
    remove: (state) => {
      state.data = null;
      state.message = "Data deleted successfully";
      state.error = null;
      state.loading = false;
    },
    reset: (state) => {
      state.data = null;
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingMore: (state, action) => {
      state.loadingMore = action.payload;
    },
  },
});

export const {
  create,
  createSuccess,
  createFailure,
  update,
  remove,
  reset,
  setLoading,
  setLoadingMore,
  // setMapData,
} = hotelSlice.actions;

export default hotelSlice.reducer;
// check this
export const getHotelList = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(create());
  try {
    const response = await getHotelListService();

    dispatch(createSuccess(response?.data));
  } catch (error) {
    console.error("[getHotelList error:]", error);
    dispatch(createFailure("Failed to Hotel List data"));
  }
  dispatch(setLoading(false));
};
