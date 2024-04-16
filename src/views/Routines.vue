<template>
  <div class="routines">
    <h2 id="create-routine-title">Create Routine:</h2>
    <div id="create-routine">
      <input type="text" v-model="newRoutineName" placeholder="Enter Routine Name" />
      <select v-model="selectedExercise">
        <option disabled value="">Select an exercise</option>
        <option v-for="exercise in likedExercises" :key="exercise.id" :value="exercise.id">
          {{ this.$capitalizeFirstLetter(exercise.id) }}
        </option>
      </select>
      <button @click="addExerciseToRoutine">Add Exercise</button>
      <button @click="saveRoutine">Save Routine</button>
    </div>
    <!-- Render WorkoutContainer for each saved routine -->
    <div id="workout-container-grid">
      <WorkoutContainer
        v-for="routine in routines"
        :key="routine.id"
        :routineName="routine.name"
        :routineImage="routine.image"
        :routineDuration="routine.duration"
        :exercises="routine.exercises"
        @delete-routine="deleteRoutine(routine.id)"
      />
    </div>
  </div>
</template>
  
<script>
import WorkoutContainer from '@/components/routines/WorkoutContainer.vue';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase';
import { collection, query, addDoc, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

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
      selectedExercise: null, // The currently selected exercise to add to the routine
      newRoutineName: '', // Data property for the new routine name
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
      } else {
        alert("You have not selected an exercise.")
      }
    },
    async saveRoutineToFirestore(exercises) {
      const auth = getAuth();
      const user = auth.currentUser;
      const routineRef = doc(db, 'users', user.uid, 'routines', this.newRoutineName);
      await setDoc(routineRef, {
        name: this.newRoutineName,
        exercises: exercises, // Ensure this is just an array
        createdAt: new Date()
      }, { merge: true });
      console.log(`Routine '${this.newRoutineName}' saved to Firestore`);
      this.newRoutineName = '';
    },
    saveRoutine() {
      if (this.currentRoutine.length && this.newRoutineName) {
        this.saveRoutineToFirestore(this.currentRoutine); // Pass the array of exercises
        // Add to local routines array if needed...
        this.currentRoutine = []; // Reset for the next input
        this.newRoutineName = ''; // Reset the routine name
        this.fetchRoutines(); // Update the display
      } else {
        alert("Routine name or exercises are missing.");
      }
    },
    async fetchRoutines() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const routinesRef = collection(db, 'users', user.uid, 'routines');
          const querySnapshot = await getDocs(routinesRef);
          this.routines = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            exercises: doc.data().exercises,
          }));
          console.log("Routines fetched from Firestore");
        } else {
          throw new Error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error fetching routines:", error.message);
      }
    },
    async deleteRoutine(routineId) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid, 'routines', routineId);
          await deleteDoc(docRef);
          console.log(`Deleted routine ${routineId}`);
          this.fetchRoutines(); // Refresh the list after deletion
        } else {
          throw new Error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Failed to delete routine:", error.message);
      }
  }
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
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

input {
  border-radius: 20px;
  border-width: 0px;
  padding: 5px 50px 5px 10px;
}

select {
  border-radius: 20px;
  border-width: 0px;
  padding: 5px 50px 5px 10px; 
}

button {
  text-wrap: nowrap;
  border-radius: 20px;
  border-width: 0px;
  padding: 5px 10px;
  background-color: white;
}

#workout-container-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0px 15px;
}

.container {
  min-width: 250px;
}
</style>