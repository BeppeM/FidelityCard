import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCatalog } from '../../features/catalog/catalogThunk';
import '../../style/CreateCatalog.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateCatalog = ({onSubmit}) => {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const catalogs = useSelector(state => state.catalogs)

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [firstRun, setFirstRun] = useState(true);

    const onClickCreateCatalog = (e) => {
        e.preventDefault();
        const catalog = {
            catalogTypeName: name,
            managerName: auth.user.sub,
            description: desc === '' ? null : desc
        }
        dispatch(createCatalog({catalog: catalog, token: auth.access_token}));
        setName('');
        setDesc('');
        if (onSubmit !== null) {
            onSubmit();
        }
    }

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
        } else {
            if (catalogs.status === "ERR_CREATE_CAT") {
                toast.error("Il catalogo esiste già", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (catalogs.status === "CREATE_CAT") {
                toast.success("Catalogo creato", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }, [catalogs.status]);

    return(
        <>
            <div className="create-catalog">
                <form onSubmit={onClickCreateCatalog}>
                    <input 
                        type="text" 
                        placeholder="Nome catalogo" 
                        className="catalog-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required></input><br/>
                    <textarea 
                        placeholder="Descrizione" 
                        className="catalog-desc"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}></textarea><br/>
                    <input className="form-submit" type="submit" value="Conferma"
                        disabled={name === '' ? true : false}></input><br/>
                </form>
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
    );
}