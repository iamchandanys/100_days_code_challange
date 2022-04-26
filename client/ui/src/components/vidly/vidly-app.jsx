import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CommonNavBar from "./common/common-navbar";
import Vidly from "./pages/vidly";
import Customers from "./pages/customers";
import Rentals from "./pages/rentals";
import NotFound from "./pages/not-found";
import MovieForm from "./pages/movie-form";
import LoginForm from "./pages/login-form";

const VidlyApp = () => {
  return (
    <div>
      <CommonNavBar />
      <div className="content">
        {/* Routes will try to match exact path url. */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/movies" element={<Vidly />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Vidly />} />
          {/* If none of our path match */}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </div>
  );
};

export default VidlyApp;
