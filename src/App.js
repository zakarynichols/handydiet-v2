import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Recipe from './components/Recipe';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/recipe/:id" component={Recipe} />
      </Switch>
    </HashRouter>
  );
};

export default App;
