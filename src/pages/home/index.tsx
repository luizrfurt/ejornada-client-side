import React from 'react';
import NavbarComponent from "../../components/NavbarComponent";
import SidebarComponent from "@/components/SideBarComponent";
import GraficoComponent from '@/components/GraficoComponent';

const Home: React.FC = () => {

  const data = [
    ['Mês', 'Vendas'],
    ['Janeiro', 1000],
    ['Fevereiro', 1500],
    ['Março', 1200],
    ['Abril', 1300],
    ['Maio', 1700],
    ['Junho', 1400],
  ];

  const options = {
    title: 'Vendas por mês',
    hAxis: { title: 'Mês', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 },
    legend: { position: 'none' },
  };

  return (
    <div>
      <NavbarComponent />
      <SidebarComponent />
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '45px' }}>
        <GraficoComponent data={data} options={options} />
      </div>
    </div>
  );
};

export default Home;
