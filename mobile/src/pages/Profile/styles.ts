import { StyleSheet } from 'react-native'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'

const styles = StyleSheet.create({

    all: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },

    header: {
        flex: 0.4,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40,
    },

    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    photo: {
        borderRadius: 50,
        height: 105,
        width: 105,
        alignSelf: "center"
    },

    upload: {
        backgroundColor: '#000',
        width: 24,
        height: 24,
        borderRadius: 50,
        position: 'absolute',
        marginLeft: 200
    },

    name: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 24,
        alignSelf: "center",
        marginTop: 20,
        lineHeight: 25,
    },

    subject: {
        color: '#D4C2FF',
        alignSelf: "center",
        fontSize: 16,
        lineHeight: 26
    },

    scroll: {
        flex: 0.4,
        marginTop: -20
    },

    container: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#e6e6f0',
        borderRadius: 8,
        overflow: 'hidden'
    },
    
    inputBlock: {
        paddingBottom: 20
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#32264D',
        lineHeight: 30,
        marginLeft: '10%',
        marginTop: 20,
        marginBottom: 10
    },

    label: {
        fontSize: 14,
        lineHeight: 22,
        color: '#9C98A6',
        fontWeight: "normal",
        fontFamily: 'Poppins_400Regular',
        marginLeft: '10%',
        marginTop: 10
    },

    input: {
        borderRadius: 8,
        width: '80%',
        alignSelf: "center",
        backgroundColor: '#FAFAFC',
        borderColor: '#E6E6F0'
    },

    add: {
        alignContent: "center",
        color: '#8257E5',
        marginRight: '10%',
        marginTop: 20,
        marginBottom: 10
    },

    time: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    itemTime: {
        width: '50%'
    },

    delete: {
        alignSelf: "center",
        marginBottom: 10,
        marginTop: 5
    },

    deleteText: {
        color: '#E33D3D',
        fontWeight: '600',
        lineHeight: 20
    },

    submitButton: {     
        backgroundColor: '#04d361',
        height: 56,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },

    submitButtonText: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
    },
})

export default styles

