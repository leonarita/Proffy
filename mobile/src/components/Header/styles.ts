import { StyleSheet } from 'react-native'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'

const styles = StyleSheet.create({

    container: {
        flex: 0.4,
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

    desc: {
        color: '#D4C2FF',
        width: '40%',
        alignSelf: 'center',
        marginTop: '2%'
    },
})

export default styles