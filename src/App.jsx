import { BrowserRouter, Route, Routes } from "react-router";

// Layouts
import MainLayout from "./pages/_layout";
import HomeLayout from "./pages/Home/_layout";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home/Home";
import CreateTravel from "./pages/Home/CreateTravel";
import Chat from "./pages/Home/Chat";
import MyTravels from "./pages/Home/MyTravels";
import Profile from "./pages/Home/Profile";

// Toast
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ToastContainer";

import AuthProvider from "./context/AuthContext";

import ProtectedRoute from "./auth/ProtectedRoute"

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Pre-Login */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            {/* Logged User */}
            <Route element={<ProtectedRoute />}>
              <Route path="home" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="create" element={<CreateTravel />} />
                <Route path="chat" element={<Chat />} />
                <Route path="travels" element={<MyTravels />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
