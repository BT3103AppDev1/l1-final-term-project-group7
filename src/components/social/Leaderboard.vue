<template>
    <div class="social-page">
      <div class="leaderboard-container">
        <h2 class="leaderboard-heading">Leaderboard</h2>
        <!-- Add leaderboard content here -->
      </div>
      <div class="achievements">
        <h1 class="achievements-heading">Achievements</h1>
      </div>
    </div>
  </template>
  
  <style scoped>
    .social-page {
      display: flex;
      justify-content: space-between;
    }
  
    .leaderboard-container {
      flex: 1;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 20px;
      margin-right: 10px;
    }
  
    .leaderboard-heading {
      color: #335076; 
      margin-bottom: 10px;
    }
  
    .achievements {
      flex: 2;
    }
  </style>
  