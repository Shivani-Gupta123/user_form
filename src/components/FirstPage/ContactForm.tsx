import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    localStorage.setItem('user', JSON.stringify({ name, phoneNumber, email }));

    navigate('/second-page');
  };

  return (
    <>
    <Typography gutterBottom variant="h3" align="center">
        Contact Form
    </Typography>
    <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}> 
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              variant="outlined" 
              fullWidth
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
           <TextField
             label="Phone Number"
             value={phoneNumber}
             variant="outlined" 
             fullWidth
             onChange={(event) => setPhoneNumber(event.target.value)}
             required
           />
           </Grid>
           <Grid item xs={12}>
           <TextField
             label="Email"
             value={email}
             variant="outlined" 
             fullWidth
             onChange={(event) => setEmail(event.target.value)}
             type="email"
             required
           />
           </Grid>
           <Grid item xs={12}>
           <Button type="submit" variant="contained" color="primary" fullWidth>
             Submit
           </Button>
           </Grid>
      </Grid>
    </form>
    </Card>
    </>
  );
};

export default UserForm;
