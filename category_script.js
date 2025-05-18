const categoryList = document.getElementById('category-list');
const randomCategoryBtn = document.getElementById('random-category-button');
let categories = [];

// Fetch and display categories
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(res => res.json())
  .then(data => {
    categories = data.categories;

    categories.forEach(cat => {
      const link = document.createElement("a");
      link.href = `mealList.html?category=${encodeURIComponent(cat.strCategory)}`;
      link.textContent = cat.strCategory;
      link.classList.add("list-link");
      categoryList.appendChild(link);
    });
  });

// Random category button click
randomCategoryBtn.addEventListener("click", () => {
  if (categories.length > 0) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomIndex].strCategory;
    window.location.href = `mealList.html?category=${encodeURIComponent(randomCategory)}`;
  }
});