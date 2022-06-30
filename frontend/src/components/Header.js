import { Menu } from "./Menu";
import '../style/Header.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { Wallet } from "./customer/Wallet";
import { RequireAuth } from "./RequireAuth";
import { Fallback } from "./Fallback";
import { ManagerInfo } from "./manager/ManagerInfo";
import { Unauthorized } from "./Unauthorized";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Catalog } from "./customer/Catalog";
import { resetStatus as resetCard } from "../features/card/cardThunk";
import { resetStatus as resetCatalog } from "../features/catalog/catalogThunk";
import { resetStatus as resetManager } from "../features/manager/managerThunk";
import { resetStatus as resetCustomer } from "../features/customer/customerThunk";
import { resetStatus as resetReward  } from "../features/reward/rewardThunk";
import { RedeemHistory } from "./customer/RedeemHistory";

import Statistic from "./manager/Statistic";
import { resetStatus as resetStatistic  } from "../features/statistic/statisticThunk";
export const Header = () => {


    const auth = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        //console.log("In logout handler")
        // reset app state, should find a better solution
        dispatch(logout());
        dispatch(resetCard());
        dispatch(resetCatalog());
        dispatch(resetManager());
        dispatch(resetCustomer());
        dispatch(resetReward());
        dispatch(resetStatistic());
        return navigate("/");
    }

    return (
        <>
            <div className="navbar">
                <Link className="router-link" to="/">
                    <h1>Fidelity Card</h1>
                </Link>
                <Menu logged={auth.user} logout={handleLogout}/>
            </div>
            <Routes>
                <Route path="*" element={<Fallback />} />
                <Route path="/unauthorized" element={<Unauthorized />}/>
                <Route path="/" element={<Home logged={auth.user} />}/>
                <Route element={<RequireAuth allowedRoles={["CUSTOMER"]}/>} >
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/:manager/:catalog/:card" element={<Catalog />} />
                    <Route path="/redeem/history" element={<RedeemHistory />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["MANAGER"]}/>} >
                    <Route path="/management" element={<ManagerInfo />} />
                    <Route path="/statistic" element={<Statistic/>} />
                </Route>
            </Routes>
        </>

    )
}