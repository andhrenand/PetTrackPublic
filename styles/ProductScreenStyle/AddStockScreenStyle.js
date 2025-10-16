import { StyleSheet } from "react-native";

const AddStockScreenStyle = StyleSheet.create({
  wholepage: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    marginTop: 100,
    alignSelf: 'center',
  },
  textLabel:{
    fontFamily: 'Poppins',
    fontSize: 14,
    marginLeft:25,
    color:'#83520A',
  },
  textInputStyle: {
    marginTop: 5,
    marginBottom:10,
    height: 40,
    width: '87%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#8D6E63',
    borderRadius: 90,
    paddingHorizontal: 10,
    backgroundColor:'rgba(195, 167, 113, 0.15)',
  },
  buttonStyle: {
    marginTop: 5,
    marginLeft: 25,
    width: 115,
    height:35,
    borderWidth:1,
    borderColor:'#8D6E63',
    backgroundColor:'rgba(195, 167, 113, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#83520A',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderColor: '#8D6E63',
    borderWidth: 1,
  },
  AddButtonStyle:{
    height: 49,
    width: 185,
    backgroundColor: "#83520A",
    alignSelf:'center',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 20,
  },
  TextAddStyle:{
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 25,
  },
  dropdown: {
    alignSelf: "center",
    backgroundColor: "rgba(195, 167, 113, 0.15)",
    borderColor: "#ccc",
    borderWidth: 1,
    borderColor: "#8D6E63",
    borderRadius: 20,
    width: "87%",
    height: 40,
    marginTop: 5,
    marginBottom: 15,
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    width: "87%",
    alignSelf: "center"  
  },
});

export default AddStockScreenStyle;
