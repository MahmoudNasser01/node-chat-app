import './App.css';
import {Route} from "react-router-dom";
import home from "./pages/home";
import chat from "./pages/chat";
// const io = io(`http://${window.location.hostname}:8000`)

function App() {
  return (
    <div className="App">
      <Route path="/" component={home} exact/>
      <Route path="/chats" component={chat} exact/>
    </div>
  );
}

export default App;
