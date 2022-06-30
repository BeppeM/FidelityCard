import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getManagerCatalogs } from "../../features/catalog/catalogThunk";


export const CatalogSelector = ({setCatalog, resetCatalogSelector}) => {

    const auth = useSelector(state => state.auth);
    const catalogs = useSelector(state => state.catalogs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getManagerCatalogs({manager: auth.user.sub, token: auth.access_token}));
    }, []);

    if (catalogs.status !== "pending" && catalogs.status !== null) {
        return (
            <div>
                <select 
                    id="catalogs" 
                    className="catalog-select" 
                    onChange={(e) => setCatalog(e.target.value)}
                    required>
                    <option className="select-placeholder" disabled selected>Seleziona catalogo</option>
                    {catalogs.value.map(catalog => <option key={catalog.catalogTypeName} value={catalog.catalogTypeName}>{catalog.catalogTypeName}</option>)}
                </select>
                <button className="refresh-catalog" onClick={resetCatalogSelector}>
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </div>
        )
    }
    
}