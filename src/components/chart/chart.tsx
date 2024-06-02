import { memo, useEffect,useState} from 'react';
import ApexChart from 'react-apexcharts';

import { settingStore } from '@/store/setting';
import { useThemeToken } from '@/hooks/use-theme-token';

import { StyledApexChart } from './styles';

import type { Props as ApexChartProps } from 'react-apexcharts';

enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

function Chart(props: ApexChartProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Light);
  const theme = useThemeToken();
  const { isDark } = settingStore();
  useEffect(() => {
    if (!isDark) {
      setThemeMode(ThemeMode.Light);
    } else {
      setThemeMode(ThemeMode.Dark);
    }
  }, [isDark]);

  return (
    <StyledApexChart $thememode={themeMode} $theme={theme}>
      <ApexChart {...props} />
    </StyledApexChart>
  );
}

export default memo(Chart);