// src/shared/model/alertStore.ts
import { create } from 'zustand';

// Alert 상태 타입
interface AlertState {
  isVisible: boolean; // Alert 표시 여부
  message: string; // Alert 메시지
  type: 'success' | 'error' | 'info' | 'warning'; // Alert 타입
  showAlert: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  isVisible: false,
  message: '',
  type: 'info',
  showAlert: (message, type) => {
    setTimeout(() => set({ isVisible: false, message: '', type: 'info' }), 2000);
    set({ isVisible: true, message, type });
  },
}));
