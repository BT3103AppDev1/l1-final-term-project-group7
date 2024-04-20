<template>
    <div class="weight-step-recorder">
      <button class='button-record' @click="showPopup = true">Record Data</button>
      
      <div v-if="showPopup" class="popup">
        <div class="popup-content">
          <h2>Record Daily Data</h2>
  
          <label for="weight">Weight (kg):</label>
          <input type="number" id="weight" v-model="formData.weight">
  
          <label for="steps">Step Count:</label>
          <input type="number" id="steps" v-model="formData.steps">
  
          <button @click="recordData">Submit</button>
          <button @click="showPopup = false">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { db } from '@/firebase';
  import { doc, setDoc } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  
  export default {
    name: 'InputDataPopup',
    setup() {
      const showPopup = ref(false);
      const formData = ref({
        weight: null,
        steps: null
      });
  
      const recordData = async () => {
        const auth = getAuth();
        const user = auth.currentUser; 
        if (user) {
          const today = new Date().toISOString().slice(0, 10);
          const weightDocRef = doc(db, 'users', user.uid, 'weights', today);
          const stepsDocRef = doc(db, 'users', user.uid, 'steps', today);
          const weightDataToWrite = {
            date: today,
            weight: formData.value.weight
          };

          const stepsDataToWrite = {
            date: today,
            steps: formData.value.steps
          };
          
          try {
            // Write the data to Firestore
            await setDoc(weightDocRef, weightDataToWrite);
            await setDoc(stepsDocRef, stepsDataToWrite);
            console.log('Data recorded successfully');
            
            // Close the popup and reset the form
            showPopup.value = false;
            formData.value = { weight: null, steps: null };
          } catch (error) {
            console.error('Error recording data to Firestore:', error);
          }

        } else {
            console.log('No user signed in')
        }
      };
      // Return reactive properties and methods
      return { showPopup, formData, recordData };
    }
  };
  </script>
  
  <style scoped>
  .button-record{
    background-color: #0c457e; /* Dark blue color */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px; 
    font-weight: bold;
    font-size: 1.75rem;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 70%;
  }

  .button-record:hover {
    background-color: #002244; /* A slightly darker blue on hover */
  }
  
  .button-record:active, .button-import:focus {
    outline: none; 
    box-shadow: 0 0 0 2px #0055cc; 
  }
  .popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 2; /* Higher z-index to be above the overlay */
  }
  
  /* Add more styles as needed */
  </style>
  