import { StyleSheet } from 'react-native'
import { Archivo_700Bold } from '@expo-google-fonts/archivo'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40,
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    banner: {
        width: '60%',
        height: '30%',
        resizeMode: 'contain',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    title: {
        lineHeight: 37,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: "bold"
    },

    desc: {
        color: '#D4C2FF',
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        lineHeight: 24,
        fontWeight: "normal",
        textAlign: 'center',
        fontSize: 14,
        
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

