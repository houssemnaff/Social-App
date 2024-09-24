import React, { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Sidebarmenu from "./sidbar";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';

const Userlist = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/posts/allpost',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        );
        setData(response.data);
        console.table(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      // Afficher une alerte de confirmation avant de supprimer l'utilisateur
      const isConfirmed = window.confirm("Are you sure you want to delete this post?");
      
      if (!isConfirmed) {
        return; // Si l'utilisateur annule, ne pas continuer avec la suppression
      }
  
      const response = await axios.delete(`http://127.0.0.1:3001/posts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        const newData = data.filter((item) => item._id !== id);
        setData(newData);
        alert("post deleted successfully"); // Afficher une alerte après la suppression réussie
      } else {
        console.log(`Failed to delete post with id ${id}. Status code: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '40%',
    maxHeight: '40%',
  });
  const formattedData = data.map(client => [
    client.firstName,
    client.lastName,
    client.location,
    new Date(client.createdAt).toLocaleDateString(),
   client.description,
    <Img src={'http://localhost:3001/assets/'+client.userPicturePath}/>,
    <Button
      variant="contained"
      color="secondary"
      onClick={() => deleteUser(client._id)}
    >
      Delete
    </Button>
  ]);

  const columns = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "E-mail" },
    { name: "post date", label: "post Date" },
    { name: "contenu", label: "contenu" },
    { name: "image", label: "image" },

    { name: "delete", label: "Delete" }
  ];

  const options = {
    filterType: 'checkbox',
    sort: true,
    rowsPerPageOptions: [5, 10, 30, 100],
    responsive: 'standard',
  };

  return (
    <>
      <Sidebarmenu />
      <div className="container" style={{ width: '70%', position: "absolute", marginTop: '10%', marginLeft: '15%' }}>
        <div className="row">
          <div className="col-md- mt-2">
            <div className="container">
              <div className="row">
                {/* Display Cards with Ticket Statistics */}
              </div>
            </div>
          </div>
          <div className="col mt-4">
            <MUIDataTable
              title={"tous les post"}
              data={formattedData}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlist;
