export const isAuthenticated = () => sessionStorage.getItem('TOKEN') !== null;

export const hasTokenLocalStorage = () => localStorage.length

export const getTokenLocalStorage = () => localStorage.getItem('TOKEN')?.replace('"', '').replace('"', '');
export const getTokenSessionStorage = () => sessionStorage.getItem('TOKEN')?.replace('"', '').replace('"', '');

export const loginLocalStorage = (token: string, id: string) => {
    localStorage.setItem('TOKEN', JSON.stringify(token));
    localStorage.setItem('USER_ID', JSON.stringify(id));
};

export const loginSessionStorage = (token: string, id: string) => {
    sessionStorage.setItem('TOKEN', JSON.stringify(token));
    sessionStorage.setItem('USER_ID', JSON.stringify(id));
};

export const logout = () => {
    localStorage.removeItem('TOKEN');
    sessionStorage.removeItem('TOKEN')
    localStorage.removeItem('USER_ID');
    sessionStorage.removeItem('USER_ID')
};