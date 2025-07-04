import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// カスタムテーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  // useStateフックを使用してカウントの状態を管理
  // count: 現在のカウント値（初期値は0）
  // setCount: カウント値を更新するための関数
  const [count, setCount] = useState(0);

  // カウントアップボタンがクリックされたときの処理
  const handleIncrement = () => {
    setCount(count + 1); // 現在のカウント値に1を加算
  };

  // リセットボタンがクリックされたときの処理
  const handleReset = () => {
    setCount(0); // カウント値を0にリセット
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
            {/* アプリケーションのタイトル */}
            <Typography variant="h1" sx={{ mb: 4, color: 'white' }}>
              カウントアプリ
            </Typography>
            
            {/* 現在のカウント値を表示 */}
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
              現在のカウント: {count}
            </Typography>

            {/* ボタンコンテナ */}
            <Box sx={{ mb: 3 }}>
              {/* カウントアップボタン（最低要件） */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleIncrement}
                startIcon={<AddIcon />}
                sx={{ 
                  minWidth: 120,
                  fontSize: '1.1rem',
                  py: 1.5,
                  mr: 2
                }}
              >
                ＋1する
              </Button>
              
              {/* リセットボタン */}
              <Button
                variant="outlined"
                onClick={handleReset}
                startIcon={<RefreshIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                リセット
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
