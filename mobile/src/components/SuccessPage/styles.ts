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

    done: {
        height: 100,
        width: 100,
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 20
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
})

export default styles

