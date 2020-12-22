import React from "react";
import ReactApexChart from "react-apexcharts";

function LineChart(dataLike:any, dataView:any, height:any, width: any) {
  const series = [
    {
      name: "View",
      type: "line",
      data: dataLike
    //   data: [20, 55, 31, 47, 31, 43, 25, 41, 31, 47],
    },
    {
      name: "Like",
      type: "line",
      data: dataView
      //data: [55, 80, 45, 100, 43, 30, 37, 52, 44, 61],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    toolbar: {
      show: false
    }
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: [0.35, 1],
    },
    labels: [
      "Bài viết số 1",
      "Bài viết số 2",
      "Bài viết số 3",
      "Bài viết số 4",
      "Bài viết số 5",
      "Bài viết số 6",
      "Bài viết số 7",
      "Bài viết số 8",
      "Bài viết số 9",
      "Bài viết số 10",
    ],
    markers: {
      size: 0,
    },
    yaxis: [
      {
        title: {
          text: "View",
          style: {
            color: "#9ccff7",
            fontFamily: "Quicksand",
            fontSize: "20",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Like",
          style: {
            color: "#03e397",
            fontFamily: "Quicksand",
            fontSize: "20",
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: any) {
          if (typeof y !== "undefined") {
            return y.toFixed(0);
          }
          return y;
        },
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={height}
        width={width}
      />
    </div>
  );
}

export default LineChart;
