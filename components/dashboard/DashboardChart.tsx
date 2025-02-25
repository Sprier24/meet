import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, Pie, PieChart, RadialBar, RadialBarChart, Rectangle, XAxis } from "recharts";

interface ChartData {
  browser: string;
  visitors: number;
  fill: string;
}

interface DashboardChartProps {
  title: string;
  chartType: 'Pie Chart' | 'Radial Chart' | 'Bar Chart';
  data: ChartData[];
  config: ChartConfig;
  loading: boolean;
}

const getChartDimensions = () => {
  if (typeof window !== 'undefined') {
    const width = Math.min(600, window.innerWidth - 40);
    const height = Math.min(400, width * 0.8);
    return { width, height };
  }
  return { width: 600, height: 400 };
};

export const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  chartType,
  data,
  config,
  loading
}) => {
  const { width, height } = getChartDimensions();

  if (loading) {
    return (
      <Card>
        <CardHeader className="items-center">
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader className="items-center">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="text-center">No data available</div>
        </CardContent>
      </Card>
    );
  }

  switch (chartType) {
    case 'Pie Chart':
      return (
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Pie Chart - {title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={config}
              className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
            >
              <PieChart width={width} height={height}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <Pie
                  data={data}
                  dataKey="visitors"
                  nameKey="browser"
                  cx="50%"
                  cy="50%"
                  outerRadius={Math.min(width, height) / 4}
                  className="cursor-pointer"
                  style={{ color: "#FF7F3E" }}
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="browser" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      );

    case 'Radial Chart':
      return (
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Radial Chart - {title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={config}
              className="mx-auto aspect-square max-h-[400px]"
            >
              <RadialBarChart
                width={width}
                height={height}
                data={data}
                startAngle={-90}
                endAngle={380}
                innerRadius={Math.min(width, height) / 12}
                outerRadius={Math.min(width, height) / 4}
                cx="50%"
                cy="50%"
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <RadialBar dataKey="visitors" background>
                  <LabelList
                    position="insideStart"
                    dataKey="browser"
                    className="fill-white capitalize mix-blend-luminosity"
                    fontSize={11}
                  />
                </RadialBar>
              </RadialBarChart>
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </ChartContainer>
          </CardContent>
        </Card>
      );

    case 'Bar Chart':
      return (
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - {title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={config}>
              <BarChart width={width} height={height} data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="browser"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    config[value as keyof typeof config]?.label
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="visitors"
                  strokeWidth={2}
                  radius={8}
                  fill="#8884d8"
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={props.payload.fill}
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      );

    default:
      return null;
  }
};
