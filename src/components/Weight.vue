<template>
    <Line
      id="weight_widget"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
  
  export default {
    name: 'weightWidget',
    components: { Line },
    data() {
      return {
        chartData: {
        labels: ['16/03', '17/03', '18/03', '19/03', '20/03', '21/03', '22/03'],
        datasets: [
            {
            backgroundColor: 'rgba(0, 128, 128, 0.5)', // transparency for the point backgroun,
            borderColor: '#008080',
            data: [65.3, 65.1, 64.7, 65, 65.5, 65.2,65],
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
                    text: 'Weight (kg)',
                    color: 'white' 
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        display: false 
                    }
                },
                y: {
                    ticks: {
                        color: 'white' 
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' 
                    }
                }
            }
        },
        mounted() {
            console.log('mount weight widget')
        }
      }
    }
  }
</script>

<style scoped>
#weight_widget {
  background-color: #404b5a;
  border-radius: 15px;   
  padding: 20px;          
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow for depth*/
}
</style>
