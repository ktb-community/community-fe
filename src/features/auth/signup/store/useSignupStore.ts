import { create } from 'zustand';
import { SignupRequest } from '@/entities/auth/types.ts';

type DuplicationProps = "emailDuplication" | "nicknameDuplication"

type SignupState = {
  emailDuplication: boolean;
  nicknameDuplication: boolean;
  setField: (field: keyof SignupRequest | 'passwordCheck', value: string | File | null) => void;
  setDuplication: (field: DuplicationProps, value: boolean) => void;
}

const useSignupStore = create<SignupState>((set) => ({
  emailDuplication: false,
  nicknameDuplication: false,
  setDuplication: (field: DuplicationProps, value: boolean) => set((state) => ({ ...state, [field]: value })),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export default useSignupStore;