//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/Login" component={LoginPage} />
          <Route exact path="/Register" component={RegisterPage} />

          {/*기본페이지는 맨 하단에 위치해야 Switch가 가장 마지막에 인식한다 아니면 exact 쓰던지... 혹시몰라 둘다 씀*/}
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;