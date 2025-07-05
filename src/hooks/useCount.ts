import { useState, useCallback, useMemo } from 'react';
import { 
  CountOperation, 
  CountHistory, 
  CountActions, 
  CountOperationResult,
  CountStats,
  CountColor,
  CountRange
} from '../types/count';

// カウントカスタムフックの戻り値の型定義
interface UseCountReturn {
  count: number;
  history: CountHistory[];
  stats: CountStats;
  range: CountRange;
  executeOperation: (operation: CountOperation) => CountOperationResult;
  clearHistory: () => void;
  getCountColor: (count: number) => CountColor;
  isAtLimit: (direction: 'min' | 'max') => boolean;
}

// カウントカスタムフック
export const useCount = (initialRange: CountRange = { min: -100, max: 100 }): UseCountReturn => {
  // カウントの状態管理
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<CountHistory[]>([]);
  const [range] = useState<CountRange>(initialRange);

  // カウント操作を実行する関数（型安全）
  const executeOperation = useCallback((operation: CountOperation): CountOperationResult => {
    let newCount: number;
    let message: string;
    let severity: CountOperationResult['severity'] = 'info';

    switch (operation) {
      case CountActions.INCREMENT:
        newCount = count + 1;
        if (newCount > range.max) {
          return {
            success: false,
            message: `最大値 ${range.max} に達しました！`,
            severity: 'warning'
          };
        }
        message = 'カウントアップしました！';
        severity = 'success';
        break;
        
      case CountActions.DECREMENT:
        newCount = count - 1;
        if (newCount < range.min) {
          return {
            success: false,
            message: `最小値 ${range.min} に達しました！`,
            severity: 'warning'
          };
        }
        message = 'カウントダウンしました！';
        severity = 'success';
        break;
        
      case CountActions.RESET:
        newCount = 0;
        message = 'カウントをリセットしました！';
        severity = 'info';
        break;
        
      default:
        return {
          success: false,
          message: '無効な操作です',
          severity: 'error'
        };
    }

    // 新しい履歴を追加
    const newHistory: CountHistory = {
      value: newCount,
      operation,
      timestamp: new Date()
    };

    setCount(newCount);
    setHistory(prev => [...prev, newHistory]);
    
    return {
      success: true,
      newCount,
      message,
      severity
    };
  }, [count, range]);

  // 履歴をクリアする関数
  const clearHistory = useCallback((): void => {
    setHistory([]);
  }, []);

  // カウントの色を動的に決定する関数
  const getCountColor = useCallback((count: number): CountColor => {
    if (count > 50) return '#2e7d32'; // 緑
    if (count > 0) return '#1976d2';  // 青
    if (count < 0) return '#dc004e';  // 赤
    return '#666';                    // グレー
  }, []);

  // 制限値に達しているかチェックする関数
  const isAtLimit = useCallback((direction: 'min' | 'max'): boolean => {
    return direction === 'min' ? count <= range.min : count >= range.max;
  }, [count, range]);

  // 統計情報を計算（メモ化）
  const stats = useMemo((): CountStats => {
    const incrementCount = history.filter(h => h.operation === CountActions.INCREMENT).length;
    const decrementCount = history.filter(h => h.operation === CountActions.DECREMENT).length;
    const resetCount = history.filter(h => h.operation === CountActions.RESET).length;
    const totalOperations = history.length;
    const averageValue = totalOperations > 0 
      ? history.reduce((sum, h) => sum + h.value, 0) / totalOperations 
      : 0;

    return {
      totalOperations,
      incrementCount,
      decrementCount,
      resetCount,
      averageValue: Math.round(averageValue * 100) / 100
    };
  }, [history]);

  return {
    count,
    history,
    stats,
    range,
    executeOperation,
    clearHistory,
    getCountColor,
    isAtLimit
  };
}; 