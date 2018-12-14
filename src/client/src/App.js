import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import Lists from './components/Lists';
import Items from './components/Items';
import CreateList from './components/CreateList';
import EditList from './components/EditList';
import CreateItem from './components/CeateItem';
import EditItem from './components/EditItem';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/lists" className="nav-link">Lists</Link>
                </li>
                <li className="nav-item">
                  <Link to="/items" className="nav-link">Items</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <div className="container">
            <Switch>
              <Route exact path="/lists" component={Lists} />
              <Route exact path="/lists/create" component={CreateList}/>
              <Route exact path="/lists/edit/:list_id" component={EditList} />
              <Route exact path="/items" component={Items} />
              <Route exact path="/items/create" component={CreateItem} />
              <Route exact path="/items/edit/:item_id" component={EditItem}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
