//@flow
import Chart from 'react-apexcharts';

type Props = {
  data: Array,
  currencySymbol: string,
};

const ChartComponent = (props: Props) => {
  const { data, currencySymbol } = props;
  const categories = [];
  const series = [];
  data.map((entry, index) => {
    const date = new Date(entry.createdAt);
    if (index % 5 === 0) {
      categories.push(`${date.getHours()}:${date.getMinutes()}`);
      series.push(entry.valueNow);
    }
  });

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: categories,
    },
  };
  const seriesInput = [
    {
      name: currencySymbol,
      data: series,
    },
  ];

  return (
    <>
      <Chart options={options} series={seriesInput} type="line" width={'98%'} height={'500px'} />
    </>
  );
};
export default ChartComponent;
