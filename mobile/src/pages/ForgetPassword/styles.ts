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

    input: {
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
        paddingHorizontal: 16,
        marginTop: 20
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