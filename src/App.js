import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import styles from './App.module.css'

import Spinner from './components/utils/Spinner'

const Chat = lazy(() => import('./pages/Chat/Chat'))
const Login = lazy(() => import('./pages/Login/Login'))

const App = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.SubContainer}>
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </div>
    </div>
  )
}

export default App
