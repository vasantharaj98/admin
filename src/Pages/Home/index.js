import React, {useState, useEffect} from 'react';
import { Container, Typography } from '@mui/material';
import Table from '../../components/Table/index'

import './style.css';

const Home = () => {

  const [user, setUser] = useState([]);

  const fetchData = async () => {
    return await fetch("http://localhost:5000/dish")
          .then((response) => response.json())
          .then((data) => setUser(data));
  }

  useEffect(() => {
    fetchData();

    const interval=setInterval(()=>{
        fetchData();
     },10000)
    return()=>clearInterval(interval);
    
  },[])

  return (
    <>
    <Container sx={{marginTop: 12}}>
            <Typography className='un_line' variant="h" component="h2">Today's Orders</Typography>
            <Table user={user}/>
    </Container>
    </>
  )
}

export default Home;
