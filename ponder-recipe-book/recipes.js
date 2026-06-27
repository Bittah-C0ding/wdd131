// Made by Adrian Hernandez

const recipes = [
    {
        author: 'Provo High Culinary Students',
        cookTime: '30 Min',
        tags: ['Waffles', 'Sweet Potato', 'Side'],
        description: 'Savory waffles made with Sweet potato with a hint of Ginger',
        image: './images/sweet-potato-waffles.jpg',
        name: 'Sweet Potato Waffles',
        recipeYield: '6 waffles',
        rating: 4
    },
    {
        author: 'Shane Thompson',
        cookTime: '20 min',
        tags: ['Chicken', 'Entree'],
        description: 'Delicious quick and easy creamy rice dish. The mustard, mushrooms, and lemon all blend together wonderfully',
        image: './images/escalopes-de-poulet-a-la-creme.jpg',
        name: 'Escalope de Poulet a la Creme with steamed green beans',
        recipeYield: '3 servings',
        rating: 4.5
    },
    {
        author: 'Shane Thompson',
        cookTime: '30 min',
        tags: ['Potatoes', 'Side'],
        description: 'Easy and delicious oven roasted potatoes that go great with almost anything.',
        image: './images/roasted-potatoes.jpg',
        name: 'Oven Roasted Potato Slices',
        recipeYield: '',
        rating: 4
    },
    {
        author: 'Shane Thompson',
        cookTime: '20 min',
        tags: ['Southwest', 'Entree'],
        description: 'Black beans and tomatoes served over a bed of rice. Top with cheese and scoop up with tortilla chips for maximum enjoyment.',
        image: './images/black-beans-and-rice.jpg',
        name: 'Black Beans and Rice',
        recipeYield: '4 servings',
        rating: 3
    },
    {
        author: 'Shane Thompson',
        cookTime: '30 min',
        tags: ['Chicken', 'Entree', 'Indian'],
        description: 'Quick and easy Chicken curry recipe made with easy to find ingredients.',
        image: './images/chicken-curry.jpg',
        name: 'Chicken Curry',
        recipeYield: '5 servings',
        rating: 5
    },
    {
        author: 'Shane Thompson',
        cookTime: '11 min',
        tags: ['Dessert'],
        description: 'Delicious soft chocolate chip cookies with coconut.',
        image: './images/chocolate-chip-cookies.jpg',
        name: 'Chocolate Chip Cookies',
        recipeYield: '8 dozen',
        rating: 5
    },
    {
        author: 'Ester Kocht',
        cookTime: '45 min',
        tags: ['Dessert', 'German'],
        description: "This gooseberry cake with crumble is easy to follow, a bit tart and not too sweet. Made up of a cake base, filled with fresh gooseberries and vanilla cream and finished off with crumble.",
        image: './images/german-gooseberry-cake.jpg',
        name: 'Gooseberry Cake with Vanilla Cream and Crumble',
        recipeYield: '12 servings',
        rating: 5
    },
    {
        author: 'AllRecipes',
        cookTime: '45 min',
        tags: ['Dessert'],
        description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
        image: './images/apple-crisp.jpg',
        name: 'Apple Crisp',
        recipeYield: '12 servings',
        rating: 4
    }
];

function getTags(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function getRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating
            ? '<span class="star" aria-hidden="true">⭐</span>'
            : '<span class="star-empty" aria-hidden="true">☆</span>';
    }
    return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">${stars}</span>`;
}

function renderRecipes(recipeList) {
    const recipeListEl = document.querySelector('#recipe-list');
    if (recipeList.length === 0) {
        recipeListEl.innerHTML = '<p class="no-results">No recipes found. Try a different search.</p>';
        return;
    }
    recipeListEl.innerHTML = recipeList.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.name}">
            </div>
            <div class="recipe-content">
                <div class="tags">${getTags(recipe.tags)}</div>
                <h2>${recipe.name}</h2>
                ${getRating(recipe.rating)}
                <p class="description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.cookTime}</span>
                    ${recipe.recipeYield ? `<span>🍽️ ${recipe.recipeYield}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function searchRecipes() {
    const query = document.querySelector('.search input').value.toLowerCase().trim();
    if (!query) {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        renderRecipes([recipes[randomIndex]]);
        return;
    }
    const results = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.find(tag => tag.toLowerCase().includes(query))
    );
    results.sort((a, b) => a.name > b.name ? 1 : -1);
    renderRecipes(results);
}

// Initial display: random recipe
const randomIndex = Math.floor(Math.random() * recipes.length);
renderRecipes([recipes[randomIndex]]);

// Search event listeners
document.querySelector('.search-icon').addEventListener('click', searchRecipes);
document.querySelector('.search input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchRecipes();
});
