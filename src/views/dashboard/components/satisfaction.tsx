import { Typography } from 'antd';

import Card from '@/components/card';
import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';

export default function Satisfaction() {
  return (
    <Card className="flex-col">
      <header className="self-start">
        <Typography.Title level={5}>报修服务满意度</Typography.Title>
      </header>
      <main>
        <ChartDonut />
      </main>
    </Card>
  );
}

const series = [44, 55, 13, 43];
function ChartDonut() {
  const chartOptions = useChart({
    labels: ['好评', '中评', '差评', '未评价'],
    colors: ['#19c719', '#f6bf37' , '#e04040','#0000FF'],
    stroke: {
      show: false,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    tooltip: {
      fillSeriesColor: false,
    },
    chart: {
      width: 240,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            total: {
              show: true,
              label: '总数',
              fontSize: '12px',
            },
            value: {
              fontSize: '18px',
              fontWeight: 700,
            },
          },
        },
      },
    },
  });

  return <Chart type="donut" series={series} options={chartOptions} height={360} />;
}
