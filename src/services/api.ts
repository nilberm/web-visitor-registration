import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
  adapter: axios.defaults.adapter,
});

export const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/",
});
