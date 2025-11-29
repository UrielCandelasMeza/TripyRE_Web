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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pre-Login */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* Logged User */}
        <Route path="home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateTravel />} />
          <Route path="chat" element={<Chat />} />
          <Route path="travels" element={<MyTravels />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
