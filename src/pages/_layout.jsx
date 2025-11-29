import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Threads from "../components/Threads";

function MainLayout() {
  return (
    <div className="relative min-h-screen">
      {/* bg */}
      <div className="fixed inset-0 z-0">
        <Threads amplitude={1} distance={0} enableMouseInteraction={false} />
      </div>

      {/* Contenido*/}
      <div className="relative z-10">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
