import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Subscription } from './components/Subscription';
import { Header } from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isRefreshTokenValid, setTimeToRefreshToken, showError } from './utils';
import { refreshToken } from './features/auth/authThunk';
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from './components/Error';

function App() {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  
  // don't login, just refresh token at start of application (if refresh token is valid)
  useEffect(() => {
      if (isRefreshTokenValid()) {
          //console.log("In getting token")
          dispatch(refreshToken());
      } else {
          //console.log("refresh not valid, should login");
      }
  }, []);

  // refresh token before expiration
  useEffect(() => {
      if (auth.user !== null) {
          setTimeout(() => {
              dispatch(refreshToken());
          }, setTimeToRefreshToken(auth.user))
      } else {
          //console.log("No user logged for now");
      }
      return () => {};
  }, [auth.access_token]);


  const showError = (errorInfo) => {
    console.error(errorInfo);
  }

  return (
    <ErrorBoundary FallbackComponent={Error} onError={showError}>
      <Routes>
        <Route path='/*' element={<Header />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Subscription />}/>
      </Routes>
    </ErrorBoundary> 
  );
}

export default App;
