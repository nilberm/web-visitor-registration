import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";

export interface VisitorStatistics {
  totalVisits: number;
  uniqueVisitors: { count: number };
  visitorsByCity: { city: string; count: number }[];
  stateWithMostVisitors: { state: string; count: number };
  visitorsByGender: { gender: VisitorGender; count: number }[];
}

enum VisitorGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  UNINFORMED = "uninformed",
}

export default function PdfDownload() {
  const [dataToPdf, setDataToPdf] = useState<VisitorStatistics>();

  const getDataToPdf = async () => {
    await api.get("visitor/to-download").then((response) => {
      setDataToPdf(response.data);
    });
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: "center",
    },
    section: {
      marginVertical: 10,
    },
  });

  const PdfFile = () => {
    if (dataToPdf) {
      return (
        <Document>
          <Page style={styles.page}>
            <Text style={styles.title}>Estatísticas de Visitantes</Text>

            <View style={styles.section}>
              <Text>Total de Visitas: {dataToPdf.totalVisits}</Text>
            </View>

            <View style={styles.section}>
              <Text>Visitantes Únicos: {dataToPdf.uniqueVisitors.count}</Text>
            </View>

            <View style={styles.section}>
              <Text>Visitantes por Cidade:</Text>
              {dataToPdf.visitorsByCity.map((city) => (
                <Text key={city.city}>
                  {city.city}: {city.count}
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text>
                Estado com Mais Visitantes:{" "}
                {dataToPdf.stateWithMostVisitors.state} (
                {dataToPdf.stateWithMostVisitors.count})
              </Text>
            </View>

            <View style={styles.section}>
              <Text>Visitantes por Gênero:</Text>
              {dataToPdf.visitorsByGender.map((gender) => (
                <Text key={gender.gender}>
                  {gender.gender === "male"
                    ? "Masculino"
                    : gender.gender === "female"
                    ? "Feminino"
                    : gender.gender === "other"
                    ? "Outro"
                    : "Não Informado"}
                  : {gender.count}
                </Text>
              ))}
            </View>
          </Page>
        </Document>
      );
    } else {
      return (
        <Document>
          <Page></Page>
        </Document>
      );
    }
  };

  useEffect(() => {
    getDataToPdf();
  }, []);

  return (
    <div className={style.pdfDownload}>
      <PDFDownloadLink document={<PdfFile />} fileName="Gráficos Visitantes">
        {({ loading }) => (loading ? "Carregando Documento..." : "Baixar")}
      </PDFDownloadLink>
    </div>
  );
}
