import { StyleSheet } from 'react-native'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'

const styles = StyleSheet.create({


    login: {
        flex: 0.6,
        backgroundColor: '#F0F0F7',
    },

    topBar: {
        flex: 0.2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },

    back: {
        marginLeft: '10%'
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        marginLeft: 40
    },

    titleBig: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 82,
        color: '#32264D',
        marginLeft: '10%'
    },

    desc: {
        fontSize: 14,
        lineHeight: 24,
        color: '#6A6180',
        marginLeft: '10%',
        marginBottom: 30
    },

    title: {
        fontStyle: 'normal',
        fontWeight: 'bold',
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
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },

    input2: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
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
})

export default styles