import Plot from "react-plotly.js";

export default function ManagerChart({ data, type }) {
  if (type === 4) {
    console.log("Sono dentrooo");
    console.log(data[0]);
    return (
      <div>
        {
          <Plot
            data={data.map((d) => {
              return {
                x: d.x,
                y: d.y,
                type: "lines",
                name: d.name,
              };
            })}
            layout={{
              width: "20em",
              height: "20em",
              xaxis: {
                tickfont: {
                  family: "Barlow",
                  size: 20,
                },
              },
            }}
          />
        }
      </div>
    );
  } else {
    return (
      <div>
        {
          <Plot
            data={[
              {
                type: "bar",
                x: data.x,
                y: data.y,
              },
            ]}
            layout={{
              width: "20em",
              height: "20em",
              xaxis: {
                tickfont: {
                  family: "Barlow",
                  size: 20,
                },
              },
            }}
          />
        }
      </div>
    );
  }
}
