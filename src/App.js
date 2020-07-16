import React from 'react';
import Login from "./Login";
import NewUserCaptcha from "./NewUser";
import GetToken from "./GetToken";
import './App.css';
import Navigation from "./Navigation";
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import Footer from "./Footer";


function App() {
    return (
        <div className="App">
            <Router>
                <LastLocationProvider>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" />
                        <Route path="/login" component={Login} />
                        <Route path="/new_user" component={NewUserCaptcha}/>
                        <Route path="/get_token" component={GetToken}/>
                    </Switch>
                    <Footer/>
                </LastLocationProvider>
            </Router>
        </div>
  );
}

export default App;
