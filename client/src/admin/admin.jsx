import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Userlist from './userlist';
import Reports from './reports';
import Profile from './profile';
import Error from './error';
import Home from './home';
import Sidebarmenu from './sidbar';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";

function Admin() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const userRole = useSelector((state) => state.user?.role); // Utilisation de l'opérateur de navigation sécurisée ?. pour éviter les erreurs de propriété null

  // Vérifie si l'utilisateur est authentifié et a le rôle d'administrateur
  if (!isAuth || userRole !== 'admin') {
    // Si l'utilisateur n'est pas authentifié ou n'a pas le rôle d'administrateur, redirige vers la page de connexion
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Sidebarmenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/welcome' element={<Home />} />
        <Route path='/userlist' element={<Userlist />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/profile' element={<Profile />} />
      
      </Routes>
    </div>
  );
}

export default Admin;
