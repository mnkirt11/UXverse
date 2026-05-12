import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        <Route
  path="/profile/:username"
  element={<ProfilePage />}
/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
  path="/explore"
  element={<ExplorePage />}
/>

        

      </Routes>

    </BrowserRouter>
  );
}

export default App;