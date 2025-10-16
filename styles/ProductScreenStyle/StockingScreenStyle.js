import { StyleSheet } from "react-native";

const StockingScreenStyle = StyleSheet.create({
  wholepage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding:5,
  },
  searchContainer: {
    alignSelf: 'center', // Centers children horizontally
    marginVertical: 10, // Optional: adds spacing around the container
    height: 44,
    width: '92%',
    borderRadius: 15,
    flexDirection: 'row',
    borderColor: '#83520A', // Brown border
    backgroundColor: 'white', // Ensures a visible shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Slightly adjusted for realistic shadow
    shadowOpacity: 0.2, // Softer shadow appearance
    shadowRadius: 6, // Smooth spread
    elevation: 6, // For Android shadow
  },
  Icon:{
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginLeft: 10,
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
    justifyContent: "center",
    alignItems: "center",
    margin:2,
  },
  styleTextFilter:{
    fontWeight: "bold",
    fontFamily:'Poppins',
    color:'white'
  },
  container: {
    flex: 1,
    paddingTop: 50,
    height: 19
  },
  listContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Space between items
    paddingHorizontal: 10, // Adjust horizontal padding
  },
  pairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between pairs
    marginBottom: 15,
  },
  containerListOfProduct: {
    height: '65%',
    width: "100%",
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    justifyContent:'center',
    marginTop: 5,
    borderRadius: 20,
  },
  productItem: {
    width: '48%', // Adjust this value for item width (48% allows for two items with spacing)
    height: '100%',
    marginLeft: 5, // Space between products in the same row
    marginBottom: 10, // Space between products in the same row
    backgroundColor: 'rgba(195, 167, 113, 0.3)', // Background color for items
    borderRadius: 8,
    
  
    overflow: 'hidden',
  },
  emptyItem: {
    width: '48%', // Same width as productItem
    marginBottom: 10,
    backgroundColor: 'transparent', // Or any color to visually represent the empty space
  },
  productImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginBottom: 10, // Add margin at the bottom for spacing
    marginTop: 10,
    alignSelf: 'center'
  },
  noImagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignSelf: "center",
    alignContent: 'center',
    justifyContent: "center",
    marginBottom: 10, // Add margin at the bottom for spacing
    marginTop: 10,
  },
  noImageText: {
    color: "#888",
    fontSize: 12,
    alignSelf: 'center'
  },
  productInfo: {
    justifyContent: "center",
    alignItems: "flex-start", // Center the text below the image
    marginLeft: 5,
  },
  productName: {
    fontSize: 18,
    color: '#83520A',
    fontWeight: "bold",
    textAlign: "flex-start", // Center align the product name
  },
  productDetails: {
    marginTop: 5,
    fontSize: 14,
    color: "#83520A",
    textAlign: "flex-start", // Center align the details
  },
  productDescription: {
    marginTop: 5,
    fontSize: 12,
    color: "#83520A",
    textAlign: "flex-start", // Center align the description
  },
  loader: {
    marginTop: 20,
  },
  noProductsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555'
  },
});

export default StockingScreenStyle;
