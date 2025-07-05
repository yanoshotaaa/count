import { useState, useCallback } from 'react';
import { NotificationState } from '../types/count';

// 通知カスタムフックの戻り値の型定義
interface UseNotificationReturn {
  notification: NotificationState;
  showNotification: (message: string, severity: NotificationState['severity']) => void;
  hideNotification: () => void;
}

// 通知カスタムフック
export const useNotification = (): UseNotificationReturn => {
  // 通知の状態管理
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    severity: 'info'
  });

  // 通知を表示する関数
  const showNotification = useCallback((message: string, severity: NotificationState['severity']): void => {
    setNotification({
      open: true,
      message,
      severity
    });
  }, []);

  // 通知を非表示にする関数
  const hideNotification = useCallback((): void => {
    setNotification(prev => ({ ...prev, open: false }));
  }, []);

  return {
    notification,
    showNotification,
    hideNotification
  };
}; 