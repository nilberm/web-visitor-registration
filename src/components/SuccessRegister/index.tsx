import style from "./style.module.scss";

import gifSuccess from "../../assets/gif/success.gif";

interface SuccessRegisterProps {}
export default function SuccessRegister(props: SuccessRegisterProps) {
  return (
    <div className={style.successComponent}>
      <h1>Visita registrada com sucesso!</h1>
      <img src={gifSuccess} alt="success" />
      <p>
        Agradecemos por registrar sua visita em nosso Museu! Tenha uma ótima
        experiência!
      </p>
    </div>
  );
}
