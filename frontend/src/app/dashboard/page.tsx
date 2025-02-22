"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/ModeToggle"
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbList, BreadcrumbLink, BreadcrumbItem } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React, { useMemo, useState, useEffect } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid, LabelList, Pie, PieChart, RadialBar, RadialBarChart, Rectangle, XAxis
} from "recharts"
import {

  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
} from "@mui/material";


//Lead//
const chartConfig = {
  visitors: {
    label: "Leads",
  },
  Proposal: {
    label: "Proposal",
    color: "hsl(var(--chart-1))",
  },
  New: {
    label: "New",
    color: "hsl(var(--chart-2))",
  },
  Demo: {
    label: "Demo",
    color: "hsl(var(--chart-3))",
  },
  Discussion: {
    label: "Discussion",
    color: "hsl(var(--chart-4))",
  },
  Decided: {
    label: "Decided",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
//Lead//


//Invoice//
const chartConfigInvoice = {
  visitors: {
    label: "Invoice",
  },
  Pending: {
    label: "New",
    color: "hsl(var(--chart-2))",
  },
  Unpaid: {
    label: "Demo",
    color: "hsl(var(--chart-3))",
  },
  Paid: {
    label: "Discussion",
    color: "hsl(var(--chart-4))",
  },

} satisfies ChartConfig;
//Invoice//


//Deal//
const chartConfigDeal = {
  visitors: {
    label: "Deals",
  },
  Proposal: {
    label: "Proposal",
    color: "hsl(var(--chart-1))",
  },
  Demo: {
    label: "Demo",
    color: "hsl(var(--chart-3))",
  },
  Discussion: {
    label: "Discussion",
    color: "hsl(var(--chart-4))",
  },
  Decided: {
    label: "Decided",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
//Deal//



interface Lead {
  _id: string;
  status: string;

}
interface Invoice {
  _id: string;
  status: string;
}

interface Deal {
  _id: string;
  status: string;
}



interface CategorizedLeads {
  [key: string]: Lead[];
}

interface CategorizedInvoices {
  [key: string]: Invoice[];
}

interface CategorizedDeals {
  [key: string]: Deal[];
}


//Lead//
const chartData = {
  Proposal: "#2a9d90",
  New: "#e76e50",
  Discussion: "#274754",
  Demo: "#e8c468",
  Decided: "#f4a462",
};
//Lead//


//Invoice//
const chartDataInvoice = {
  Pending: "#2a9d90",
  Unpaid: "#e76e50",
  Paid: "#274754",
};
//Invoice//

//Deal//
const chartDataDeal = {
  Proposal: "#2a9d90",
  Discussion: "#274754",
  Demo: "#e8c468",
  Decided: "#f4a462",
};
//Deal//

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Page() {
  const [selectedChart, setSelectedChart] = useState("Pie Chart");
  const [selectedChartInvoice, setSelectedChartInvoice] = useState("Pie Chart");
  const [selectedChartDeal, setSelectedChartDeal] = useState("Pie Chart");

  const [categorizedLeads, setCategorizedLeads] = useState<CategorizedLeads>({});
  const [categorizedInvoices, setCategorizedInvoices] = useState<CategorizedInvoices>({});
  const [categorizedDeals, setCategorizedDeals] = useState<CategorizedDeals>({});
  const [loading, setLoading] = useState(true);




  //Lead//
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/lead/getAllLeads');
        const result = await response.json();

        // Check if result is an object with data property
        if (!result || !Array.isArray(result.data)) {
          console.error('Invalid data format received:', result);
          return;
        }

        // Categorize leads by status
        const categorized = result.data.reduce((acc: CategorizedLeads, lead: Lead) => {
          if (!acc[lead.status]) {
            acc[lead.status] = [];
          }
          acc[lead.status].push(lead);
          return acc;
        }, {} as CategorizedLeads);

        setCategorizedLeads(categorized);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);
  //Lead//

  //Invoice//
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/invoice/getAllInvoices');
        const result = await response.json();

        // Check if result is an object with data property
        if (!result || !Array.isArray(result.data)) {
          console.error('Invalid data format received:', result);
          return;
        }

        // Categorize invoices by status
        const categorized = result.data.reduce((acc: CategorizedInvoices, invoice: Invoice) => {
          if (!acc[invoice.status]) {
            acc[invoice.status] = [];
          }
          acc[invoice.status].push(invoice);
          return acc;
        }, {} as CategorizedInvoices);

        setCategorizedInvoices(categorized);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);
  //Invoice//

  //Deal//
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/deal/getAllDeals');
        const result = await response.json();

        // Check if result is an object with data property
        if (!result || !Array.isArray(result.data)) {
          console.error('Invalid data format received:', result);
          return;
        }

        // Categorize deals by status
        const categorized = result.data.reduce((acc: CategorizedDeals, deal: Deal) => {
          if (!acc[deal.status]) {
            acc[deal.status] = [];
          }
          acc[deal.status].push(deal);
          return acc;
        }, {} as CategorizedDeals);

        setCategorizedDeals(categorized);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);
  //Deal//




  //Lead Chart//
  const dynamicChartData = useMemo(() => {
    return Object.entries(categorizedLeads).map(([status, leads]) => ({
      browser: status,
      visitors: leads.length,
      fill: chartData[status] || "#ccc",
    }));
  }, [categorizedLeads]);
  //Lead Chart//

  //Invoice Chart//
  const dynamicChartDataInvoice = useMemo(() => {
    return Object.entries(categorizedInvoices).map(([status, invoices]) => ({
      browser: status,
      visitors: invoices.length,
      fill: chartDataInvoice[status] || "#ccc",
    }));
  }, [categorizedInvoices]);
  //Invoice Chart//

  //Deal//
  const dynamicChartDataDeal = useMemo(() => {
    return Object.entries(categorizedDeals).map(([status, deals]) => ({
      browser: status,
      visitors: deals.length,
      fill: chartDataDeal[status] || "#ccc",
    }));
  }, [categorizedDeals]);
  //Deal//




  //Lead//
  const renderChartLead = () => {
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

    if (dynamicChartData.length === 0) {
      return (
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Leads Chart</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
            >
              <PieChart width={600} height={400}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <Pie
                  data={dynamicChartData}
                  dataKey="visitors"
                  nameKey="browser"
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
    }

    if (selectedChart === "Pie Chart") {
      return (
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Pie Chart - Leads</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
            >
              <PieChart width={600} height={400}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <Pie
                  data={dynamicChartData}
                  dataKey="visitors"
                  nameKey="browser"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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
    }

    if (selectedChart === "Radial Chart") {
      return (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Radial Chart - Lead</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[400px]"
            >
              <RadialBarChart
                width={600}
                height={400}
                data={dynamicChartData}
                startAngle={-90}
                endAngle={380}
                innerRadius={30}
                outerRadius={110}
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
    }

    if (selectedChart === "Bar Chart") {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Lead Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart width={600} height={400} data={dynamicChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="browser"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
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
    }
  };
  //Lead//

  //Invoice//
  const renderChartInvoice = () => {
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

    if (dynamicChartDataInvoice.length === 0) {
      return (
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Invoice Chart</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigInvoice}
              className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
            >
              <PieChart width={600} height={400}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <Pie
                  data={dynamicChartDataInvoice}
                  dataKey="visitors"
                  nameKey="browser"
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
    }

    if (selectedChartInvoice === "Pie Chart") {
      return (
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Pie Chart - Invoice</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigInvoice}
              className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
            >
              <PieChart width={600} height={400}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <Pie
                  data={dynamicChartDataInvoice}
                  dataKey="visitors"
                  nameKey="browser"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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
    }

    if (selectedChartInvoice === "Radial Chart") {
      return (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Radial Chart - Invoice</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigInvoice}
              className="mx-auto aspect-square max-h-[400px]"
            >
              <RadialBarChart
                width={600}
                height={400}
                data={dynamicChartDataInvoice}
                startAngle={-90}
                endAngle={380}
                innerRadius={30}
                outerRadius={110}
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
    }

    if (selectedChartInvoice === "Bar Chart") {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Invoice Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigInvoice}>
              <BarChart width={600} height={400} data={dynamicChartDataInvoice}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="browser"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfigInvoice[value as keyof typeof chartConfigInvoice]?.label
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
    }
  };
  //Invoice//

  //Deal//
  const renderChartDeal = () => {
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

    if (dynamicChartDataDeal.length === 0) {
      return (
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Deals Chart</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigDeal}
              className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
            >
              <PieChart width={600} height={400}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <Pie
                  data={dynamicChartDataDeal}
                  dataKey="visitors"
                  nameKey="browser"
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
    }

    if (selectedChartDeal === "Pie Chart") {
      return (
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Pie Chart - Deals</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigDeal}
              className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
            >
              <PieChart width={600} height={400}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <Pie
                  data={dynamicChartDataDeal}
                  dataKey="visitors"
                  nameKey="browser"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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
    }

    if (selectedChartDeal === "Radial Chart") {
      return (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Radial Chart - Deal</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigDeal}
              className="mx-auto aspect-square max-h-[400px]"
            >
              <RadialBarChart
                width={600}
                height={400}
                data={dynamicChartDataDeal}
                startAngle={-90}
                endAngle={380}
                innerRadius={30}
                outerRadius={110}
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
    }

    if (selectedChartDeal === "Bar Chart") {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Deal Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigDeal}>
              <BarChart width={600} height={400} data={dynamicChartDataDeal}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="browser"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfigDeal[value as keyof typeof chartConfigDeal]?.label
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
    }
  };
  //Deal//



  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* Lead */}
            <Grid item xs={4}>
              <Item>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="chart-select-label">Select Chart</InputLabel>
                    <Select
                      labelId="chart-select-label"
                      value={selectedChart}
                      onChange={(e) => setSelectedChart(e.target.value)}
                      label="Select Chart"
                    >
                      <MenuItem value="Pie Chart">Pie Chart</MenuItem>
                      <MenuItem value="Radial Chart">Radial Chart</MenuItem>
                      <MenuItem value="Bar Chart">Bar Chart</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Render Selected Chart */}
                  <div className="mt-4">{renderChartLead()}</div>
                </div>
              </Item>
            </Grid>
            {/* End Lead */}

            {/* Invoice */}
            <Grid item xs={4}>
              <Item>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="chart-select-label">Select Chart</InputLabel>
                    <Select
                      labelId="chart-select-label"
                      value={selectedChartInvoice}
                      onChange={(e) => setSelectedChartInvoice(e.target.value)}
                      label="Select Chart"
                    >
                      <MenuItem value="Pie Chart">Pie Chart</MenuItem>
                      <MenuItem value="Radial Chart">Radial Chart</MenuItem>
                      <MenuItem value="Bar Chart">Bar Chart</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Render Selected Chart */}
                  <div className="mt-4">{renderChartInvoice()}</div>
                </div>
              </Item>
            </Grid>
            {/* End Invoice */}

            {/* Deal */}
            <Grid item xs={4}>
              <Item>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="chart-select-label">Select Chart</InputLabel>
                    <Select
                      labelId="chart-select-label"
                      value={selectedChartDeal}
                      onChange={(e) => setSelectedChartDeal(e.target.value)}
                      label="Select Chart"
                    >
                      <MenuItem value="Pie Chart">Pie Chart</MenuItem>
                      <MenuItem value="Radial Chart">Radial Chart</MenuItem>
                      <MenuItem value="Bar Chart">Bar Chart</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Render Selected Chart */}
                  <div className="mt-4">{renderChartDeal()}</div>
                </div>
              </Item>
            </Grid>
            {/* End Deal */}

            <Grid item xs={6}>
              <Item>4</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>5</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>6</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>7</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>8</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>9</Item>
            </Grid>
          </Grid>
        </Box>
      </SidebarInset>
    </SidebarProvider>
  )
}
