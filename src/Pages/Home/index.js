import React, {useState, useEffect} from 'react';
import { Container, Typography } from '@mui/material';
import Table from '../../components/Table/index';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './style.css';

const Home = ({setLoader}) => {

  const [user, setUser] = useState([]);
  const [value, setValue] = useState(null);
  const [orderdate, setOrderdate] = useState([]);

  const fetchYear = async () => {
    return await fetch("https://cloud-9-bar-grill.onrender.com/orderdate")
          .then((response) => response.json())
          .then((data) => {
            setOrderdate(data);
            setValue(data[0])
            setLoader(false);
          });
  }

  const fetchData = async (val) => {
    // https://cloud-9-bar-grill.onrender.com/dish
    // http://localhost:5000/dish
    return await fetch(`https://cloud-9-bar-grill.onrender.com/dish/${val}`)
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
            setLoader(false);
          });
  }

  useEffect(()=>{
    fetchYear();
    setLoader(true);
  },[])

  useEffect(() => {
    if(value){
    fetchData(value);
    setLoader(true);
    const interval=setInterval(()=>{
        fetchData(value);
     },10000)
    return()=>clearInterval(interval);
  }
  },[value]);

  return (
    <>
    <Container sx={{py: 12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
            <Typography className='un_line' variant="h" component="h2">Orders</Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={orderdate}
              onChange={(_, newValue) => setValue(newValue)}
              defaultValue={orderdate[0]}
              value={value}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Select Order Date" />}
            />
            </div>
            <Table user={user}/>
    </Container>
    </>
  )
}

export default Home;
