import './App.css';
import {Route} from "react-router-dom";
import home from "./pages/home";
import chat from "./pages/chat";

function App() {
  return (
    <div className="App">
      <Route path="/" component={home} exact/>
      <Route path="/chats" component={chat} exact/>
    </div>
  );
}

export default App;
