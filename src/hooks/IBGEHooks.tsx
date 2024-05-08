import { useState, useEffect } from "react";
import { apiIBGE } from "../services/api";

export interface StatesProps {
  id: number;
  nome: string;
  sigla: string;
}

export interface CitiessProps {
  id: number;
  nome: string;
}

export const useFindStates = () => {
  const [states, setStates] = useState<StatesProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiIBGE.get("localidades/estados?orderBy=nome");
        setStates(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return { states };
};

export const findCity = async (
  stateId: string | undefined
): Promise<CitiessProps[]> => {
  const response =
    await apiIBGE.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios
  `);
  return response.data;
};
