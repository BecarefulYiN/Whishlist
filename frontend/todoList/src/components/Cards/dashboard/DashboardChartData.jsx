import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const DashboardChartData = ({ totalCount, complete, incomplete, deleted }) => {

  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: [totalCount, complete, incomplete, deleted],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val}`,
        },
        custom: function ({ seriesIndex, series, dataPointIndex, w }) {

          const labels = ["Total Count", "Complete", "Incomplete", "Deleted"];
          return `
            <div style="padding: 10px;">
              <strong>${labels[seriesIndex]}</strong><br>
              Value: ${series[seriesIndex]}
            </div>
          `;
        }
      },
    },
  };

  return (
    <div className="w-1/2">
      {totalCount !== 0 ? (
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Pie Chart
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize your data in a simple way using the
                <span className="font-bold"> Material Tailwind</span> chart plugin.
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 grid place-items-center px-2">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      ) : (
        <Card>
          <p className="text-center text-gray-600">
            Let's start creating your Wishlist
          </p>
        </Card>

      )}
    </div>
  );
};

export default DashboardChartData;
