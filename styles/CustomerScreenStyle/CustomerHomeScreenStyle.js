import { StyleSheet } from "react-native";

const CustomerHomeScreenStyle = StyleSheet.create({
    headerImage:{
        alignSelf: "center",
        marginTop:20,
        width: 360,
    },
    homeContainer:{
        height:392,
        width:360,
        backgroundColor:'rgba(195, 167, 113, 0.3)',
        alignSelf: "center",
        marginTop:20,
        borderRadius: 10,
        alignSelf:'center',
        padding:20,
    },
    descAppText:{
        marginTop: 15,
    marginHorizontal: 15, // Tambahkan padding agar teks tidak menempel ke sisi
    textAlign: "center",
    fontSize: 18, // Ukuran font lebih besar
    color: '#6D4C41', // Warna lebih lembut (coklat tua)
    fontWeight: "bold",
    fontStyle: "italic", // Memberikan efek italic untuk menambah estetika
    lineHeight: 24, // Sesuaikan dengan fontSize agar lebih nyaman dibaca
    textShadowColor: "rgba(0, 0, 0, 0.2)", // Menambah sedikit shadow agar terlihat lebih hidup
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2,
        
    },
    buttoncheckpet:{
        height:44,
        width:248,
        backgroundColor:'white',
        alignContent: "center",
        justifyContent: "center",
        alignItems:'center',
        alignSelf: "center",
        position: "absolute", // Positioning it absolutely relative to homeContainer
        bottom: 20, // Moves it outside the box
        borderRadius: 8,
        elevation: 3, 
    },
    descbutton:{
        color:'#83520A',
        fontWeight: "bold",
    }

})

export default CustomerHomeScreenStyle;