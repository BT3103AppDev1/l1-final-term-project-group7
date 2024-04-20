<template>
    <div class="weight-step-recorder">
      <button @click="showPopup = true">Record Data</button>
      
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
  // Add Firebase imports and setup if needed
  
  export default {
    name: 'InputDataPopup',
    setup() {
      const showPopup = ref(false);
      const formData = ref({
        weight: null,
        steps: null
      });
  
      const recordData = () => {
        // Here you would handle the Firebase data submission
        console.log('Data to record:', formData.value);
  
        // After recording to Firebase, you would probably want to hide the popup
        showPopup.value = false;
  
        // Reset formData if necessary
        formData.value = { weight: null, steps: null };
      };
  
      // Return reactive properties and methods
      return { showPopup, formData, recordData };
    }
  };
  </script>
  
  <style scoped>
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
  