import {
  RecoilRoot,
} from "recoil";
import TaskManager from "./components/TaskManager/TaskManager";

import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <TaskManager />
    </RecoilRoot>
  );
}

export default App;
