import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Search from "./components/Search";
import Products from "./components/Products";
import DetailProduct from './components/DetailProduct';
import './App.scss';

function App() {
  return <div className="App">      
      <Router>
        <Switch>
          <Route exact path="/">
            <Search />        
          </Route>
          <Route exact path="/items/search">
            <Search />
            <Products />
          </Route>
          <Route exact path="/items/:id">
            <Search />
            <DetailProduct />
          </Route>
        </Switch>
      </Router>
    </div>
}

export default App;
