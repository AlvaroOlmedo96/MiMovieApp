import { StyleSheet } from "react-native";


export const appTheme = StyleSheet.create({
    navbarTop:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        right: 5,
        paddingVertical: 10,
    },
    sectionTitle:{
        color: 'black',
        fontSize:20, 
        fontWeight: 'bold'
    },
    sectionSubTitle:{
        color: 'white',
        fontSize:16, 
        fontWeight: 'bold'
    },
    sectionText:{
        color: 'white',
        fontSize:18,
    },
    backButton:{
        position: 'absolute',
        zIndex: 99,
        elevation: 99,
        top: 40,
        left: 15,
        backgroundColor: 'black',
        borderRadius: 100,
    },
    modalCentered:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        backgroundColor: "white",
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
    modalContainerPoster: {
        flex: 1,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
    modalPoster:{
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
    castButton: {
        height: 24,
        width: 24,
        marginRight: 10,
        marginTop: 10,
        tintColor: 'black',
    },
});