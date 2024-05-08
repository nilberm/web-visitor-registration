import { SubmitHandler, useForm } from "react-hook-form";
import style from "./style.module.scss";
import { api } from "../../services/api";
import InputMask from "react-input-mask";
import { CitiessProps, findCity, useFindStates } from "../../hooks/IBGEHooks";
import { useEffect, useState } from "react";
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

  const [stateId, setStateId] = useState<string | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cities, setCities] = useState<CitiessProps[]>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await api
      .post("visitor", data)
      .then((response) => {
        console.log(response.data);
        reset();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const { states } = useFindStates();

  const getCities = async (stateId: string) => {
    const foundCities = await findCity(stateId);
    setCities(foundCities);
  };

  useEffect(() => {
    if (stateId) {
      getCities(stateId);
    }
  }, [stateId]);

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
        <InputMask mask={"999.999.999-99"} {...register("cpf")} />
        {errors.cpf && <span>Campo 'CPF' obrigatório</span>}
      </div>

      <div className={style.formInput}>
        <label>Profissão</label>
        <input {...register("occupation")} />
        {errors.occupation && <span>Campo 'Profissão' obrigatório</span>}
      </div>

      <div className={style.columnInput}>
        <div className={style.formInputFirst}>
          <label>Gênero</label>
          <select {...register("gender")}>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
            <option value="uninformed">Prefiro não informar</option>
          </select>
          {errors.gender && <span>Campo 'Gênero' obrigatório</span>}
        </div>
        <div className={style.formInput}>
          <label>Idade</label>
          <input type="number" {...register("age")} />
          {errors.age && <span>Campo 'Idade' obrigatório</span>}
        </div>
      </div>

      <div className={style.columnInput}>
        <div className={style.formInputFirst}>
          <label>Estado</label>
          <select
            {...register("state")}
            onChange={(v) => setStateId(v.target.value)}
          >
            {states &&
              states.map((state) => {
                return (
                  <option key={state.id} value={state.sigla}>
                    {state.nome}
                  </option>
                );
              })}
          </select>
          {errors.state && <span>Campo 'Estado' obrigatório</span>}
        </div>
        <div className={style.formInput}>
          <label>Cidade</label>
          <select
            {...register("city")}
            onChange={(v) => console.log(v.target.value)}
            disabled={!cities}
          >
            {cities &&
              cities?.map((citie: CitiessProps) => {
                return (
                  <option key={citie.id} value={citie.id}>
                    {citie.nome}
                  </option>
                );
              })}
          </select>
          {errors.city && <span>Campo 'Cidade' obrigatório</span>}
        </div>
      </div>

      <button type="submit" className={style.submitBtn}>Enviar</button>
    </form>
  );
}
