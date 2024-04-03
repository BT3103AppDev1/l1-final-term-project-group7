<template>
    <Bar 
      id="netCalories_widget"
      :data="chartData"
      :options="chartOptions" />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
  
  // Register the components from Chart.js
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)
  
  export default {
    name: "netCaloriesWidget",
    components: {
       Bar
    },
    data() {
      return {
        chartData: {
          labels: ['16/03', '17/03', '18/03', '19/03', '20/03', '21/03', '22/03'],
          datasets: [
            {
              label: 'Net Calories',
              backgroundColor: 'rgba(0, 128, 128, 0.7)', 
              borderColor: '#008080',
              data: [100, -400, 124, -254, -327, -104, -349] 
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display:false,
            },
            title: {
              display: true,
              text: 'Net Calories',
              color: 'Black'
            }
          },
          scales: {
            x: {
              ticks: {
                color: 'Black' 
              },
              grid: {
                display: false 
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: 'Black' 
              },
            }
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
    #netCalories_widget {
    background-color: #dfe2e7;
    border-radius: 15px;   
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  </style>
  