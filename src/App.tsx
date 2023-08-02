import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './config/routes';
import { PrivateRoute } from './containers/PrivateRoute';
import { PublicRoute } from './containers/PublicRoute';

const App = (): JSX.Element => {
  return (

    <Router >
      <Routes>
        {Object.keys(routes).map(key => {
          const value = routes[key];
          const {isPrivate, isStatic} = value ;
            if(isStatic){
              return <Route {...value} key={key} />
            }

            //with authentication
            const SelectRoute = isPrivate ? PrivateRoute : PublicRoute;
            // return <SelectRoute {...value} key={key} />
            //withour authentication
          return <Route {...value} key={key} />

        })}
      </Routes>
    </Router>
    
  );
}

export default App;
