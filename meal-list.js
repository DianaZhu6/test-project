const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const mealsList = document.getElementById("mealsList");
    const randomMealBtn = document.getElementById("random-meal-button");

    let mealsInCategory = [];

    // Fetch meals in the selected category
    if (category) {
        document.getElementById("pageTitle").textContent = category.toLowerCase();

      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`)
        .then(res => res.json())
        .then(data => {
          mealsInCategory = data.meals;
          mealsInCategory.forEach(meal => {
            const link = document.createElement("a");
            link.href = `meal-details.html?mealId=${meal.idMeal}`; // Use mealId here
            link.textContent = meal.strMeal; // Display meal name
            link.classList.add("list-link");
            mealsList.appendChild(link);
          });
        });
    }

    // Random meal within category
    randomMealBtn.addEventListener("click", () => {
      if (mealsInCategory.length > 0) {
        const randomIndex = Math.floor(Math.random() * mealsInCategory.length);
        const randomMeal = mealsInCategory[randomIndex];
        window.location.href = `meal-details.html?mealId=${randomMeal.idMeal}`;
      }
    });