import { StyleSheet } from 'react-native'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'

const inputStyles = StyleSheet.create({
    input: {
        height: 54,
        width: '80%',
        backgroundColor: '#fafafc',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        paddingHorizontal: 16
    },

    submitButton: {     
        backgroundColor: '#04d361',
        height: 56,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    submitButtonText: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
    },
})

export default inputStyles