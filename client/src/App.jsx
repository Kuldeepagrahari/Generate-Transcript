import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

import Examination from "./Modules/Examination/Examination";
import "./App.css"
export default function App() {
  // const location = useLocation();
  return (
    <div className="app">
    <MantineProvider>
      
      <Routes>
        <Route path="/*" element={<Examination />}  />
      </Routes>
    </MantineProvider>
    </div>
  );
}
