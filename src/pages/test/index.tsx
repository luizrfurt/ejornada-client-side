import React from 'react';

const test: React.FC = () => {
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
      <h1>Seu gráfico de barras</h1>
    </div>
  );
};

export default test;
