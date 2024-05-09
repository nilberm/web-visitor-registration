import FormVisitor from "../../components/FormVisitor";
import style from "./style.module.scss";
import videoBackground from "../../assets/video/background-video.mp4";
import logo from "../../assets/logo/museu.png"
import { useEffect, useState } from "react";
import SuccessRegister from "../../components/SuccessRegister";


export default function Home() {
  const [formFinished, setFormFinished] = useState(false);

  useEffect(() => {
    if (formFinished){
      setTimeout(() => {
        setFormFinished(false);
      }, 4000)
    }
  }, [formFinished])

  return (
    <main className={style.mainHome}>
      <div className={style.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={style.videoContainer}>
        <video className={style.videoBackground} autoPlay muted loop>
          <source src={videoBackground} type="video/mp4" />
        </video>
      </div>
      {formFinished ? <SuccessRegister /> : <FormVisitor setFormFinished={setFormFinished}  />}
    </main>
  );
}
