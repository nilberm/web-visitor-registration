import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { randomColor } from "../../../utils/randomColor";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataState {
  labels: string[];
  datasets: datasetsProps[];
}

interface datasetsProps {
  label: string;
  data: number[];
  borderColor: string;
}

interface responseProps {
  date: {
    month: number;
    year: number;
  };
  states: {
    state: string;
    count: number;
  }[];
}

export default function StatesChart() {
  const options = {};
  const [data, setData] = useState<DataState>({ labels: [], datasets: [] });

  const getStates = async () => {
    await api.get("visitor/by-states").then((response) => {
      const responseData: responseProps[] = response.data;

      const months = responseData.map((item: responseProps) => {
        const monthNames = [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ];
        const monthNumber = item.date.month;
        return monthNames[monthNumber - 1];
      });

      const datasets: datasetsProps[] = [];

      responseData.forEach((item: responseProps) => {
        item.states.forEach((state) => {
          const index = datasets.findIndex(
            (data) => data.label === state.state
          );

          if (index !== -1) {
            datasets[index].data.push(state.count);
          } else {
            datasets.push({
              label: state.state,
              data: [state.count],
              borderColor: randomColor(),
            });
          }
        });
      });

      setData({
        labels: months,
        datasets: datasets,
      });
    });
  };

  useEffect(() => {
    getStates();
  }, []);

  return (
    <div className={style.stateComponent}>
      <div className={style.headerChart}>
        <h3>Visitantes por Estados</h3>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}
