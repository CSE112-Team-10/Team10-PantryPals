import './index.css';
import React, { useRef } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

const AnimatedRoutes = () => {
  const location = useLocation();

   // Create refs for each route
   const loginPageRef = useRef(null);
   const homePageRef = useRef(null);
 
   // Map paths to refs
   const nodeRefs = {
     "/": loginPageRef,
     "/home": homePageRef,
   };

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.key}
        nodeRef={nodeRefs[location.pathname]}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <div ref={nodeRefs[location.pathname]}>
          <Routes location={location}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AnimatedRoutes;