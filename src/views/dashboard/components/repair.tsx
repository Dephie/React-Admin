import { Select, Typography } from 'antd';
import { useState } from 'react';

import Card from '@/components/card';
import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';

export default function Repair() {
  const [year, setYear] = useState('2023');
  const series: Record<string, ApexAxisChartSeries> = {
    '2022': [
      { name: '报修次数', data: [10, 41, 35, 51, 49, 61, 69, 91, 148, 35, 51] },
      { name: '维修次数', data: [10, 34, 13, 56, 77, 88, 99, 45, 13, 56, 77] },
    ],

    '2023': [
      { name: '报修次数', data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 35, 51] },
      { name: '维修次数', data: [56, 13, 34, 10, 77, 99, 88, 45, 13, 56, 77] },
    ],
  };
  return (
    <Card className="flex-col">
      <header className="flex w-full justify-between self-start">
        <Typography.Title level={5}>报修/维修</Typography.Title>
        <Select
          size="small"
          defaultValue={year}
          onChange={(value) => setYear(value)}
          options={[
            { value: 2023, label: '2023' },
            { value: 2022, label: '2022' },
          ]}
        />
      </header>
      <main className="w-full">
        <ChartArea series={series[year]} />
      </main>
    </Card>
  );
}

function ChartArea({ series }: { series: ApexAxisChartSeries }) {
  const chartOptions = useChart({
    xaxis: {
      type: 'category',
      categories: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    tooltip: {},
  });

  return <Chart type="area" series={series} options={chartOptions} height={300} />;
}
