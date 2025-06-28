import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Fab,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon
} from '@mui/icons-material';

// カスタムテーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      textAlign: 'center',
      marginBottom: '2rem',
    },
  },
});

function App() {
  const [count, setCount] = useState(0);
  const [isAutoCounting, setIsAutoCounting] = useState(false);
  const [isAutoDecreasing, setIsAutoDecreasing] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoCounting) {
      intervalId = setInterval(() => setCount(prev => prev + 1), 1000);
    } else if (isAutoDecreasing) {
      intervalId = setInterval(() => setCount(prev => prev - 1), 1000);
    }

    return () => intervalId && clearInterval(intervalId);
  }, [isAutoCounting, isAutoDecreasing]);

  const toggleAutoCount = () => {
    setIsAutoCounting(prev => !prev);
    setIsAutoDecreasing(false);
  };

  const toggleAutoDecrease = () => {
    setIsAutoDecreasing(prev => !prev);
    setIsAutoCounting(false);
  };

  const resetCount = () => {
    setCount(0);
    setIsAutoCounting(false);
    setIsAutoDecreasing(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4,
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 3,
              width: '100%',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h1" sx={{ mb: 4, color: 'white' }}>
              カウンター
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: '4rem',
                fontWeight: 'bold',
                mb: 4,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {count}
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
              <Fab
                color="secondary"
                onClick={() => setCount(prev => prev - 1)}
                sx={{ width: 56, height: 56 }}
              >
                <RemoveIcon />
              </Fab>
              <Fab
                color="primary"
                onClick={() => setCount(prev => prev + 1)}
                sx={{ width: 56, height: 56 }}
              >
                <AddIcon />
              </Fab>
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
              <Button
                variant={isAutoCounting ? "contained" : "outlined"}
                color="success"
                onClick={toggleAutoCount}
                startIcon={isAutoCounting ? <StopIcon /> : <PlayIcon />}
                sx={{ 
                  minWidth: 120,
                  color: isAutoCounting ? 'white' : 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                {isAutoCounting ? '停止' : '自動+'}
              </Button>
              <Button
                variant={isAutoDecreasing ? "contained" : "outlined"}
                color="error"
                onClick={toggleAutoDecrease}
                startIcon={isAutoDecreasing ? <StopIcon /> : <PlayIcon />}
                sx={{ 
                  minWidth: 120,
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                {isAutoDecreasing ? '停止' : '自動-'}
              </Button>
            </Stack>

            <Button
              variant="outlined"
              onClick={resetCount}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              リセット
            </Button>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
