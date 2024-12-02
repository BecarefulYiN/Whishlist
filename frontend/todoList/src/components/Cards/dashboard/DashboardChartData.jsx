import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { useNavigate } from 'react-router-dom';

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
        enabled: true,
        formatter: (val, opts) => {
          const labels = ["Total Count", "Complete", "Incomplete", "Deleted"];
          return `${labels[opts.seriesIndex]}: ${val.toFixed(1)}%`;
        },
      },
      labels: ["Total Count", "Complete", "Incomplete", "Deleted"],
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: true,
        position: "bottom",
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

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className="w-1/2 h-auto relative ">
      {totalCount !== 0 ? (
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                Tracking your wishlist state
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize your data in a simple way
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 mb-9 grid place-items-center px-2">
            <Chart {...chartConfig} />
          </CardBody>


        </Card>
      ) : (
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                Tracking your wishlist state
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize your data in a simple way
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 mb-9 grid place-items-center h-80 px-2">
            <p className="text-center text-gray-600">
              Let's start creating your Wishlist <br/>
              Let make then come true
            </p>
          </CardBody>

        </Card>

      )}

      <div
        onClick={handleNavigate}
        className='absolute bottom-2 right-9 hover:text-blue-gray-600'>
        Go to create your wishlist <EastRoundedIcon />
      </div>
    </div>
  );
};

export default DashboardChartData;
