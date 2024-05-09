import { useState } from "react";
import style from "./style.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface Inputs {
  email: string;
  password: string;
}
export default function FormLogin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    await api
      .post("/auth/signin", data)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate("/dashboard");
        toast.success("Logado com sucesso!");
        reset();
      })
      .catch(() => {
        toast.error("E-mail ou senha inválidos!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={style.formComponent}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.form} ${loading ? style.formLoading : ""}`}
      >
        <h2>Login </h2>

        <div
          className={`${style.formInput} ${
            errors.email ? style.inputWithError : ""
          }`}
        >
          <label>E-mail</label>
          <input
            type="email"
            placeholder="E-mail"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <span>Campo 'E-mail' obrigatório</span>}
        </div>

        <div
          className={`${style.formInput} ${
            errors.password ? style.inputWithError : ""
          }`}
        >
          <label>Senha</label>
          <input
            type="password"
            placeholder="Senha"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && <span>Campo 'Senha' obrigatório</span>}
        </div>

        <button type="submit" className={style.submitBtn}>
          Entrar
        </button>
      </form>
    </div>
  );
}
