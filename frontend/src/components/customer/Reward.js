import { LocalDate } from "@js-joda/core";
import { useDispatch, useSelector } from "react-redux";
import { redeemItem } from "../../features/redeem/redeemThunk";


export const Reward = ({reward, card}) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const onClickRedeemReward = () => {
        const redeemLog = {
            rewardID: reward.id,
            cardID: card,
            requestedPoints: reward.redeemPoints,
            redeemDate: LocalDate.now().toString()
        }
        dispatch(redeemItem({redeemLog: redeemLog, token: auth.access_token}));
    }

    return (
        <div className="reward">
            <h2>{reward.rewardName}</h2>
            {reward.description === null 
                ? <p>Nessuna descrizione disponibile</p> 
                : <p>{reward.description}</p>}
            <p>{reward.redeemPoints} punti</p>
            <button onClick={onClickRedeemReward}><i className="bi bi-gift"></i></button>
        </div>
    );
}