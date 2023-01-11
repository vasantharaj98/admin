import React, {useState} from 'react';
import './App.css';
import RouteRoute from './Routes';
import Loader from '../src/components/Loader/loader'

function App() {
  const [loader, setLoader] = useState (false);
  return (
    <>
      {loader && <Loader></Loader>}
      <RouteRoute setLoader={setLoader}/>
    </>
  );
}

export default App;
