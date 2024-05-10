import style from "./style.module.scss";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { randomColor } from "../../../utils/randomColor";

ChartJS.register(Tooltip, Legend, ArcElement);

interface DataState {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
  }[];
}

interface responseProps {
  city: string;
  count: number;
}
export default function CitiesChart() {
  const [data, setData] = useState<DataState>({ labels: [], datasets: [] });
  const [cities, setCities] = useState([]);

  const getDataByCities = async () => {
    await api.get(`visitor/by-cities`).then((response) => {
      const responseData = response.data;
      responseData.sort(
        (a: { count: string }, b: { count: string }) =>
          parseInt(b.count) - parseInt(a.count)
      );

      setCities(responseData);
      const labels = responseData.map((item: responseProps) => item.city);
      const dataCounts = responseData.map((item: responseProps) => item.count);

      const backgroundColors = dataCounts.map(() => randomColor());

      setData({
        labels: labels,
        datasets: [
          {
            label: "Visitas",
            data: dataCounts,
            backgroundColor: backgroundColors,
            hoverOffset: 4,
          },
        ],
      });
    });
  };

  useEffect(() => {
    getDataByCities();
  }, []);

  return (
    <div className={style.citiesComponent}>
      <div className={style.chartInfo}>
        <h3>Visitantes por cidade</h3>
        <ul>
          {cities &&
            cities.map((city: responseProps) => {
              return (
                <li key={city.city}>
                  {city.city}: {city.count}
                </li>
              );
            })}
        </ul>
      </div>
      <div className={style.chart}>
        <Pie
          data={data}
          width={250}
          height={250}
          options={{
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
