import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserRotues from "./routes/UserRotues";
import AdminRoutes from "./routes/AdminRoutes";
import NotFound from "./pages/404";

const App = () => {
  const Userrotues = UserRotues();
  const Adminroutes = AdminRoutes();
  return (
    <div>
      <Header />
      <Toaster position="top-center" />
      <Routes>
        {Userrotues}
        {Adminroutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
