import { StyleSheet } from "react-native";

const ShoppingCartScreenStyle = StyleSheet.create({
      searchContainer:{
        flexDirection: 'row',
        alignSelf: 'center', // Centers children horizontally
        marginVertical: 10, // Optional: adds spacing around the container
        height:44,
        width: '85%',
        borderRadius: 10,
        borderColor: '#83520A', // Brown border
        backgroundColor: 'white', // Ensures a visible shadow
        shadowColor: "#000", // Shadow color
        shadowOffset: { width: 0, height: 3 }, // Slightly adjusted for realistic shadow
        shadowOpacity: 0.2, // Softer shadow appearance
        shadowRadius: 6, // Smooth spread
        elevation: 6, 
      },
      searchIcon: {
        width: 20, // Set the image width
        height: 20,
        marginLeft: 10, // Adjust the margin to center the image
        alignSelf: 'center', // Center the image vertically
      },
      styleContainerFilter:{
        height: 30,
        width: 130,
        borderRadius:10,
        backgroundColor:'#83520A',
        margin: 2,
        justifyContent: "center",
        alignItems: "center",
      },
      styleTextFilter:{
        fontWeight: "bold",
        fontFamily:'Poppins',
        color:'white'
      },
      shoppingCartIcon:{
        width: 25,
        height: 25,
        alignSelf: 'center',
        marginLeft: 20,
        marginTop:20,
      },
      textProduct:{
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#83520A',
        marginLeft:40,
        marginTop: 10,
        marginBottom: 10,
      },
      containerListProduct:{
        height:550,
        width:"102%",
        alignSelf:'center',
        marginTop:-5,
      },
      containerProduct:{
        width:"97%",
        height:70,
        borderColor:'#83520A',
        borderRadius:10,
        marginTop:10,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: "#000", // Shadow color
        shadowOffset: { width: 0, height: 3 }, // Slightly adjusted for realistic shadow
        shadowOpacity: 0.2, // Softer shadow appearance
        shadowRadius: 2, // Smooth spread
        elevation: 4, 
        alignSelf:'center',
      },
      productNameStyle:{
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#83520A',
        marginTop:10,
      },
      productPriceStyle:{
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#83520A',
        marginTop:5,
      },
      productImage:{
        height:70,
        width:70,
        borderRadius:10,
      },
      quantityContainer: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent:'center',
        borderWidth: 1,
        borderColor: "#d9ad65",
        borderRadius: 5,
        overflow: "hidden",
        height: 30,
        width:95,
        marginVertical:'auto',
        position: "absolute", 
        right: 10, 
      },
      quantityButton: {
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        alignSelf:'center',
      },
      buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#5c3e1d",
      },
      quantityText: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#5c3e1d",
        backgroundColor: "#f7f1e8",
        textAlign: "center",
      }

})

export default ShoppingCartScreenStyle;