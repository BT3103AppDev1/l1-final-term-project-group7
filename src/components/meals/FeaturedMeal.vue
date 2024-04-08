<template>
	<div>

		<div class="clickable" @click="handleClick">
			<h1>{{ "Featured: " + mealInfo['strMeal'] }}</h1>
		</div>

		<div class="overlay" v-if="showOverlay">
			<div class="container">
				<div class="topContainer">
					<h1 style="font-size: 1.8em;">{{ mealInfo['strMeal'] }}</h1>
					<div class="buttonsContainer">
						<button @click.prevent="hidePopup" class="clickable-img-wrapper">
							<img src="@/assets/Cross-Icon.png" alt="crossButton" class="icon">
						</button>
					</div>
				</div>
				<hr>

				<div class="contentContainer">
					<div class="recipeContainer">
						<img :src="mealInfo['strMealThumb']" alt="crossButton" class="food">
						<h3>Ingredients</h3>
						<ul>
							<li class=ingredList v-for="ingredient in ingredients">
								<p class=ingredList>{{ ingredient }} </p>
							</li>
						</ul>
						<h3>Instructions</h3>
						<pre>{{ mealInfo['strInstructions'] }}</pre>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	name: 'FeaturedMeal',
	props: ['mealInfo'],
	data() {
		return {
			showOverlay: false,
		};
	},
	computed: {
		ingredients() {
			var ingredList = []
			for (let i = 1; i <= 20; i++) {
				var ingredientKey = "strIngredient" + i
				var measurementKey = "strMeasure" + i
				if (this.mealInfo[ingredientKey]) {
					var measuredIngredient = this.mealInfo[measurementKey] + " " + this.mealInfo[ingredientKey]
					ingredList.push(measuredIngredient)
				} else {
					break;
				}
			}
			return ingredList;
		}
	},
	methods: {
		handleClick() {
			this.showOverlay = !this.showOverlay;
		},
		hidePopup() {
			this.showOverlay = !this.showOverlay;
		}
	}
}
</script>

<style scoped>
.clickable {
	display: flex;
	margin: 0px;
	padding: 0px;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	align-self: stretch;
}
.container {
	position: relative;
	background-color: #dfe2e7;
	width: 500px;
	height: 500px;
	padding-left: 1em;
	border-radius: 10px;
}

.topContainer {
	display: inline-block;
	width:85%;

}
.contentContainer {
	height: 70%;
	overflow: auto;
}
.buttonsContainer {
	position: absolute;
	top: 1%;
	right: 1%;
}

.clickable-img-wrapper {
	background-color: rgba(255, 255, 255, 0);
	border: none;
	transition: transform .2s;
	/* Animation */
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
	z-index: 9999;
	cursor: initial;
	/* Ensure popup is above content */
}
pre {
	white-space: pre-wrap;
	font-size: medium;
}
.ingredList {
	margin: 0;
	padding: 0;
}
.food {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 70%;
}
</style>