import React from 'react';
import Header from '../src/Layouts/Header/index';
import Home from '../src/Pages/Home/index';

const RouteRoute = ({setLoader}) => {
  return (
    <>
    <Header/>
    <Home setLoader={setLoader}/>
    </>
  )
}

export default RouteRoute;