import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Search from "./components/Search";
import './App.scss';

function App() {
  return <div className="App">      
      <Router>
        <Switch>
          <Route exact path="/">
            <Search />          
          </Route>
        </Switch>
      </Router>
    </div>
}

export default App;
