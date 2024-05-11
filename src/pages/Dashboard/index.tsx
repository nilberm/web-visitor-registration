import { Link } from "react-router-dom";
import CitiesChart from "../../components/DashboardComponents/CitiesChart";
import GenderChart from "../../components/DashboardComponents/GenderChart";
import StatesChart from "../../components/DashboardComponents/StatesChart";
import VisitorsChart from "../../components/DashboardComponents/VisitorsChart";
import style from "./style.module.scss";
import logo from "../../assets/logo/museu.png";
import PdfDownload from "../../components/DashboardComponents/PdfDownload";

export default function Dashboard() {
  return (
    <main className={style.mainDashboard}>
      <Link to={"/"} className={style.logo}>
        <img src={logo} alt="logo" />
      </Link>

      <PdfDownload />

      <div className={style.grid}>
        <VisitorsChart />
        <CitiesChart />
        <StatesChart />
        <GenderChart />
      </div>
    </main>
  );
}
