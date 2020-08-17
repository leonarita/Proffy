import { StyleSheet } from 'react-native'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import { Archivo_700Bold } from '@expo-google-fonts/archivo'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
    },

    top: {
        backgroundColor: '#8257E5',
        padding: 40,
        flex: 0.43
    },

    data: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center"
    },

    userData: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center"
    },

    photo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 13
    },

    name: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: '#D4C2FF',
        textAlign: "center",
        marginHorizontal: 20,
        alignContent: "center",
        alignSelf: "center",
    },

    banner: {
        width: '100%',
        resizeMode: 'contain'
    },

    title: {    
        fontFamily: 'Poppins_400Regular',
        color: '#6A6180',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 30
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },

    sair: {
        height: 44,
        width: 44
    },

    bottom: {
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 40,
        flex: 0.57
    },

    buttonsContainer: {
        flexDirection: "row",
        marginTop: 30,
        justifyContent: "space-between"
    },

    button: {
        height: 150,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: "space-between"
    },

    buttonPrimary: {
        backgroundColor: '#9871f5'
    },

    buttonSecondary: {
        backgroundColor: '#04d361'
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#9C98A6',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 20,
    }
})

export default styles

