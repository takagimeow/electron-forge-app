import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomeScreen } from 'src/renderer/screens/HomeScreen';
import { AboutScreen } from 'src/renderer/screens/AboutScreen';

export function App() {
  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="/about">
          <AboutScreen />
        </Route>
      </Switch>
    </div>
  );
}
