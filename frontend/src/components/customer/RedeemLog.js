import { useSelector } from "react-redux"
import { formatDate } from "../../utils"


export const RedeemLog = ({redeemLog}) => {

    const managers = useSelector(state => state.managers);
    
    const findManagerBusinessName = (username) => {
        return managers?.value?.find(manager => manager.username === username).businessName;
    }

    return (
        <tr>
            <td>{redeemLog.Name}</td>
            <td>{redeemLog.Points_Spent}</td>
            <td>{redeemLog.Catalog}</td>
            <td>{findManagerBusinessName(redeemLog.Manager)}</td>
            <td>{formatDate(redeemLog.Redeem_Date)}</td>
        </tr>
    )
}