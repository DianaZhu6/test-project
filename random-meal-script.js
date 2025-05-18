document.getElementById("randomMealBtn").addEventListener("click", function(event) {
    event.preventDefault(); // prevent default anchor behavior

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            window.location.href = `meal-details.html?mealId=${meal.idMeal}`;
        })
        .catch(error => {
            console.error("Failed to fetch random meal:", error);
            alert("Something went wrong. Please try again.");
        });
});
finalProject/no.html