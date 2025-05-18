document.getElementById("searchBtn").addEventListener("click", function () {
    const query = document.getElementById("searchInput").value.trim();
    if (query === "") {
        alert("Please enter a meal name.");
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals && data.meals.length > 0) {
                const mealId = data.meals[0].idMeal;
                window.location.href = `meal-details.html?mealId=${mealId}`;
            } else {
                alert("Meal not found. Try another one!");
            }
        })
        .catch(error => {
            console.error("Error fetching meal:", error);
            alert("Something went wrong. Please try again.");
        });
});