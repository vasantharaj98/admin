import React, {useState, useEffect} from 'react';
import { Container, Typography } from '@mui/material';
import Table from '../../components/Table/index'

import './style.css';

const Home = ({setLoader}) => {

  const [user, setUser] = useState([]);

  const fetchData = async () => {
    return await fetch("https://cloud-9-bar-grill.onrender.com/dish")
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
            setLoader(false);
          });
  }

  useEffect(() => {
    fetchData();
    setLoader(true);
    const interval=setInterval(()=>{
        fetchData();
     },10000)
    return()=>clearInterval(interval);
    
  },[])

  return (
    <>
    <Container sx={{py: 12}}>
            <Typography className='un_line' variant="h" component="h2">Today's Orders</Typography>
            <Table user={user}/>
    </Container>
    </>
  )
}

export default Home;
