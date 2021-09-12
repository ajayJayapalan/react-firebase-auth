import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./private-route/PrivateRoute";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </AuthProvider>
    </div>
  );
}
