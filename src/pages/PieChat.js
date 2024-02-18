import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fff;
  min-width: 500px;
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 30px auto;
`;

ChartJS.register(ArcElement, Tooltip, Legend);

const BloodPieChart = () => {
  const data = {
    labels: ["A형", "B형", "AB형", "O형"],
    datasets: [
      {
        data: [2441, 2312, 1031, 1233],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCD56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCD56", "#4BC0C0"],
      },
    ],
  };

  return (
    <Container>
      <Pie data={data} />;
    </Container>
  );
};

export default BloodPieChart;
