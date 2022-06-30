import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  performCharts,
  getAvgSubscriptions,
} from "../../features/statistic/statisticThunk";
import ManagerChart from "./ManagerChart";
import "../../style/Statistic.css";

export default function Statistic() {
  const catalogs = useSelector((state) => state.catalogs.value);
  const dispatch = useDispatch();
  //Need this for fetching catalogs
  const token = useSelector((state) => state.auth.access_token);
  const manager = useSelector((state) => state.auth.user.sub);
  //Retrieving data from the state to create the statistic charts
  const chartsData = useSelector((state) => state.statistic.value);
  const avgCatalogs = useSelector((state) => state.statistic.value.firstChart);
  const topTen = useSelector((state) => state.statistic.value.secondChart);
  const topTenCatalogs = useSelector(
    (state) => state.statistic.value.thirdChart
  );
  const avgSubscriptions = useSelector(
    (state) => state.statistic.value.fourthChart
  );

  const [avgCatalogsData, setAvgCatalogsData] = useState({
    x: [],
    y: [],
  });
  const [topTenData, setTopTenData] = useState({
    x: [],
    y: [],
  });

  const [topTenCatalogData, setTopTenCatalogData] = useState({
    x: [],
    y: [],
  });

  const [avgSubs, setAvgSubscriptions] = useState({
    data: [],
    visible: false,
  });

  const [period, setPeriod] = useState(2);

  useEffect(() => {
    //Il manager schiaccia prima su Statistiche quindi non ho ancora i cataloghi
    let info = {
      token: token,
      manager: manager,
      period: period - 1,
    };
    console.log("Rirender...");
    //Fetch of the all data for the 4 charts
    dispatch(performCharts(info));
  }, [period]);

  //First chart
  const prepareAvgCatalogs = () => {
    if (avgCatalogs !== null) {
      let keys = Object.keys(avgCatalogs);
      /* console.log("Obj keys: ");
    console.log(keys); */
      let values = [];
      //Getting the values from the json
      keys.map((key) => {
        values.push(avgCatalogs[key]);
      });
      /* console.log("Obj values: ");
    console.log(values); */
      setAvgCatalogsData({
        x: keys,
        y: values,
      });
    }
  };

  //Second chart
  const prepareTopTenRewards = () => {
    if ((topTen !== null)&&(topTen.length !== 0)) {
      //Getting the keys of the objects
      var keys = Object.keys(topTen[0]);
      /* console.log("Keys of top 10: ");
    console.log(keys);
    console.log(topTen); */
      let x = [];
      let y = [];
      topTen.map((reward) => {
        x.push(reward[keys[1]] + " \n" + reward[keys[2]]);
        y.push(reward[keys[0]]);
      });
      /* console.log("2nd Chart");
    console.log(x);
    console.log(y); */
      setTopTenData({
        x: x,
        y: y,
      });
    }
  };

  //Third chart
  const prepareTopTenCatalogs = () => {
    console.log("Lalla");
    console.log(topTenCatalogs);
    if ((topTenCatalogs !== null)&&(topTenCatalogs.length !== 0)) {
      //Getting the keys of the objects
      var keys = Object.keys(topTenCatalogs[0]);
      console.log("Keys of top 10 catalogs: ");
      console.log(keys);
      console.log(topTenCatalogs);
      let x = [];
      let y = [];
      topTenCatalogs.map((catalog) => {
        x.push(catalog[keys[1]]);
        y.push(catalog[keys[0]]);
      });
      console.log("3rd Chart");
      console.log(x);
      console.log(y);
      setTopTenCatalogData({
        x: x,
        y: y,
      });
    }
  };

  //Preparing fourth chart
  const prepareAvgSubs = () => {
    if (avgSubscriptions !== null) {
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

  //Method to update the fourth chart when choosing another option
  const changeFourthChart = async (period) => {
    //Splitting the period to get the number
    let p = period.split(" ");
    setPeriod(p[0]);
    console.log("Periodo selezionato: " + p[0]);
    /* //Fetch of the all data for the 4 charts
    dispatch(getAvgSubscriptions(info)); */
  };

  //When data are ready
  useEffect(() => {
    if (chartsData !== null) {
      console.log("Charts data...");
      console.log(chartsData);
    }
    if (
      chartsData.firstChart !== null ||
      chartsData.secondChart !== null ||
      topTenCatalogs !== null ||
      avgSubscriptions !== null
    ) {
      console.log("Prima stats: ");
      console.log(avgCatalogsData);
      console.log("Seconda stats: ");
      console.log(topTenData);
      console.log("Terza stats: ");
      console.log(topTenCatalogData);
      console.log("Quarta stats: ");
      console.log(avgSubs);
      //Preparing the first chart
      prepareAvgCatalogs();
      //Preparing the second chart
      prepareTopTenRewards();
      //Preparing the third chart
      prepareTopTenCatalogs();
      //Preparing the fourth chart
      prepareAvgSubs();
    }
  }, [chartsData]);

  //Period used to fetch the avg subs of all catalogs by period
  let periods = ["2 mesi", "4 mesi", "6 mesi"];

  return chartsData === null ? (
    console.log(avgCatalogs) && <div></div>
  ) : (
    <>
      <div className="statistic-content">
        <div className="firstTwo">
          <div className="avg-point-by-catalog">
            <h2>Media dei punti dei tuoi cataloghi</h2>
            {avgCatalogsData.x.length === 0 ? (
              <p style={{ marginTop: "2em" }}>Non ci sono statistiche</p>
            ) : (
              <ManagerChart data={avgCatalogsData} type={1} />
            )}
          </div>
          <div className="top-rewards">
            <h2>Classifica premi riscattati</h2>
            {topTenData.x.length === 0 ? (
              <p style={{ marginTop: "2em" }}>Non ci sono statistiche</p>
            ) : (
              <ManagerChart data={topTenData} type={2} />
            )}
          </div>
        </div>
        <div>
          <div className="lastTwo">
            <div className="top-catalogs">
              <h2>Classifica cataloghi con più iscrizioni</h2>
              {topTenCatalogData.x.length === 0 ? (
                <p style={{ marginTop: "2em" }}>Non ci sono statistiche</p>
              ) : (
                <ManagerChart data={topTenCatalogData} type={3} />
              )}
            </div>
            <div className="avgSubs">
              <h2>Numero di iscrizioni per ogni catalogo</h2>
              {avgSubs.data.length === 0 ? (
                <p style={{ marginTop: "2em" }}>Non ci sono statistiche</p>
              ) : (
                <>
                  <select
                    className="create-card-select"
                    onChange={(e) => changeFourthChart(e.target.value)}
                    required
                  >
                    <option className="select-placeholder" selected>
                      2 mesi
                    </option>
                    {periods.map((option, i) => (
                      <option value={option} key={i}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ManagerChart data={avgSubs.data} type={4} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
