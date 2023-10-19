import "./App.css";
import MenuAppBar from "./widgets/navbar/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/loginPage/login";
import Favourites from "./pages/favouritesPage/favourites";
import Home from "./pages/homePage/home";

function App() {
  const excludeNavbarRoutes = ["/login", "/signup"];
  return (
    <div className="App">
      <BrowserRouter>
        {excludeNavbarRoutes.includes(window.location.pathname) ? null : (
          <MenuAppBar />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
