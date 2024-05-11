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
  gender: string;
  count: number;
}
export default function GenderChart() {
  const [data, setData] = useState<DataState>({ labels: [], datasets: [] });
  const [genders, setGenders] = useState([]);

  const getDataByGender = async () => {
    await api.get(`visitor/by-gender`).then((response) => {
      const responseData = response.data;
      responseData.sort(
        (a: { count: string }, b: { count: string }) =>
          parseInt(b.count) - parseInt(a.count)
      );

      setGenders(responseData);

      const labels = responseData.map((item: responseProps) => {
        if (item.gender === "male") {
          return "Masculino";
        } else if (item.gender === "female") {
          return "Feminino";
        } else if (item.gender === "other") {
          return "Outro";
        } else if (item.gender === "uninformed") {
          return "Não Informado";
        }
      });

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
    getDataByGender();
  }, []);

  return (
    <div className={style.genderComponent}>
      <div className={style.chartInfo}>
        <h3>Visitantes por Gênero</h3>
        <ul>
          {genders &&
            genders.map((gender: responseProps) => {
              return (
                <li key={gender.gender}>
                  {gender.gender === "male"
                    ? "Masculino"
                    : gender.gender === "female"
                    ? "Feminino"
                    : gender.gender === "other"
                    ? "Outro"
                    : "Não Informado"}
                  : {gender.count}
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
