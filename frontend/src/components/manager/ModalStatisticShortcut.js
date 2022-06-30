import Modal from "react-modal";
import "../../style/Modal.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ManagerChart from "./ManagerChart";
import {getAvgSubscriptions} from "../../features/statistic/statisticThunk";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Barlow",
  },
};

export default function ModalStatisticShortcut({show, onHide}) {
  //Need this for fetching catalogs
  const token = useSelector((state) => state.auth.access_token);
  const manager = useSelector((state) => state.auth.user.sub);
  const avgSubscriptions = useSelector((state) => state.statistic.value.fourthChart);
  const [avgSubs, setAvgSubscriptions] = useState({
    data: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let info = {
      token: token,
      manager: manager,
      period: 1,
    };
    dispatch(getAvgSubscriptions(info));
  }, []);

  useEffect(() => {
      prepareAvgSubs();        
  }, [avgSubscriptions]);


  console.log("Ballaaaa");
  console.log(avgSubscriptions);

  //Preparing fourth chart
  const prepareAvgSubs = () => {
    if ((avgSubscriptions !== null) && (avgSubscriptions !== {})) {        
      let currentData = [];
      //Ascisse che è sempre la stessa
      let x = [];
      //Flag per stoppare l'inserimento nell'ascisse
      let flag = false;
      //Get all the objects key
      let keys = Object.keys(avgSubscriptions);
      console.log("Cataloghi: ");
      console.log(keys);
      //Filling the axes
      keys.map((key) => {
        let catalogName = "";
        let y = [];
        catalogName = key;
        console.log("Catalogo in corso..");
        console.log(catalogName);
        //Iterate on the period of the catalog
        avgSubscriptions[key].map((averageSub) => {
          console.log("Avg del catalogo...");
          console.log(avgSubscriptions[key]);
          console.log("Meseee");
          console.log(averageSub.Date);
          //Splitting year from month
          let s = averageSub.Date.split(" ");
          if (!flag) {
            //Pushing the month
            x.push(s[1]);
          }
          //Put the average subs
          y.push(averageSub.numOfSubs);
        });
        console.log("Fine catalogo...");
        console.log(x);
        console.log(y);
        //Basta inserire coordinate nell'ascisse
        flag = true;
        currentData.push({
          //Coordinate x
          x: x,
          //Coordinate y
          y: y,
          //Leggenda
          name: catalogName,
          //Modalità del grafico
          mode: "lines",
        });
      });
      console.log("Dati del fourth chart: ");
      console.log(currentData);
      setAvgSubscriptions({
        data: currentData,
        visible: true,
      });
    }
  };    

  if(avgSubscriptions === null || Object.keys(avgSubscriptions).length === 0) {
    console.log("Caoaoaoai");
      console.log(avgSubscriptions);
    return (
      <Modal isOpen={show} style={customStyles}>
        <span onClick={onHide} className="close-shortcut-btn">
          <i className="bi bi-x-lg"></i>
        </span>
        <h2>Riepilogo non disponibile</h2>
      </Modal>
    );
  } else {
    console.log("KAKAKAKA");
    console.log(avgSubscriptions);
    return (
      <Modal isOpen={show} style={customStyles}>
        <span onClick={onHide} className="close-shortcut-btn">
          <i className="bi bi-x-lg"></i>
        </span>
        <h2>Media iscrizioni nell'ultimo mese</h2>
        <ManagerChart data={avgSubs.data} type={4} />
      </Modal>
    );
  }
}
