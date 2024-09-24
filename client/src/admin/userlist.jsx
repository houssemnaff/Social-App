import React, { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Sidebarmenu from "./sidbar";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const Userlist = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.token);
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

  const deleteUser = async (id) => {
    try {
      // Afficher une alerte de confirmation avant de supprimer l'utilisateur
      const isConfirmed = window.confirm("Are you sure you want to delete this user?");
      
      if (!isConfirmed) {
        return; // Si l'utilisateur annule, ne pas continuer avec la suppression
      }
  
      const response = await axios.delete(`http://127.0.0.1:3001/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        const newData = data.filter((item) => item._id !== id);
        setData(newData);
        alert("User deleted successfully"); // Afficher une alerte après la suppression réussie
      } else {
        console.log(`Failed to delete user with id ${id}. Status code: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  

  const formattedData = data.map(client => [
    client.firstName,
    client.lastName,
    client.email,
    new Date(client.createdAt).toLocaleDateString(),
    client.role,
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
    { name: "joinDate", label: "Join Date" },
    { name: "role", label: "Role" },
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
              title={"User List"}
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
