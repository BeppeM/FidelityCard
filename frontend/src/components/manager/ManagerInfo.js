import { IdCard } from "../IdCard"
import { useEffect, useState } from "react";
import { PasswordForm } from '../PasswordForm';
import { MailForm } from '../MailForm';
import { CreateCatalog } from "./CreateCatalog";
import '../../style/ManagerInfo.css';
import { CardTable } from "./CardTable";
import { RewardTable } from "./RewardTable";
import { useDispatch, useSelector } from "react-redux";
import { getManagerInfo } from "../../features/manager/managerThunk";
import { getCatalogCards, resetStatus as resetCards } from "../../features/card/cardThunk";
import { resetStatus as resetRewards } from "../../features/reward/rewardThunk";
import { CatalogSelector } from "./CatalogSelector";
import { AddReward } from "./AddReward";


export const ManagerInfo = () => {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showMail, setShowMail] = useState(false);
    const [showAddReward, setShowAddReward] = useState(false);

    const [catalog, setCatalog] = useState("");

    const manager = useSelector(state => state.managers);


    useEffect(() => {
        if (auth.user.AUTHORITIES_KEY === "MANAGER" &&
            (auth.user === null || auth.user?.sub !== manager.value?.username)){
                dispatch(getManagerInfo({manager: auth.user.sub, token: auth.access_token}));
            }   
    }, []); 

    useEffect(() => {
        if (catalog !== "") {
            dispatch(getCatalogCards({manager: auth.user.sub, catalog: catalog, token: auth.access_token}))
        }
    }, [catalog]);

    const resetCatalogSelect = () => {
        document.getElementById("catalogs").selectedIndex = 0;
        dispatch(resetRewards());
        dispatch(resetCards());
    }

    if (manager.status === "fulfilled") {
        return (
            <div className="account-content">
                <div className="manager-data">
                    <div>
                        <h2>Dati aziendali</h2>
                        <IdCard 
                            user={manager.value} 
                            role={auth.user.AUTHORITIES_KEY}
                            mailUpdate={() => setShowMail(true)}
                            passwordUpdate={() => setShowPassword(true)} />
                        <PasswordForm show={showPassword} onHide={() => setShowPassword(false)}/>
                        <MailForm show={showMail} onHide={() => setShowMail(false)} />
                    </div>
                </div>
                <div className="new-catalog">
                    <div>
                        <h2>Creazione catalogo</h2>
                        <CreateCatalog onSubmit={null}/>
                    </div>
                </div>
                <div className="catalog-management">
                    <h2>Gestione cataloghi</h2>
                    <CatalogSelector 
                        resetCatalogSelector={resetCatalogSelect} 
                        setCatalog={setCatalog}/>
                    <div className="management">
                        <div className="card-management">
                            <h3>Clienti</h3>
                            <CardTable catalog={catalog}/>
                        </div>
                        <div className="reward-management">
                            <h3>Premi</h3>
                            <RewardTable  catalog={catalog} showAddReward={() => setShowAddReward(true)}/>
                            <AddReward catalog={catalog} show={showAddReward} onHide={() => setShowAddReward(false)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div className="spinner-border" role="status"></div>;
    }
}