
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addPointsToCard } from '../../features/card/cardThunk';
import { formatDate } from '../../utils';


export const CardItem = ({card}) => {

    const [pts, setPts] = useState();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const setPointsInTextField = (e) => {
        if (e.target.value < 10000) {
            setPts(e.target.value);
        }
    } 

    const onSubmitAddPoints = (e) => {
        e.preventDefault();
        if (pts > 0) {
            dispatch(addPointsToCard({id:card.id, pts:pts, token: auth.access_token}));
        }
        setPts('');
    }

    return (
        <tr>
            <td>{card.customerUsername}</td>
            <td>{card.currentPoints}</td>
            <td>{formatDate(card.expirationDate)}</td>
            <td className="add-pts">
                <form onSubmit={onSubmitAddPoints}>
                    <input
                        placeholder='Punti'
                        type="number" 
                        value={pts}
                        onChange={e => setPointsInTextField(e)}>
                    </input>
                    <button type='submit'>
                        <i className='bi bi-plus-lg'></i>
                    </button>
                </form>
            </td>
        </tr>
    );
}