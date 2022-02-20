import LoginForm from "./session/login_form"
import SignupForm from "./session/signup_form"
import Browse from './browse'
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
function App() {
  return (
    <div className="App">
    <Switch>
        <AuthRoute exact path="/" component={LoginForm} />
        <ProtectedRoute path="/browse" component={Browse} />
        <AuthRoute exact path="/signup" component={SignupForm} />
    </Switch>
    </div>
  );
}

export default App;
