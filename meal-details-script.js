const params = new URLSearchParams(window.location.search);
const mealId = params.get("mealId");

const mealName = document.getElementById("meal-name");
const ingredientList = document.getElementById("ingredientList");
const instructionsList = document.getElementById("instructionsList");
const mealImage = document.getElementById("mealImage");
const videoTutorial = document.getElementById("video-tutorial");

if (mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      // Set meal name
      mealName.textContent = meal.strMeal.toLowerCase();

      // Set image
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealImage.width = 500;

      // Ingredients list with checkboxes
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
          const li = document.createElement("li");

          // Create label span
          const span = document.createElement("span");
          span.textContent = `${ingredient} - ${measure}`;

          // Create checkbox
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.addEventListener("change", () => {
            span.classList.toggle("crossed", checkbox.checked);
          });

          li.appendChild(checkbox);
          li.appendChild(span);
          ingredientList.appendChild(li);
        }
      }

      const rawInstructions = meal.strInstructions.trim();
const instructionsList = document.getElementById("instructionsList");

// Check if it contains numbered steps
const hasNumberedSteps = /^\d+[\.\t]/m.test(rawInstructions);

if (hasNumberedSteps) {
  // Handle numbered instructions
  const lines = rawInstructions.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  lines.forEach(line => {
    const stepText = line.replace(/^\d+[\.\t]\s*/, '');
    const li = document.createElement("li");
    li.textContent = stepText;
    instructionsList.appendChild(li);
  });
} else {
  // Handle paragraph-based instructions by splitting at sentence ends
  const sentences = rawInstructions
    .split(/(?<=\.\s|\.\)|\!\s|\?\s)/g) // split at sentence boundaries
    .map(s => s.trim())
    .filter(s => s.length > 0);

  sentences.forEach(sentence => {
    const li = document.createElement("li");
    li.textContent = sentence;
    instructionsList.appendChild(li);
  });
}


      // YouTube video
      if (meal.strYoutube) {
        videoTutorial.href = meal.strYoutube;
        videoTutorial.target = "_blank";
      } else {
        videoTutorial.style.display = "none";
      }
    });
} else {
  mealName.textContent = "No meal selected.";
}
