import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Alert,
  Snackbar,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

// カスタムフックと型定義をインポート
import { useCount } from './hooks/useCount';
import { useNotification } from './hooks/useNotification';
import { CountActions } from './types/count';

// カスタムテーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#2e7d32',
    },
    warning: {
      main: '#ed6c02',
    },
  },
});

function App() {
  // カスタムフックを使用
  const {
    count,
    history,
    stats,
    range,
    executeOperation,
    clearHistory,
    getCountColor,
    isAtLimit
  } = useCount({ min: -100, max: 100 });

  const { notification, showNotification, hideNotification } = useNotification();

  // カウント操作を実行し、結果に応じて通知を表示
  const handleOperation = (operation: 'increment' | 'decrement' | 'reset'): void => {
    const result = executeOperation(operation);
    showNotification(result.message, result.severity);
  };

  // 履歴クリア時の通知
  const handleClearHistory = (): void => {
    clearHistory();
    showNotification('履歴をクリアしました！', 'info');
  };

  // 最新の操作を取得
  const getLatestOperation = () => {
    return history.length > 0 ? history[history.length - 1] : null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
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
              TypeScript カウントアプリ
            </Typography>
            
            {/* 現在のカウント値を表示 */}
            <Typography
              variant="h2"
              sx={{
                fontSize: '4rem',
                fontWeight: 'bold',
                mb: 4,
                color: getCountColor(count),
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              現在のカウント: {count}
            </Typography>

            {/* 制限値の表示 */}
            <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}>
              範囲: {range.min} ~ {range.max}
            </Typography>

            {/* ボタンコンテナ */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
              {/* カウントダウンボタン */}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOperation(CountActions.DECREMENT)}
                startIcon={<RemoveIcon />}
                disabled={isAtLimit('min')}
                sx={{ 
                  minWidth: 120,
                  fontSize: '1.1rem',
                  py: 1.5
                }}
              >
                －1する
              </Button>
              
              {/* カウントアップボタン */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOperation(CountActions.INCREMENT)}
                startIcon={<AddIcon />}
                disabled={isAtLimit('max')}
                sx={{ 
                  minWidth: 120,
                  fontSize: '1.1rem',
                  py: 1.5
                }}
              >
                ＋1する
              </Button>
            </Stack>

            {/* リセットと履歴クリアボタン */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                onClick={() => handleOperation(CountActions.RESET)}
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
              
              <Button
                variant="outlined"
                onClick={handleClearHistory}
                startIcon={<ClearIcon />}
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
                履歴クリア
              </Button>
            </Stack>

            {/* 統計情報 */}
            {stats.totalOperations > 0 && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  統計情報
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                  <Chip 
                    label={`総操作: ${stats.totalOperations}回`} 
                    color="primary" 
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                  <Chip 
                    label={`平均値: ${stats.averageValue}`} 
                    color="secondary" 
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Chip 
                    icon={<TrendingUpIcon />}
                    label={`+1: ${stats.incrementCount}回`} 
                    color="success" 
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                  <Chip 
                    icon={<TrendingDownIcon />}
                    label={`-1: ${stats.decrementCount}回`} 
                    color="error" 
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                  <Chip 
                    label={`リセット: ${stats.resetCount}回`} 
                    color="warning" 
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                </Stack>
              </Box>
            )}

            {/* 最新の操作履歴 */}
            {getLatestOperation() && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  最新の操作
                </Typography>
                <Typography variant="body2">
                  操作: {getLatestOperation()?.operation === 'increment' ? 'カウントアップ' : 
                         getLatestOperation()?.operation === 'decrement' ? 'カウントダウン' : 'リセット'}
                </Typography>
                <Typography variant="body2">
                  時刻: {getLatestOperation()?.timestamp.toLocaleTimeString()}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>

        {/* 通知スナックバー */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={hideNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={hideNotification} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
