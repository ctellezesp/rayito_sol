import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';

import Main from './main';
import Create from './create';
import CreateTags from './create-tag';
import ListProducts from './list-products';
import EditProduct from './edit-product';
import ListTags from './list-tags';
import Dashboard from './dashboard';

import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { MuiThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ce93d8',
    },
    secondary: {
      main: '#f44336',
    },
  },
});


function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact component={Main} />
          <Route path="/create" component={Create} />
          <Route path="/create-tag" component={CreateTags} />
          <Route path="/list-products" component={ListProducts} />
          <Route path="/edit-product/:id" component={EditProduct} />
          <Route path="/list-tags" component={ListTags} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
