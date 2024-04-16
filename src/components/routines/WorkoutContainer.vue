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
    <h2 id="intensity">Intensity: {{ containerIntensity.label }}</h2>
    <h2 id="duration">Duration: {{ totalDuration }} min</h2>
    <ul id="list-exercises">
      <li v-for="(exercise, index) in exercises" :key="index" @click="clickExerciseByName(exercise)">
        {{ exercise }}
        <a v-if="isEditing" @click.stop="deleteExercise(index)" class="delete-exercise">Delete</a>
      </li>
    </ul>
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
    }
  },
  computed: {
    containerIntensity() {
      let result = {
        class: '',
        label: ''
      };

      if (this.totalDuration <= 20) {
        result.class = 'low-intensity';
        result.label = 'Low';
      } else if (this.totalDuration <= 40) {
        result.class = 'medium-intensity';
        result.label = 'Medium';
      } else {
        result.class = 'high-intensity';
        result.label = 'High';
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
      selectedExercise: null
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
      console.log("edit state active")
      this.isEditing = true;
    },
    endEdit() {
      this.isEditing = false;
      this.selectedExercise = ''; // Reset after editing
      this.$emit('update-routine', this.routineName, this.exercises);
      console.log("edit state inactive")
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
}

#routine-name {
  margin: 0px;
}

.routine-img {
  width: 100%;
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
</style>