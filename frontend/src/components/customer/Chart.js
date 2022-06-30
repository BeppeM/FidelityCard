import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Plot from "react-plotly.js";
import "../../style/Wallet.css";
import { getAvgPoints } from "../../features/statistic/statisticThunk";

export function Chart() {
  //Retrieving the token from the state
  const token = useSelector((state) => state.auth.access_token);
  //Retrieving the customer username from the state
  const username = useSelector((state) => state.customers.value.username);
  const redeemed = useSelector((state) => state.redeem.status);
  //Dispatch to update the state
  const dispatch = useDispatch();
  //Fetch avgPoints of the cards
  const data = useSelector((state) => state.statistic.value);
  const dataStatus = useSelector((state) => state.statistic.status);
  const cardStatus = useSelector((state) => state.cards.value);
  //Data used to build the chart
  const [chartData, setChartData] = useState({
    //Managers the customer subscribed
    options: [],
    //All customer cards group by managers
    cardManagers: [],
  });
  //The actual data showed on the chart
  const [currentChartData, setCurrentChartData] = useState({
    manager: "",
    x: [],
    y: [],
  });

  //Get the managers from the data of the chart
  const buildManagerOptions = () => {
    let managers = [];
    //Building the array of managers -> options for select component
    data.firstChart.map((card) => {
      //Check if already have the manager
      if (!managers.includes(card.Manager)) {
        managers.push(card.Manager);
      }
    });
    return managers;
  };

  //Used to organize data for the chart
  const createNewManagerObj = (manager, catalog, avgPoints) => {
    return {
      //adding manager property
      manager: manager,
      managerCards: [
        {
          //Card type
          x: catalog,
          //Avg card points
          y: avgPoints,
        },
      ],
    };
  };

  //Building the data for showing the chart
  const buildData = () => {    
    //Get all the manager options
    let managerOptions = buildManagerOptions();
    console.log("Manager: ");
    console.log(managerOptions);
    //Building the array of cards
    let cards = [];
    data.firstChart.map((card) => {
      /* console.log(card); */
      //Search if i already have an object with that manager
      let o = [];
      o = cards.filter((c) => c.manager === card.Manager);
      /* console.log("Valore di o: ");
      console.log(o); */
      //It's a new card from a new manager
      if (o.length === 0) {
        /* console.log("Adding new object.."); */
        //Creating a new object for the manager with cards
        let obj = createNewManagerObj(
          card.Manager,
          card.Catalog,
          card.AveragePoints
        );
        cards.push(obj);
        /*console.log("Carte...");
        console.log(cards); */
      }
      //I already have an object
      else {
        /* console.log("Appending a card to an existing manager.."); */
        //Retrieve the manager
        let m = o[0].manager;
        let newCard = {
          //Card type
          x: card.Catalog,
          //Avg card points
          y: card.AveragePoints,
        };
        /* console.log("Nuova carta!!!");
        console.log(newCard); */
        cards.map((card) => {
          if (card.manager === m) {
            card.managerCards.push(newCard);
          }
        });
      }
    });
    console.log("All the cards grouped by manager!!");
    console.log(cards);
    //Update the state
    setChartData({
      options: managerOptions,
      cardManagers: cards,
    });
  };

  //Fetch data for the chart
  useEffect(() => {
    //console.log("Stato: " + redeemed);
    console.log("Stato card: " + cardStatus);
    //TODO Check if it has been performed the redeem functionality
    //TODO If so then update else keep the current state
    let info = {
      token: token,
      username: username,
    };
    //Hiding the chart!
    setCurrentChartData({
      manager: "",
    });
    //Retrieve data for the statistic chart
    dispatch(getAvgPoints(info));
  }, [cardStatus?.length]);

  //Building the data after the fetch of the data
  useEffect(() => {
    if (data.firstChart !== null) {
      console.log("Sono arrivati...");
      console.log(data.firstChart);
      buildData();
    }
  }, [data]);

  //Method used to update the chart
  const changeChart = (manager) => {
    let arrayX = [];
    let arrayY = [];
    //Retrieving the cards of the manager selected
    let res = chartData.cardManagers.filter((elem) => elem.manager === manager);
    /* console.log("Carte: ");
    console.log(res); */
    res[0].managerCards.map((card) => {
      arrayX.push(card.x);
      arrayY.push(card.y);
    });    
    //Update the chart
    setCurrentChartData({
      manager: manager,
      x: arrayX,
      y: arrayY,
    });
  };

  if (dataStatus === "pending") {
    return <div></div>;
  }
  if (dataStatus === "fulfilled") {
    return (
      <div style={{ marginTop: "1em" }}>
        <div>
          <div style={{marginBottom: '1em'}}>            
            <select
              className="create-card-select"
              onChange={(e) => changeChart(e.target.value)}
              required
            >
              <option className="select-placeholder" selected>
                Seleziona il manager
              </option>
              {chartData.options.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>            
            {currentChartData.manager === "" ? (
              <div></div>
            ) : (
              <div>
                <Plot
                  data={[
                    {
                      type: "bar",
                      x: currentChartData.x,
                      y: currentChartData.y,
                    },
                  ]}
                  layout={{
                    width: "20em",
                    height: "20em",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
