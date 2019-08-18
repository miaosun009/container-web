import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
const options = {
  legend: {
    display: true,
    // onClick: function(e: any, legendItem: any) {
    //   const index = legendItem.datasetIndex;
    //   const ci = this.chart;
    //   const meta = ci.getDatasetMeta(index);
    //   meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
    //   console.info(index,meta.hidden)
    //   ci.update();
    // },
  },
  elements: {
    line: { tension: 0 },
  },
};
export default ({ dataSource = [] }) => {
  const data: any = {
    labels: [],
    datasets: [
      {
        label: 'midTemp',
        borderColor: '#eb3c70',
        data: [],
        hidden: false,
      },
      {
        borderColor: '#0f95b0',
        label: 'rearTemp',
        data: [],
        hidden: true,
      },
      {
        borderColor: '#61ac85',
        label: 'midRh',
        data: [],
        hidden: true,
      },
      {
        borderColor: '#f2ce2b',
        label: 'rearRh',
        data: [],
        hidden: true,
      },
      {
        label: 'waterTemp',
        borderColor: '#876818',
        data: [],
        hidden: true,
      },
      {
        label: 'Co2Level',
        borderColor: '#541e24',
        data: [],
        hidden: true,
      },
      {
        label: 'powerConsumption',
        borderColor: '#74759b',
        data: [],
        hidden: true,
      },
    ],
  };
  dataSource.forEach((item: any) => {
    data.labels.push(moment(parseInt(item.dateTime)).format('YY.MM.DD HH:mm'));
    data.datasets[0].data.push(item['midTemp']);
    data.datasets[1].data.push(item['rearTemp']);
    data.datasets[2].data.push(item['midRh']);
    data.datasets[3].data.push(item['rearRh']);
    data.datasets[4].data.push(item['waterTemp']);
    data.datasets[5].data.push(item['Co2Level']);
    data.datasets[6].data.push(item['powerConsumption']);
  });
  return <Line data={data} type="line" options={options} height={40} />;
};
