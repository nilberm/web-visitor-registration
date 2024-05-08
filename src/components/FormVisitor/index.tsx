import { SubmitHandler, useForm } from "react-hook-form";
import style from "./style.module.scss";
interface Inputs {
  name: string;
  cpf: string;
  email: string;
  occupation: string;
  gender: Gender;
  age: number;
  city: string;
  state: string;
}

enum Gender {
  MALE = "Homem",
  FEMALE = "Mulher",
  OTHER = "Outro",
}

export default function FormVisitor() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.name === "test") {
      reset();
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h2>Seja bem-vindo(a) visitante </h2>

      <div className={style.formInput}>
        <label>Nome do visitante</label>
        <input {...register("name")} />
        {errors.name && <span>Campo 'Nome' obrigatório</span>}
      </div>

      <div className={style.formInput}>
        <label>CPF</label>
        <input {...register("cpf")} />
        {errors.cpf && <span>Campo 'CPF' obrigatório</span>}
      </div>

      <div className={style.formInput}>
        <label>Profissão</label>
        <input {...register("occupation")} />
        {errors.occupation && <span>Campo 'Profissão' obrigatório</span>}
      </div>

      <div className={style.columnInput}>
        <div className={style.formInput}>
          <label>Gênero</label>
          <input {...register("gender")} />
          {errors.gender && <span>Campo 'Gênero' obrigatório</span>}
        </div>
        <div className={style.formInput}>
          <label>Idade</label>
          <input {...register("age")} />
          {errors.age && <span>Campo 'Idade' obrigatório</span>}
        </div>
      </div>

      <div className={style.columnInput}>
        <div className={style.formInput}>
          <label>Cidade</label>
          <input {...register("city")} />
          {errors.city && <span>Campo 'Cidade' obrigatório</span>}
        </div>
        <div className={style.formInput}>
          <label>Estado</label>
          <input {...register("state")} />
          {errors.state && <span>Campo 'Estado' obrigatório</span>}
        </div>
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}
