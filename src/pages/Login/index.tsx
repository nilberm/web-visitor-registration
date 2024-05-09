/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import FormLogin from "../../components/FormLogin";
import style from "./style.module.scss";

import logo from "../../assets/logo/museu.png";

export default function Login() {
  return (
    <main className={style.mainLogin}>
      <Link to={"/"} className={style.logo}>
        <img src={logo} alt="logo" />
      </Link>
      <FormLogin />
    </main>
  );
}
