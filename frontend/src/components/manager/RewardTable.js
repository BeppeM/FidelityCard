import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogRewards, resetRewards } from '../../features/reward/rewardThunk';
import '../../style/RewardTable.css';
import { RewardItem } from './RewardItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RewardTable = ({catalog, showAddReward}) => {

    const dispatch = useDispatch();
    const [firstRun, setFirstRun] = useState(true);
    const auth = useSelector(state => state.auth);
    const rewards = useSelector(state => state.rewards);

    useEffect(() => {
        if (catalog !== '') {
            dispatch(getCatalogRewards({catalog:catalog, manager: auth.user.sub, token:auth.access_token}))
        }
    }, [catalog]);

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
        } else if (rewards.status === "ERR_ADD_REWARD" && !firstRun) {
            toast.error("Questo premio esiste già", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [rewards.status])
    

    if (rewards.status === "fulfilled" || rewards.status === "ERR_ADD_REWARD") {
        return (
            <>
                <div className="reward-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Punti</th>
                                <th>Qt. Attuale</th>
                                <th>Aggiungi stock</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rewards.value.map(reward => <RewardItem reward={reward} />)}
                            <tr className='add-reward' onClick={showAddReward}>
                                <td colSpan={5}><i className='bi bi-plus-lg'></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ToastContainer
                    position="top-right"
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
    } else {
        return <p>Nessun catalogo selezionato</p>
    }
    
}