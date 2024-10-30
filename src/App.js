import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LorienRoutes } from "./data/enums/LorienRoutes";
import AboutPage from "./pages/AboutPage";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import NavigationLayout from "./components/layouts/NavigationLayout";

function App() {
  return (
    <div className="App">
      <NavigationLayout>
        <BrowserRouter>
          <Routes>
            <Route path={LorienRoutes.Home} element={<HomePage />} />
            <Route path={LorienRoutes.About} element={<AboutPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </NavigationLayout>
    </div>
  );
}

export default App;
