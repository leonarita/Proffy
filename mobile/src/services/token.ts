import AsyncStorage from '@react-native-community/async-storage'

var TOKEN=''
var ID = 0

export const isAuthenticated = () => AsyncStorage.getItem('TOKEN') !== null;
export const getTokenAsyncStorage = () => AsyncStorage.getItem('TOKEN')

export const loginAsyncStorage = (token: string, id: string) => {
    AsyncStorage.setItem('TOKEN', JSON.stringify(token));
    AsyncStorage.setItem('USER_ID', JSON.stringify(id));

    getDataAsyncStorage()
};

export const getDataAsyncStorage = () => {
    AsyncStorage.getItem('TOKEN').then(response => {
        if(response)
            setToken(JSON.parse(response))
    })

    AsyncStorage.getItem('USER_ID').then(response => {
        if(response)
            setId(JSON.parse(response))
    })

    return getId()
}

export const setToken = (token: string) => {
    TOKEN = token
}

export const getToken = () => {
    return TOKEN.replace('"', '').replace('"', '')
}

export const setId = (id: number) => {
    ID = id
}

export const getId = () => {
    return ID
}

export const logout = () => {
    ID = 0
    TOKEN = ''

    AsyncStorage.clear()
}