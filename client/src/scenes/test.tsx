import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class TEST extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      series: [
        {
          data: [21, 22, 10, 28, 16, 21, 13, 30],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (char: any, w: any, e: any) {
              // console.log(chart, w, e)
            },
          },
        },
        colors: [
          "#d830eb",
          "#6d848e",
          "#8b75d7",
          "#267ec3",
          "#26e7a6",
          "#febc3b",
          "#ff6178",
        ],
        plotOptions: {
          bar: {
            columnWidth: "65%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            "John",
            ["Jake", "Williams"],
            "Amber",
            ["Peter", "Brown"],
            ["Mary", "Evans"],
            ["David", "Wilson"],
            ["Lily", "Roberts"],
          ],
          labels: {
            style: {
              colors: [
                "#d830eb",
                "#46b3a9",
                "#6d848e",
                "#8b75d7",
                "#267ec3",
                "#26e7a6",
                "#febc3b",
                "#ff6178",
              ],
              fontSize: "12px",
            },
          },
        },
      },
    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={(this.state as any).options}
          series={(this.state as any).series}
          type="bar"
          height={350}
          width={700}
        />
      </div>
    );
  }
}

export default TEST;
