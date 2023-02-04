import React, {useState, useEffect} from 'react';
import { Container, Typography } from '@mui/material';
import Table from '../../components/Table/index';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './style.css';
import io from 'socket.io-client';

const socket = io('https://cloud-9-bar-grill.onrender.com', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const Home = ({setLoader}) => {

  const [user, setUser] = useState([]);
  const [value, setValue] = useState(null);
  const [orderdate, setOrderdate] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState([]);
  const [soc, setSoc] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('prevOrders', (data) => {
      setLastPong(data);
    });

    socket.on('order', (data) => {
      setSoc(data);
      // const dataDate = new Date(data?.createdAt).getFullYear()+'-'+`0${new Date(data?.createdAt).getMonth()+1}`.slice(-2)+'-'+`0${new Date(data?.createdAt).getDate()}`.slice(-2);
      setLastPong(prevState => [...prevState, data]);
    });


    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('prevOrders');
    };
  }, []);

  console.log("data1", value);

  //https://cloudninebarandgrill.com/api/orderDate

  const fetchYear = async () => {
    return await fetch("https://cloud-9-bar-grill.onrender.com/orderDate")
          .then((response) => response.json())
          .then((data) => {
            setOrderdate(data);
            setValue(data[0])
            setLoader(false);
          });
  }

  //https://cloudninebarandgrill.com/api/dish/${val}

  const fetchData = async (val) => {
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
  }
  },[soc, value]);

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
