// カウント操作の型定義
export type CountOperation = 'increment' | 'decrement' | 'reset';

// カウント履歴のインターフェース
export interface CountHistory {
  value: number;
  operation: CountOperation;
  timestamp: Date;
}

// アプリケーションの状態インターフェース
export interface AppState {
  count: number;
  history: CountHistory[];
  maxCount: number;
  minCount: number;
}

// 通知の型定義
export interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'warning' | 'error' | 'info';
}

// カウント操作の列挙型
export enum CountActions {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
  RESET = 'reset'
}

// カウント範囲の設定
export interface CountRange {
  min: number;
  max: number;
}

// カウント統計のインターフェース
export interface CountStats {
  totalOperations: number;
  incrementCount: number;
  decrementCount: number;
  resetCount: number;
  averageValue: number;
}

// カウント操作の結果型
export type CountOperationResult = {
  success: true;
  newCount: number;
  message: string;
  severity: NotificationState['severity'];
} | {
  success: false;
  message: string;
  severity: NotificationState['severity'];
};

// カウント操作の関数型
export type CountOperationFunction = (operation: CountOperation) => CountOperationResult;

// カウント色の型定義
export type CountColor = '#2e7d32' | '#1976d2' | '#dc004e' | '#666';

// カウント色を決定する関数の型
export type CountColorFunction = (count: number) => CountColor; 