import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LorienRoutes } from "./data/constants/LorienRoutes";
import AboutPage from "./pages/AboutPage";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/homepage/HomePage";
import NavigationLayout from "./components/layouts/NavigationLayout";

function App() {
  return (
    <NavigationLayout>
      <BrowserRouter>
        <Routes>
          <Route path={LorienRoutes.Home} element={<HomePage />} />
          <Route path={LorienRoutes.About} element={<AboutPage />} />
          <Route path={LorienRoutes.About} element={<AboutPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </NavigationLayout>
  );
}

export default App;
