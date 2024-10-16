import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.jsx";
import GenerateTranscript from "./GenerateTranscript.jsx"; 
import StudentTranscript from "./components/StudentTranscript.jsx"; 
import { Link } from "react-router-dom";
export default function Examination() {
  return (
    <div>
    
        
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/generate-transcript" element={<GenerateTranscript />} />
          <Route
            path="/generate-transcript/:rollNumber"
            element={<StudentTranscript />}
          />
   
        </Routes>

  
    </div>
  );
}
