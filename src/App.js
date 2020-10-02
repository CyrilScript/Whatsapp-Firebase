import React from 'react';
import './App.css';
import Sidebar from './components/Side/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
// import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './redux/StateProvider';


function App() {
  const[{user}] = useStateValue();

  //BEM Naming Convention
  return (
    <div className="app">

      {!user?(
        <Login/>
      ):(
        <div className="app__body">

        <Router>
          <Sidebar/> 
          <Switch>

          <Route path='/groups/:groupId'>
            <Chat messages={user}/>
          </Route>

          <Route path='/'>
            <Chat/>
          </Route>

          {/* <Route component={NotFoundPage} /> */}
          </Switch>
        </Router>

      </div>
      )}
    </div>

  );
}

export default App;
