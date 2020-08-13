import { StyleSheet } from 'react-native'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'

const styles = StyleSheet.create({

    header: {
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

    container: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#e6e6f0',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden'
    },

    profile: {
        flexDirection: "row",
        alignItems: "center",
        padding: 24
    },
})

export default styles

