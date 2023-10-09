const request = require('request');
const catchAsync = require('../utils/catchAsync');

const getLandingPage = (req, res) => {
  res.status(200).render('LandingPage', {
    title: 'Home',
  });
};

// const getRecipePage = (req, res) => {
//   res.status(200).render('recipes', {
//     title: 'Home',
//   });
// };

const getRecipePage = catchAsync((req, res) => {
  const { slug } = req.params;
  const apiUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${slug}&key=${process.env.FORKIFY_API_KEY}`;

  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      // Render a new Pug template with the data and display it
      res.status(200).render('recipes', {
        title: 'Search For Recipes',
        countRecipes: data.results,
        recipes: data.data.recipes,
      });
    }
  });
});

const getRecipe = catchAsync((req, res) => {
  const { slug } = req.params;
  const apiUrl = `https://forkify-api.herokuapp.com/api/v2/recipes/${slug}`;

  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      // Render a new Pug template with the data and display it
      res.status(200).render('recipe', {
        title: data.data.recipe.title,
        recipe: data.data.recipe,
      });
    }
  });
});

module.exports = {
  getLandingPage,
  getRecipe,
  getRecipePage,
};
