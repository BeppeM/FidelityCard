import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  getAvgPointsByUser,
  getTopCatalogs,
  getAvgPointsByCatalog,
  getTopRewards,
  getAvgSubs,
} from "../../services/statisticService";

//Avarage points of user cards
export const getAvgPoints = createAsyncThunk(
  "statistic/getAvgPointsByUser",
  async (data, { dispatch }) => {
    return getAvgPointsByUser(data.username, data.token);
  }
);

//Avarage points of the manager's catalogs
export const avgPointsByCatalog = createAsyncThunk(
  "statistic/getAvgPointsByCatalog",
  async (data, { dispatch }) => {
    console.log("Retrieving avg points of catalogs: ");
    console.log(data);
    return getAvgPointsByCatalog(data.manager, data.token);
  }
);

//Top 10 most redeemed rewards
export const topTenRewards = createAsyncThunk(
  "statistic/topTenRewards",
  async (data, { dispatch }) => {
    console.log("Retrieving avg points of catalogs: ");
    console.log(data);
    return getTopRewards(data.manager, data.token);
  }
);

//Get the top catalogs by subscriptions
export const topCatalogs = createAsyncThunk(
  "statistic/topCatalogs",
  async (data, { dispatch }) => {
    console.log("Retrieving avg points of catalogs: ");
    console.log(data);
    return getTopCatalogs(data.manager, data.token);
  }
);

//Get the top catalogs by subscriptions
export const getAvgSubscriptions = createAsyncThunk(
  "statistic/getAvgSubscriptions",
  async (data, { dispatch }) => {
    console.log("Retrieving avg points of catalogs: ");
    console.log(data);
    return getAvgSubs(data.manager, data.period, data.token).then((data) =>{      
      return data;
    });
  }
);

//Get the top catalogs by subscriptions
export const performCharts = createAsyncThunk(
  "statistic/performCharts",
  async (data, { dispatch }) => {
    let array = [];
    /* console.log("Retrieving avg points of catalogs: ");
    console.log(data); */
    return getAvgPointsByCatalog(data.manager, data.token).then(
      async (avgPoints) => {
        /* console.log("Plutoooo");
        console.log(avgPoints); */
        await getTopRewards(data.manager, data.token).then(
          async (topRewards) => {
            /* console.log("Paperinoooo");
            console.log(topRewards); */
            await getTopCatalogs(data.manager, data.token).then(
              async (topCatalogs) => {
                /* console.log("Minnieee");
                console.log(topCatalogs); */
                await getAvgSubs(data.manager, data.period, data.token).then(
                  (avgSubs) => {
                    /* console.log("Avg subscriptions: ");
                    console.log(avgSubs); */
                    //Costruisco l'oggetto dei dati
                    array.push(avgPoints, topRewards, topCatalogs, avgSubs);
                    /* console.log("Ciaooo");
                    console.log(array); */
                  }
                );
              }
            );
          }
        );
        return array;
      }
    );
  }
);

export const resetStatus = createAction("statistic/reset");
