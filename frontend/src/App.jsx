import Login from "./components/Login.jsx";
import PrivateLayout from "./layouts/PrivateLayout.jsx";
import Loader from "./components/pages/Loader.jsx";
import Signup from "./components/Signup.jsx";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import Upload from "./components/pages/Upload.jsx";
import Process from "./components/pages/Process.jsx";
import Home from "./components/pages/Home.jsx";
import EmailVerification from "./components/EmailVerification.jsx";
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/data" element={<Process />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<EmailVerification />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
