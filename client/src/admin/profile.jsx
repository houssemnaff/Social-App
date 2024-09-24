import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import './Error.css';
import Sidebarmenu from './sidbar';
import photo from '../assets/admin.jpg';
import { useSelector } from 'react-redux';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function Profile() {
  const user = useSelector(state => state.user); // Accédez aux données de l'utilisateur depuis l'état global

  const firstName = user.firstName;
  const email = user.email;
  const photo ="http://localhost:3001/assets/"+ user.picturePath;
  const nbamis= user.friends.length;
  const nbpost= user.location;
  return (
    <>
    <Sidebarmenu/>
      <div className='answer'>
        <div className="video-container">
          <video className="video-background" autoPlay muted loop>
            <source src={require('../../src/yes.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style={{ position: 'absolute', top: '60%' ,marginLeft:'500px' }}>
          {/* Complex Grid */}
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              height: 180,
              width: 800, // Adjusted width to 300
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={photo} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {firstName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      nombre de amis :
                      {nbamis}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                     location :
                      {nbpost}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default Profile;
