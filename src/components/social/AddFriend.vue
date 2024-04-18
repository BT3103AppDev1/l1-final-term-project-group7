<template>
    <div class="add-friend-container">
      <input type="text" v-model="searchQuery" placeholder="Search Username..." class="search-input" @input="searchUsers">
      <button v-show="searchQuery.length > 0" @click="searchUsers">Search</button>
      <ul v-if="searchResults.length > 0">
        <li v-for="user in searchResults" :key="user.id">
          <span>{{ user.username }}</span>
          <button @click="addFriend(user.username)">Add</button>
        </li>
        <li v-if="searchQuery.trim().length > 0">
          <button @click="addFriend(searchQuery)">Add Friend</button>
        </li>
      </ul>
      <div v-else-if="searchQuery.trim().length > 0">No results found.</div>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  
  export default {
    name: 'AddFriend',
  
    data() {
      return {
        searchQuery: '',
        searchResults: [],
      };
    },
  
    methods: {
      async searchUsers() {
        try {
          if (this.searchQuery.trim() === '') {
            this.searchResults = [];
            return; // Exit early if search query is empty
          }
  
          // Query Firestore to search for usernames
          const querySnapshot = await db.collection('usernames').where('title', '==', this.searchQuery).get();
  
          // Map query results to an array
          this.searchResults = querySnapshot.docs.map(doc => ({ id: doc.id, username: doc.data().title }));
        } catch (error) {
          console.error('Error searching for users:', error);
        }
      },
  
      async addFriend(username) {
        this.$emit('friendAdded', username);
      },
    },
  };
  </script>
  
  <style scoped>
  .add-friend-container {
    margin-top: 10px;
  }
  
  .search-input {
    width: 80%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 40px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-top: 5px;
  }
  
  button {
    margin-left: 10px;
  }
  </style>
  