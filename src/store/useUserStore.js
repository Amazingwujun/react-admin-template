import {create} from 'zustand'

const useUserStore = create((set) => ({
    authState: false,
    username: '',
    collapsed: false,
    rememberMe: false,
    updateAuthState: (state) => set(() => ({authState: state})),
    updateUsername: (uname) => set(() => ({username: uname})),
    updateCollapsed: () => set(t => ({collapsed: !t.collapsed})),
    updateRememberMe: t => set(() => ({rememberMe: t})),
}));

export default useUserStore;