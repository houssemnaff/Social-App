import React, { useEffect, useState } from "react";
import Sidebarmenu from "./sidbar";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import './sidbar.css';
import Card from 'react-bootstrap/Card';
import photo from "../assets/b.jpg";
import photo1 from "../assets/c.jpg";
import {  setLogout } from "state";
import photo2 from "../assets/d.jpg";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputBase, MenuItem, Select, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import axios from "axios";
const data = [
  { id: 0, value: 15, label: 'users between 13 < 20' },
  { id: 1, value: 10, label: 'users between 31 < 70' },
  { id: 2, value: 25, label: 'users between 21 < 30' },
];

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/users/allusers');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <>
    
      <Sidebarmenu />
      <div style={{marginLeft: '5%'}}>
      {<FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "5rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl> }
    </div>

      <h1 style={{marginLeft: '45%'}}>Welcome Sami</h1>
      
      <div className="zina">
        
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          height={200}
          width={550}
        />

        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
            },
          ]}
          width={550}
          height={300}
        />
        <h1 style={{ marginLeft: "35%",fontSize:'medium' ,fontWeight:'bold'}}>People and their actions</h1></div>
        <Card style={{ width:"500px", marginLeft: '55%',position:'absolute',marginTop:'39%'}}>
        <Card.Img variant="top" src={photo} />
        
        <Card.Body>
          <Card.Text>
            <h1>number of people</h1>
            Welcome to your analytics dashboard! Currently, our app is serving a vibrant and growing community of users.
            almost <h2>{data.length} user</h2>
          </Card.Text>
        </Card.Body>
      </Card>
      
      <div className="zina2">
      <Card >
        <Card.Img variant="top" src={photo1} />
        <Card.Body>
          <Card.Text>
            <h1>number of Reports</h1>
            Welcome to your analytics dashboard! Currently, our app is serving a vibrant and growing community of users.
            almost <h2>100.999 user</h2>
          </Card.Text>
        </Card.Body>
      </Card>
      <br></br>
      <Card >
        <Card.Img variant="top" src={photo2} />
        <Card.Body>
          <Card.Text>
            <h1>number of Admin</h1>
            Welcome to your analytics dashboard! Currently, our app is serving a vibrant and growing community of users.
            almost <h2>4 Admin</h2>
          </Card.Text>
        </Card.Body>
      </Card></div>
    </>
  );
};

export default Home;
