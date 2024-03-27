<template>
    <Line
      id="steps_widget"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
  
  export default {
    name: 'stepsWidget',
    components: { Line },
    data() {
      return {
        chartData: {
        labels: ['16/03', '17/03', '18/03', '19/03', '20/03', '21/03', '22/03'],
        datasets: [
            {
            label: 'Total number of steps',
            backgroundColor: 'rgba(0, 128, 128, 0.5)', // Teal with some transparency for the point background
            borderColor: '#008080',
            data: [9807, 10872, 9506, 8574, 10382, 9746, 11358],
            tension: 0.3 // smoothing
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
                    text: 'Daily Step Count',
                    color: 'Black' // Adjust the title color
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'Black' // Adjust the x-axis labels color
                    },
                    grid: {
                        display: false // Adjust the color of the x-axis grid lines
                    }
                },
                y: {
                    ticks: {
                        color: 'Black' // Adjust the y-axis labels color
                    },
                    grid: {
                        color: 'rgba(0,0,0, 0.1)' // Adjust the color of the y-axis grid lines
                    }
                }
            }
        },
        mounted() {
            console.log('mount steps widget')
        }
      }
    }
  }
</script>

<style scoped>
#steps_widget {
  background-color: #dfe2e7;
  border-radius: 15px;       
  padding: 20px;            
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow for depth*/
}
</style>
