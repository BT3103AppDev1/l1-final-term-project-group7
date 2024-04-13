<template>
    <Bar 
      id="netCalories_widget"
      ref="chartRef"
      :data="chartData"
      :options="chartOptions" />
  </template>
  
  <script>
  import { onMounted, watch, ref, reactive } from 'vue';
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { db } from '@/firebase';
  import { collection, query, orderBy, getDocs } from 'firebase/firestore';
  import firebaseApp from '@/firebase';

  // Get a reference to the auth service
  const auth = getAuth(firebaseApp);
  
  // Register the components from Chart.js
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)
  
  export default {
    name: "netCaloriesWidget",
    components: {
       Bar
    },
    setup() {
      const chartData = reactive({
        labels: [], // Will be populated with dates
        datasets: [{
          backgroundColor: 'rgba(0, 128, 128, 0.7)',
          borderColor: '#008080',
          data: [], // Will be populated with step data
          tension: 0.3,
        }],
      });

      const chartOptions = reactive({
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
            }
          }
        }
      });
    
      const chartRef = ref(null);

      watch(chartData, (newData) => {
        const chartInstance = chartRef.value.chart;
        chartInstance.data = newData;
        chartInstance.update();
      });

      const fetchStepsData = async () => {
        const user = auth.currentUser;
        if (user) {
            // Reference to the user's steps collection
            const stepsCollectionRef = collection(db, 'users', user.uid, 'calories');

            // Query documents sorted by date
            const q = query(stepsCollectionRef, orderBy("Date", "asc"));
            const querySnapshot = await getDocs(q);

            // Reset chart data before adding new data
            chartData.labels = [];
            chartData.datasets[0].data = [];

            // Populate chart data with steps from Firestore
            querySnapshot.forEach(doc => {
              console.log(chartData.labels)
              chartData.labels.push(doc.data().Date);
              chartData.datasets[0].data.push(doc.data().Consumed - doc.data().Burnt);
            });
        } else {
            // User is not signed in
            console.log("User is not signed in to fetch steps data.");
        }
        console.log(chartData.datasets[0].data); // Debug log the final dataset array
      };

      onMounted(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            fetchStepsData();
          }
        });
      });

      return {
        chartData,
        chartOptions,
        chartRef,
      };
    },
  }
  </script>
  
  <style scoped>
    #netCalories_widget {
    background-color: #dfe2e7;
    border-radius: 15px;   
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  </style>
  