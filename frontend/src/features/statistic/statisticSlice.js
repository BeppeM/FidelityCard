import { createSlice } from "@reduxjs/toolkit";
import { getAvgSubs } from "../../services/statisticService";
import {
  getAvgPoints,
  avgPointsByCatalog,
  topTenRewards,
  topCatalogs,
  performCharts,
  resetStatus,
  getAvgSubscriptions
} from "./statisticThunk";
const initialState = {
  value: {
    //Chart for the customer and manager
    firstChart: null,
    //Other charts used for the manager stats page
    secondChart: null,
    thirdChart: null,
    fourthChart: null,
  },
  status: null,
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    resetFourthChart: (state, action) =>{
      state.value.fourthChart = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //avg points of the card used from the customer
      .addCase(getAvgPoints.pending, (state, action) => {
        console.log("Status pending... richiesta");
        state.status = "pending";
        return state;
      })
      .addCase(getAvgPoints.fulfilled, (state, action) => {
        console.log("Fulfilled Customer chart data");
        console.log(action.payload);
        state.value.firstChart = action.payload;
        state.status = "fulfilled";
        return state;
      })
      //MANAGER
      //avg points of the catalogs used from the manager
      .addCase(avgPointsByCatalog.pending, (state, action) => {
        console.log("Status pending... richiesta");
        state.status = "pending 1st chart data";
        return state;
      })
      .addCase(avgPointsByCatalog.fulfilled, (state, action) => {
        console.log("Fulfilled 1st chart data");
        console.log(action.payload);
        state.value.firstChart = action.payload;
        state.status = "fulfilled 1st chart data";
        return state;
      })
      //Top 10 most redeemed rewards for the manager
      .addCase(topTenRewards.pending, (state, action) => {
        console.log("Status pending... richiesta");
        state.status = "pending 2nd chart data";
        return state;
      })
      .addCase(topTenRewards.fulfilled, (state, action) => {
        console.log("Fulfilled 2nd chart data");
        console.log(action.payload);
        state.value.secondChart = action.payload;
        state.status = "fulfilled 2nd chart data";
        return state;
      })
      //Top 10 most redeemed rewards for the manager
      .addCase(topCatalogs.pending, (state, action) => {
        console.log("Status pending... richiesta");
        state.status = "pending 3rd chart data";
        return state;
      })
      .addCase(topCatalogs.fulfilled, (state, action) => {
        console.log("Fulfilled 3rd chart data");
        console.log(action.payload);
        state.value.thirdChart = action.payload;
        state.status = "fulfilled 3rd chart data";
        return state;
      })
      //Performed when updating the fourth chart data
      .addCase(getAvgSubscriptions.pending, (state, action) =>{
        console.log("Status pending... richiesta");
        state.status = "pending";
        return state;
      })
      .addCase(getAvgSubscriptions.fulfilled, (state, action) =>{
        console.log("Fulfilled 4th chart data");
        console.log(action.payload);
        state.value.fourthChart = action.payload;
        state.status = "fulfilled";
        return state;
      })
      //Performs all the requests to retrieve the statistics
      .addCase(performCharts.pending, (state, action) => {
        console.log("Status pending... richiesta");
        state.status = "pending charts data";
        return state;
      })      
      .addCase(performCharts.fulfilled, (state, action) => {
        console.log("Fulfilled charts data");
        /* console.log("Com'è??");
        console.log(action.payload);  */       
        state.value.firstChart = action.payload[0];
        state.value.secondChart = action.payload[1];
        state.value.thirdChart = action.payload[2];
        state.value.fourthChart = action.payload[3];
        state.status = "fulfilled charts data";
        return state;
      })
      .addCase(resetStatus, (state, action) => {        
        state = initialState;        
        return state;
    })
  },
});

export default statisticSlice.reducer;
export const { resetFourthChart } = statisticSlice.actions
export { getAvgPoints };
