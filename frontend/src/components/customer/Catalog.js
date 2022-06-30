import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getCatalogRewards } from "../../features/reward/rewardThunk";
import { Reward } from "./Reward";
import '../../style/Catalog.css'
import { toast, ToastContainer } from "react-toastify";

export const Catalog = () => {

    const dispatch = useDispatch();
    
    const { manager, catalog, card } = useParams();
    const auth = useSelector(state => state.auth);
    const rewards = useSelector(state => state.rewards);
    const redeem = useSelector(state => state.redeem);
    const [firstRun, setFirstRun] = useState(true);

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
        } else {
            if (redeem.status === "REDEEM") {
                toast.success("Riscatto effettuato!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else if (redeem.status === "ERR_REDEEM") {
                toast.error("Impossibile riscattare questo premio...", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }, [redeem.status])

    useEffect(() => {
        dispatch(getCatalogRewards({catalog:catalog, manager:manager, token: auth.access_token}));
    }, []);

    if (rewards.status === "pending") {
        return <div className="spinner-border" role="status"></div> 
    }
    if (rewards.status === "fulfilled" && rewards.value.length > 0) {
        return (
            <>
                <div className='catalog'>
                    {rewards.value.map(reward => <Reward reward={reward} card={card} />)}
                    
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
            
        )
    } 
    if (rewards.status === "fulfilled" && rewards.value.length === 0) {
        return <div className="catalog">
                    <h3>Nessun premio disponibile per il catalogo selezionato</h3>
                </div>
    }
}