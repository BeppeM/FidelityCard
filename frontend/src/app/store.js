import { configureStore } from '@reduxjs/toolkit';
import managerReducer from '../features/manager/managerSlice';
import customerReducer from '../features/customer/customerSlice';
import authReducer from '../features/auth/authSlice';
import catalogReducer from '../features/catalog/catalogSlice';
import cardReducer from '../features/card/cardSlice';
import rewardReducer from '../features/reward/rewardSlice';
import redeemReducer from '../features/redeem/redeemSlice';
import statisticReducer from '../features/statistic/statisticSlice';


export const store = configureStore({
  reducer: {
    managers: managerReducer,
    customers: customerReducer,
    auth: authReducer,
    catalogs: catalogReducer,
    cards: cardReducer,
    rewards: rewardReducer,
    redeem: redeemReducer,
    statistic: statisticReducer,
  },
});
