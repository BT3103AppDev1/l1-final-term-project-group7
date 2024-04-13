<template>
  <div class="routines">
    <div id="create-routine">
      <button @click="toggleDropdown">Create Routine</button>
      <select v-if="showDropdown" v-model="selectedExercise">
        <option disabled value="">Select an exercise</option>
        <option v-for="exercise in likedExercises" :key="exercise.id" :value="exercise.id">
          {{ exercise.id }}
        </option>
      </select>
      <button @click="addExerciseToRoutine">Add Exercise</button>
      <button @click="saveRoutine">Save Routine</button>
    </div>
    <!-- Render WorkoutContainer for each saved routine -->
    <WorkoutContainer
      v-for="routine in routines"
      :key="routine.id"
      :routineName="routine.name"
      :routineImage="routine.image"
      :routineDuration="routine.duration"
      :exercises="routine.exercises"
    />
  </div>
</template>
  
<script>
import WorkoutContainer from '@/components/routines/WorkoutContainer.vue';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase';
import { collection, query, addDoc, getDocs } from 'firebase/firestore';

export default {
  name: 'Routines',
  components: {
    WorkoutContainer
  },
  data() {
    return {  
      refreshComp: 0,
      likedExercises: [], // This will store the fetched exercises
      showDropdown: false, // Controls the visibility of the dropdown
      routines: [], // Stores all saved routines
      currentRoutine: [], // Stores the current routine being built
      selectedExercise: null // The currently selected exercise to add to the routine
    }
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown && this.likedExercises.length === 0) {
        this.fetchLikedExercises();
      }
    },
    async fetchLikedExercises() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'users', user.uid, 'likedExercises'));
        const querySnapshot = await getDocs(q);
        this.likedExercises = querySnapshot.docs.map(doc => ({
          id: doc.id, // The document ID is the exercise name
        }));
      }
    },
    addExerciseToRoutine() {
      if (this.selectedExercise) {
        this.currentRoutine.push(this.selectedExercise);
        console.log("added " + this.selectedExercise);
        console.log(this.currentRoutine);
        this.selectedExercise = null; // Reset the selection
      }
    },
    async saveRoutineToFirestore(routine) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        // Define the document reference
        const routinesRef = collection(db, 'users', user.uid, 'routines');
        // Add a new document with a generated ID
        await addDoc(routinesRef, {
          exercises: routine,
          createdAt: new Date() // optional: store creation date
        });
        console.log("Routine saved to Firestore");
      } else {
        console.log("Error saving routines.");
      }
    },
    saveRoutine() {
      if (this.currentRoutine.length) {
        this.routines.push(this.currentRoutine);
        console.log("routines: " + this.routines)
        this.saveRoutineToFirestore(this.currentRoutine); // Save to Firestore
        this.currentRoutine = []; // Reset the current routine
      }
    },
    async fetchRoutines() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const routinesRef = collection(db, 'users', user.uid, 'routines');
        const querySnapshot = await getDocs(routinesRef);
        this.routines = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Routines fetched from Firestore");
      }
    },
  },
  created() {
    this.fetchLikedExercises();
    this.fetchRoutines(); // Fetch routines when the component is created
    console.log("fetched liked exercises and routines");
  }
}
</script>

<style scoped>
#create-routine {
  padding: 20px;
}

#create-routine .child {
  margin: 20px;
}
</style>