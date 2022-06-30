import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { updateStock } from "../../features/reward/rewardThunk";
import { ConfirmDelete } from './ConfirmDelete';



export const RewardItem = ({reward}) => {
    
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch(); 

    const [stock, setStock] = useState();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const checkAndSetStock = (e) => {
        if (e.target.value < 10000) {
            setStock(e.target.value);
        }
    }

    const onSubmitAddToStock = (e) => {
        e.preventDefault();
        if (stock > 0) {
            dispatch(updateStock({stock: stock, reward: reward.id, token: auth.access_token}));
        }
        setStock('');
    }

    return (
        <>
            <tr>
                <td>{reward.rewardName}</td>
                <td>{reward.redeemPoints}</td>
                <td>{reward.currentQuantity}</td>
                <td className="add-stock">
                    <form onSubmit={onSubmitAddToStock}>
                        <input
                            placeholder='Qt. pezzi'
                            type="number" 
                            value={stock}
                            onChange={e => checkAndSetStock(e)}>
                        </input>
                        <button type='submit'>
                            <i className='bi bi-plus-lg'></i>
                        </button>
                    </form>
                </td>
                <td className="delete"><i className="bi bi-trash" onClick={() => setShowConfirmDelete(true)}></i></td>
            </tr>
            <ConfirmDelete 
                show={showConfirmDelete}
                onHide={() => setShowConfirmDelete(false)}
                reward={reward}
            /> 
        </>
    )
}