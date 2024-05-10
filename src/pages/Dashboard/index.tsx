import CitiesChart from "../../components/DashboardComponents/CitiesChart";
import GenderChart from "../../components/DashboardComponents/GenderChart";
import StatesChart from "../../components/DashboardComponents/StatesChart";
import VisitorsChart from "../../components/DashboardComponents/VisitorsChart";
import style from "./style.module.scss";

export default function Dashboard() {
  return (
    <main className={style.mainDashboard}>
      Dashboard
      <div className={style.grid}>
        <VisitorsChart />
        <CitiesChart />
        <StatesChart />
        <GenderChart />
      </div>
    </main>
  );
}
