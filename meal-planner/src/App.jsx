import { BrowserRouter, Route, Routes } from "react-router-dom";

import RecipeDetails from "./components/RecipeDetails";
import IngredientDetails from "./pages/ingredientDetails";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<RecipeDetails />} />
        <Route path="/app/:recipeId" element={<IngredientDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
