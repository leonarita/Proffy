import { StyleSheet } from 'react-native'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'

const styles = StyleSheet.create({

    iconBack: {
        marginLeft: 50,
        marginTop: 20
    },

    login: {
        flex: 0.6,
        backgroundColor: '#F0F0F7',
    },

    header: {
        flexDirection: "column",
        margin: 20,
        marginLeft: 40
    },

    title: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 34
    },

    sub: {
        color: '#6A6180',
        lineHeight: 24,
        fontSize: 14,
        backgroundColor: '#F0F0F7',
        marginTop: 20
    },
})

export default styles