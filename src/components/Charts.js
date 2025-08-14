import React from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import CanvasJSReact from '@canvasjs/charts';
// import {CanvasJSReact, CanvasJS} from 'canvasjs-react-charts';

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;
// const CanvasJS = CanvasJSReact.CanvasJS;

const data = [
  {
    "name": "Jan",
    "pv": 2400,
  },
  {
    "name": "Feb",
    "pv": 1398,
  },
  {
    "name": "Mar",
    "pv": 9800,
  },
  {
    "name": "Apr",
    "pv": 3908,
  },
  {
    "name": "May",
    "pv": 4800,
  },
  {
    "name": "Jun",
    "pv": 3800,
  },
  {
    "name": "Jul",
    "pv": 4300,
  },
  {
    "name": "Aug",
    "pv": 4300,
  },
  {
    "name": "Sep",
    "pv": 4300,
  },
  {
    "name": "Oct",
    "pv": 4300,
  },
  {
    "name": "Nov",
    "pv": 4300,
  },
  {
    "name": "Dec",
    "pv": 4300,
  }
]


export default function Chart() {
  return (
<div class="chart-card">
  <div class="chart-title">Year Register Activities</div>
  <LineChart width= {1200} height={400} data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
  <Line type="linear" dataKey="pv" stroke="#387908" />
</LineChart>
  {/* <div class="chart-placeholder">[Chart Placeholder]</div> */}
</div>
  );
}