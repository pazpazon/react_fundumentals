import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Popular from './Popular';
import Battle from './Battle';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/battle' exact component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route render={ () => <p> (404) Not Found!</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;