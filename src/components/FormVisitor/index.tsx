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
  UNINFORMED = "uninformed",
}

interface FormVisitorProps {
  setFormFinished: (value: boolean) => void;
}

export default function FormVisitor(props: FormVisitorProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const [stateId, setStateId] = useState<string | undefined>();
  const [cities, setCities] = useState<CitiessProps[]>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await api
      .post("visitor", data)
      .then(() => {
        props.setFormFinished(true);
        reset();
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
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
      setValue("city", "");
    }
  }, [stateId, setValue]);

  return (
    <div className={style.formComponent}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.form} ${loading ? style.formLoading : ""}`}
      >
        <h2>Seja bem-vindo(a) visitante </h2>

        <div
          className={`${style.formInput} ${
            errors.name ? style.inputWithError : ""
          }`}
        >
          <label>Nome do visitante</label>
          <input
            placeholder="Digite seu nome"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && <span>Campo 'Nome' obrigatório</span>}
        </div>

        <div
          className={`${style.formInput} ${
            errors.cpf ? style.inputWithError : ""
          }`}
        >
          <label>CPF</label>
          <InputMask
            placeholder="000.000.000-00"
            mask={"999.999.999-99"}
            {...register("cpf", {
              required: true,
            })}
          />
          {errors.cpf && <span>Campo 'CPF' obrigatório</span>}
        </div>

        <div
          className={`${style.formInput} ${
            errors.occupation ? style.inputWithError : ""
          }`}
        >
          <label>Profissão</label>
          <input
            placeholder="Digite sua profissão"
            {...register("occupation", {
              required: true,
            })}
          />
          {errors.occupation && <span>Campo 'Profissão' obrigatório</span>}
        </div>

        <div className={style.columnInput}>
          <div
            className={`${style.formInputFirst} ${
              errors.gender ? style.inputWithError : ""
            }`}
          >
            <label>Gênero</label>
            <select
              {...register("gender", {
                required: true,
              })}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Escolha um gênero
              </option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
              <option value="uninformed">Prefiro não informar</option>
            </select>
            {errors.gender && <span>Campo Obrigatório</span>}
          </div>
          <div
            className={`${style.formInput} ${
              errors.age ? style.inputWithError : ""
            }`}
          >
            <label>Idade</label>
            <input
              placeholder="Digite sua idade"
              type="number"
              {...register("age", {
                required: true,
              })}
            />
            {errors.age && <span>Campo 'Idade' obrigatório</span>}
          </div>
        </div>

        <div className={style.columnInput}>
          <div
            className={`${style.formInputFirst} ${
              errors.state ? style.inputWithError : ""
            }`}
          >
            <label>Estado</label>
            <select
              {...register("state", {
                required: true,
              })}
              onChange={(v) => setStateId(v.target.value)}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Escolha um estado
              </option>
              {states &&
                states.map((state) => {
                  return (
                    <option key={state.id} value={state.sigla}>
                      {state.nome}
                    </option>
                  );
                })}
            </select>
            {errors.state && <span>Campo Obrigatório</span>}
          </div>
          <div
            className={`${style.formInput} ${
              errors.city ? style.inputWithError : ""
            }`}
          >
            <label>Cidade</label>
            <select
              {...register("city", {
                required: true,
              })}
              disabled={!cities}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Escolha uma cidade
              </option>
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

        <button type="submit" className={style.submitBtn}>
          Enviar
        </button>
      </form>
    </div>
  );
}
