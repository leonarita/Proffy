import { StyleSheet } from 'react-native'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'

const styles = StyleSheet.create({


    login: {
        flex: 0.6,
        backgroundColor: '#F0F0F7',
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        marginLeft: 40
    },

    title: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 34
    },

    createAccount: {

    },

    createAccountText: {
        color: '#8257E5',
        lineHeight: 34,
        fontSize: 12,
        backgroundColor: '#F0F0F7',
    },

    input1: {
        height: 54,
        width: '80%',
        backgroundColor: '#fafafc',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        paddingHorizontal: 16
    },

    input2: {
        height: 54,
        width: '80%',
        backgroundColor: '#fafafc',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        paddingHorizontal: 16
    },

    buttonsExtras: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20
    },

    check: {
        flexDirection: "row",
        alignItems: 'center'
    },

    checkText: {
        color: '#9C98A6'
    },

    forget: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 5,
        color: '#9C98A6'
    },

    submitButton: {     
        backgroundColor: '#04d361',
        height: 56,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: '80%',
        alignSelf: 'center',
        marginTop: '8%',
    },

    submitButtonText: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
    },
})

export default styles