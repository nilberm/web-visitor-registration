import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import style from "./style.module.scss";
import Switch from "../../Switch";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { randomColor } from "../../../utils/randomColor";

interface DataState {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

interface responseProps {
  date: string;
  count: number;
}
export default function VisitorsChart() {
  dayjs.locale("pt-br");

  const options = {};
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [monthSelected, setMonthSelected] = useState("4");
  const [data, setData] = useState<DataState>({ labels: [], datasets: [] });

  const getDataByDay = async (month: string, year: string = "2024") => {
    await api
      .get(`visitor/by-day?month=${month}&year=${year}`)
      .then((response) => {
        const responseData = response.data;

        const labels = responseData.map((item: responseProps) =>
          dayjs(item.date).format("DD/MM/YYYY")
        );
        const dataCounts = responseData.map(
          (item: responseProps) => item.count
        );

        setData({
          labels: labels,
          datasets: [
            {
              label: "Dias",
              data: dataCounts,
              backgroundColor: randomColor(),
            },
          ],
        });
      });
  };

  const getDataByMonth = async () => {
    await api.get(`visitor/by-month`).then((response) => {
      const responseData = response.data;

      const labels = responseData.map((item: responseProps) =>
        dayjs(item.date).format("MMMM/YYYY")
      );
      const dataCounts = responseData.map((item: responseProps) => item.count);

      setData({
        labels: labels,
        datasets: [
          {
            label: "Meses",
            data: dataCounts,
            backgroundColor: "rgb(50, 83, 190)",
          },
        ],
      });
    });
  };

  useEffect(() => {
    if (!isMonthSelected) {
      getDataByDay(monthSelected);
    } else {
      getDataByMonth();
    }
  }, [monthSelected, isMonthSelected]);

  return (
    <div className={style.visitorsComponent}>
      <div className={style.chartHeader}>
        <span className={style.title}>
          Total de visitas por {isMonthSelected ? "mês" : "dia"}
        </span>
        <div className={style.switch}>
          <span>Dia</span>
          <Switch onToggle={(v) => setIsMonthSelected(v)} />
          <span>Mês</span>
        </div>
      </div>
      {!isMonthSelected && (
        <div className={style.selectMonth}>
          <span>Escolha o Mês</span>
          <select
            defaultValue={monthSelected}
            onChange={(v) => setMonthSelected(v.target.value)}
          >
            <option value="0">Janeiro/24</option>
            <option value="1">Fevereiro/24</option>
            <option value="2">Março/24</option>
            <option value="3">Abril/24</option>
            <option value="4">Maio/24</option>
            <option value="5">Junho/24</option>
            <option value="6">Julho/24</option>
            <option value="7">Agosto/24</option>
            <option value="8">Setembro/24</option>
            <option value="9">Outubro/24</option>
            <option value="10">Novembro/24</option>
            <option value="11">Dezembro/24</option>
            <option value="12">Janeiro/25</option>
          </select>
        </div>
      )}
      <Bar options={options} data={data} />
    </div>
  );
}
