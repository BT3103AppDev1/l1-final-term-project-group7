<template>
  <div class="container" :class="containerIntensity.class">
    <div id="top-row">
      <h1 id="routine-name">{{ routineName }}</h1>
      <div id="icon-row">
        <a @click="beginEdit" href="#" v-if="!isEditing" class="clickable-img-wrapper">
          <img src="@/assets/Edit-Icon.png" alt="Edit Routine" class="icon">
        </a>
        <a @click="endEdit" href="#" v-if="isEditing" class="clickable-img-wrapper">
          <img src="@/assets/Save-Icon.png" alt="Save Changes" class="icon">
        </a>
        <a @click="deleteRoutine" href="#" class="clickable-img-wrapper">
          <img src="@/assets/Cross-Icon.png" alt="Delete Routine" class="icon">
        </a>
      </div>
    </div>
    <img :src=containerIntensity.image :style="{width : '100%'}">
    <h2>
      Intensity: {{ containerIntensity.label }}
      <br>
      Duration: {{ totalDuration }} min
    </h2>
    <ul id="list-exercises">
      <li v-for="(exercise, index) in exercises" :key="index" @click="clickExerciseByName(exercise)">
        {{ exercise }}
        <a v-if="isEditing" @click.stop="deleteExercise(index)" class="delete-exercise">Delete</a>
      </li>
    </ul>

    <!-- Edit Interface -->
    <div v-if="isEditing">
      <select v-model="selectedExercise">
        <option disabled value="">Select an exercise</option>
        <option v-for="exercise in likedExercises" :key="exercise.id" :value="exercise.id">
          {{ this.$capitalizeFirstLetter(exercise.id) }}
        </option>
      </select>
      <button @click="addExercise">Add Exercise</button>
    </div>
    <div id="loading-msg" v-if="loading" class="overlay">Loading...</div>

    <!-- WorkoutInfo Pop-Up -->
    <div v-if="showWorkoutInfo && selectedExercise" class="overlay">
      <WorkoutInfo
        :showWorkout="showWorkoutInfo"
        :exerciseName="selectedExercise.name"
        :exerciseDifficulty="selectedExercise.difficulty"
        :exerciseType="selectedExercise.type"
        :exerciseSteps="selectedExercise.instructions"
        @close="showWorkoutInfo = false"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import WorkoutInfo from '@/components/workouts/WorkoutInfo.vue';

export default {
  name: 'WorkoutContainer',
  components: {
    WorkoutInfo
  },
  props: {
    routineName: String,
    routineImage: String,
    routineDuration: String,
    exercises: {
      type: Array,
      default: () => ([]),
    },
    likedExercises: {
    type: Array,
    default: () => ([]),
    },
    isEditingActive: Boolean,
  },
  computed: {
    containerIntensity() {
      let result = {
        class: '',
        label: '',
        image: ''
      };

      if (this.totalDuration <= 20) {
        result.class = 'low-intensity';
        result.label = 'Low';
        result.image = 'src/assets/Low-Intensity-Workout.webp';
      } else if (this.totalDuration <= 40) {
        result.class = 'medium-intensity';
        result.label = 'Medium';
        result.image = 'src/assets/Medium-Intensity-Workout.webp';
      } else {
        result.class = 'high-intensity';
        result.label = 'High';
        result.image = 'src/assets/High-Intensity-Workout.webp';
      }
      return result;
    },
    totalDuration() {
      return this.exercises.length * 10;
    }
  },
  data() {
    return {
      isEditing: false,
      selectedExercise: '',
      refreshComp: 0,
      loading: false,
      error: null,
      showWorkoutInfo: false,
    }
  },
  methods: {
    change() {
      this.refreshComp += 1
    },
    deleteRoutine() {
      this.$emit('delete-routine', this.routineName);
      console.log("routine delete event emitted");
    },
    async clickExerciseByName(name) {
      this.exerciseName = name;
      this.loading = true;
      this.$emit('exerciseSelected', this.exerciseName);
      this.$emit('loading', true);

      const apiURL = `https://api.api-ninjas.com/v1/exercises?name=${name}`;
      const apiKey = 'ZoF/oFeYxXdYbJQNbzTcuw==PEEEQXeqEp2q3vxJ';

      try {
        console.log('Calling API for exercise name:', name);
        const response = await axios.get(apiURL, {
          headers: {
            'X-Api-Key': apiKey
          }
        });

        console.log('API response:', response.data);
        if (response.data.length > 0) {
          this.selectedExercise = response.data[0];
          this.showWorkoutInfo = true;
        } else {
          this.error = "No exercise found.";
        }
        this.$emit('exerciseList', response.data);
        this.loading = false;
      } catch (error) {
        console.error('Error: ', error.response ? error.response.data : error.message);
        this.loading = false;
        this.error = error.response ? error.response.data : error.message;
      }
    },
    beginEdit() {
      if (this.isEditingActive) {
        // If editing is active elsewhere, log the attempt and stop the process
        console.log("Another routine is currently being edited.");
        alert("Another routine is already being edited. Please save or cancel the current changes before editing another routine.");
        return; // Stop the edit method from proceeding
      }
      this.isEditing = true;
      this.$emit('editing-changed', true);
      console.log("Edit state active");
    },
    endEdit() {
      this.isEditing = false;
      this.$emit('editing-changed', false);
      this.$emit('update-routine', this.routineName, this.exercises);
      console.log("Edit state inactive");
    },
    addExercise() {
      if (this.selectedExercise) {
        this.exercises.push(this.selectedExercise);
        console.log("exercise added")
      }
    },
    deleteExercise(index) {
      this.exercises.splice(index, 1);
      console.log("exercise deleted")
    }
  }
}
</script>

<style scoped>
.container {
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 25%;
}

.low-intensity {
  background-color: #8ec58e; /* Green for low intensity */
}

.medium-intensity {
  background-color: #ffc272; /* Yellow for medium intensity */
}

.high-intensity {
  background-color: #ff9385; /* Red for high intensity */
}

#top-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

#routine-name {
  margin: 0px;
}

.routine-img {
  width: 100%;
}

ul {
  margin-top: 0px;
}

li {
  font-size: 1em;
  cursor: pointer;
}

#loading-msg {
  font-size: 2em;
  font-weight: bold;
  color: #dfe2e7;
}

.overlay {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; /* Ensure popup is above other content */
}

#icon-row {
  display: flex;
  gap: 10px;
  justify-content: right;
}

select {
  border-radius: 20px;
  border-width: 0px;
  padding: 5px 50px 5px 10px; 
  width: 100%;
  margin-bottom: 15px
}

button {
  text-wrap: nowrap;
  border-radius: 20px;
  border-width: 0px;
  padding: 5px 10px;
  background-color: white;
}

h2 {
  margin: 0px
}
</style>