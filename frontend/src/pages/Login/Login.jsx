import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
// context
import { useAuth } from '../../Context/AuthContext';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(name, password);
      console.log('Connexion réussie !');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  // -------------
  // SX
  // -------------

  const textFieldSx = {
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--color-04)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--color-02)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--color-02)',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'var(--color-05)',
    },
  };

  const submitButtonSx = {
    width: '50%',
    backgroundColor: 'var(--color-03)',
    color: 'var(--color-05)',
    '&:hover': {
      backgroundColor: 'var(--color-02)',
      color: 'var(--color-05)',
    },
  };

  // ----------
  // RETURN
  // ----------
  return (
    <Box
      component="main"
      id="Login"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Box
        component="section"
        id="Login_content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: {
            xs: '90%',
            sm: '450px',
          },
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: 'var(--font-01)',
            color: 'var(--color-01)',
            fontSize: {
              xs: 'xx-large',
              sm: 'xxx-large',
            },
            textAlign: 'center',
          }}
        >
          CONNEXION
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              backgroundColor: 'white',
              p: {
                xs: 2,
                sm: 4,
              },
              borderRadius: '10px',
            }}
          >
            <TextField
              required
              variant="outlined"
              label="Login"
              sx={textFieldSx}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              required
              variant="outlined"
              label="Password"
              type="password"
              sx={textFieldSx}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Typography
                component="p"
                sx={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: 'large',
                }}
              >
                {error}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {loading ? (
              <CircularProgress size={32} />
            ) : (
              <Button variant="contained" type="submit" sx={submitButtonSx}>
                Se connecter
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
