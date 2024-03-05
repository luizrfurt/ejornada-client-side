import { Spinner } from 'flowbite-react';
import React from 'react';
import { Chart } from 'react-google-charts';

interface GraficoComponentProps {
  data: (string | number)[][];
  options?: any; // Você pode ajustar esse tipo conforme as opções que deseja passar
}

const GraficoComponent: React.FC<GraficoComponentProps> = ({ data, options }) => {
  return (
    <Chart
      width={'500px'}
      height={'300px'}
      chartType="Bar"
      loader={<div>Carregando Gráfico<Spinner></Spinner></div>}
      data={data}
      options={options}
    />
  );
};

export default GraficoComponent;
