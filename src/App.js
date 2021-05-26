import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import styles from './App.module.css'

import './index.css'

import Login from './pages/Login'
import Chat from './pages/Chat/'
const App = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.SubContainer}>
        <BrowserRouter>
          <Switch>
            <Route path="/chat"
              render={ () => (
                  <Chat/>
              )}/>
            <Route path="/"
              render={ () => (
                  <Login/>
              )}/>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
