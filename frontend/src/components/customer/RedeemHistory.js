import { RedeemLog } from "./RedeemLog"
import '../../style/RedeemHistory.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getRedeemHistory } from "../../features/redeem/redeemThunk";
import { getManagers } from "../../features/manager/managerThunk";


const data = [
    {
        "Name":"Orologio",
        "RedeemDate": "17/04/2022",
        "PointsSpent":100, 
        "Catalog":"Prime",
        "Manager":"Esselunga"      
    },
    {
        "Name":"Valigia",
        "RedeemDate": "15/04/2022",
        "PointsSpent":100, 
        "Catalog":"Prime",
        "Manager":"Esselunga"      
    },
    {
        "Name":"Sgabello",
        "RedeemDate": "05/04/2022",
        "PointsSpent":100, 
        "Catalog":"Prime",
        "Manager":"Esselunga"      
    },
    {
        "Name":"Bicicletta Bimbo",
        "RedeemDate": "20/03/2022",
        "PointsSpent":100, 
        "Catalog":"Prime",
        "Manager":"Esselunga"      
    }
]

export const RedeemHistory = () => {

    const auth = useSelector(state => state.auth);
    const redeem = useSelector(state => state.redeem);
    const managers = useSelector(state => state.managers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRedeemHistory({user: auth.user.sub, token:auth.access_token}));
        if (managers.value === null) {
            dispatch(getManagers(auth.access_token));
        } 
    }, []);

    console.log(redeem.status);
    
    if (redeem.status !== "fulfilled") {
        return <div className="spinner-border" role="status"></div>
    } else {
        if (redeem.value?.length === 0) {
            return <h2 className="no-redeem-log">Non hai effettuato alcun riscatto!</h2>
        }
        return(
            <div className='redeem-history'>
                <table>
                    <thead>
                        <tr>
                            <th>Premio</th>
                            <th>Punti</th>
                            <th>Catalogo</th>
                            <th>Negozio</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {redeem.value.map(log => <RedeemLog redeemLog={log} />)}
                    </tbody>
                </table>
            </div>
        )
    
    }
}