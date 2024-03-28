import React from "react";
import NavbarComponent from "../../components/NavbarComponent";
import SidebarComponent from "@/components/SidebarComponent";
import GraficoComponent from "@/components/ChartComponent";

const Home: React.FC = () => {
  // TIPOS DE GRAFICOS
  // GeoChart    AreaChart  ScatterChart  Table
  // Histogram   BarChart   ColumnChart   ComboChart
  // Bar         PieChart   Scatter

  const bar = [
    ["Mês", "Vendas"],
    ["Janeiro", 1000],
    ["Fevereiro", 1500],
    ["Março", 1200],
    ["Abril", 1300],
    ["Maio", 1700],
    ["Junho", 1400],
  ];

  const barOptions = {
    title: "Vendas por mês",
    hAxis: { title: "Mês", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    legend: { position: "none" },
  };

  const monthSales = [
    ["Mês", "Vendas"],
    ["Janeiro", 1000],
    ["Fevereiro", 1500],
    ["Março", 1200],
    ["Abril", 1300],
    ["Maio", 1700],
    ["Junho", 1400],
  ];

  const options = {
    title: "Vendas por mês",
    hAxis: { title: "Mês", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    legend: { position: "none" },
  };

  return (
    <div>
      <NavbarComponent />
      <SidebarComponent />
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "45px",
        }}
      >
        <GraficoComponent data={bar} options={barOptions} type="Bar" />
      </div>
    </div>
  );
};

export default Home;
