<template>
  <div class="workout-info">
    <div id="title-row">
        <h1 id="workout-title">Lateral Pulldown</h1>
        <img src="@/assets/Like-Icon.webp" alt="likeIcon" class="icon">
        <img src="@/assets/BackArrow-Icon.webp" alt="backArrow" class="icon">
      </div>
    <div class="exercise-content">
      <img src="@/assets/Left-Icon.webp" alt="leftIcon" class="arrows" id="left">
      <div id="img-and-desc">
        <div class="exercise">
          <img src="@/assets/LateralPulldown.webp" alt="pulldown">
        </div>
        <div id="description">
          <ol>
            <li>Grasp the bar with a wide grip with an overhand, knuckles-up grip.</li>
            <li>Pull the bar down until it's approximately level with the chin.</li>
            <li>Squeeze the shoulder blades together while maintaining square shoulders.</li>
            <li>Slowly return the bar to the starting position while controlling its gradual ascent.</li>
          </ol>
        </div>
      </div>
      <img src="@/assets/Right-Icon.webp" alt="rightIcon" class="arrows" id="right">
    </div>
  </div>
</template>

<script>
export default {
  name: 'workoutInfo',
  data() {
    return {
      
    };
  }
}
</script>

<style scoped>
  .arrows {
    height: 64px;
    margin: 10px;
    padding-bottom: 50px;
  }

  .icon {
    margin: 0px 15px;
  }

  #title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #workout-title {
    margin: 5px;
    flex-grow: 1;
  }

  .exercise-content {
    display: flex;
    align-items: center;
  }

  #img-and-desc {
    display: flex;
    flex-direction: column;
    padding: 20px;
    /* width: 100%; */
  }

  .exercise {
    display: flex;
    justify-content: center;
  }

  .exercise img {
    width: auto;
    max-height: 50vh;
  }

  #description {
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }

  .workout-info {
    background-color: #dfe2e7;
    border-radius: 15px;
    margin: 50px auto; /* Center the .workout-info horizontally */
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* min-width: 300px; */
  }
</style>