import { Spinner } from "flowbite-react";
import React from "react";
import { Chart } from "react-google-charts";

interface Props {
  data: (string | number)[][];
  options?: any;
  type: any
}

const ChartComponent: React.FC<Props> = ({ data, options, type }) => {
  return (
    <Chart
      width={"500px"}
      height={"300px"}
      chartType={type}
      loader={
        <div>
          Carregando Gráfico<Spinner></Spinner>
        </div>
      }
      data={data}
      options={options}
    />
  );
};

export default ChartComponent;
