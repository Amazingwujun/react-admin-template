import {create} from 'zustand'

const useUserStore = create((set) => ({
    hasAuth: false,
    username: '',
    token: '',
    collapsed: false,
    rememberMe: false,
    updateAuthState: (state) => set(() => ({hasAuth: state})),
    updateUsername: (uname) => set(() => ({username: uname})),
    updateToken: (token) => set(() => ({token: token})),
    updateCollapsed: () => set(t => ({collapsed: !t.collapsed})),
    updateRememberMe: t => set(() => ({rememberMe: t})),
}));

export default useUserStore;