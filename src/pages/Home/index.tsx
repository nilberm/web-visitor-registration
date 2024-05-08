import FormVisitor from "../../components/FormVisitor";
import style from "./style.module.scss";

interface HomeProps {}
export default function Home(props: HomeProps) {
  return (
    <main className={style.mainHome}>
      <FormVisitor />
    </main>
  );
}
