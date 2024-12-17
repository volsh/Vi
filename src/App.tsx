import { RecoilRoot } from "recoil";
import TaskManager from "./components/TaskManager/TaskManager";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginButton from "./components/LoginButton/LoginButton";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <RecoilRoot>
        <div>
          <Navbar />
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<TaskManager />} />
            </Routes>
          ) : (
            <LoginButton />
          )}
        </div>
      </RecoilRoot>
    </Router>
  );
}

export default App;
