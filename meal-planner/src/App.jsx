import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import RecipeDetails from "./components/RecipeDetails";
import IngredientDetails from "./pages/ingredientDetails";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="app" />} />
        <Route path="/app/login" element={<Login />} />
        <Route path="/app" element={<RecipeDetails />} />
        <Route path="/app/:recipeId" element={<IngredientDetails />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
