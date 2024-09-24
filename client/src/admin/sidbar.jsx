import React from "react";
import { Link, Outlet} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './sidbar.css';
import photo from '../assets/a.png';
function Sidebarmenu() {
  
  return (
    <>
    <div className="action"> 
    <div className="imga">
      <img  src={photo} width="80px"  height="80px"alt="no"></img></div>
    <div><p>Admin Space</p></div>

 </div>
      <ul className="navigation">
      <li>
        <div className="item">
        <Link to="/home" >
      
            <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg"  color ="rgb(58, 58, 58)" width="24" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
              </svg>
            </span>
            <span className="text">acceuil</span>
            </Link>
           
          </div>
        </li>
        <li>
        <div className="item">
        <Link to="/admin" >
      
            <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg"  color ="rgb(58, 58, 58)" width="24" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
              </svg>
            </span>
            <span className="text">Home</span>
            </Link>
           
          </div>
        </li>
     

        <li>
        <div className="item">
        <Link to="/admin/userlist" >
            <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg"color ="rgb(58, 58, 58)" width="24" height="25" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg>
            </span>
            <span className="text">User Management </span>
            </Link>
         </div>
        </li>
        <li>
        <div className="item">
        <Link to="/admin/Reports" >
            <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" color ="rgb(58, 58, 58)" width="24" height="25"  fill="currentColor" class="bi bi-send-dash-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5"/>
</svg>
            </span>
            <span className="text">posts </span>
           
            </Link>
            </div>
        </li>
        <li>
        <div className="item">
        <Link to="/admin/Profile">
            <span className="icon">
                 
            <svg xmlns="http://www.w3.org/2000/svg" color ="rgb(58, 58, 58)" width="24" height="25" fill="currentColor" class="bi bi-file-person-fill" viewBox="0 0 16 16">
  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11"/>
</svg>
            </span>
            <span className="text">Profil</span>
            </Link>
       </div>
        </li>
     
        
    
     
       
        
      </ul>
<Outlet/>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:wght@300;400;500;600;700&display=swap')
</style>

      </>
  )
  
}

export default Sidebarmenu;