import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ListOfPetScreenStyle = StyleSheet.create({
  wholepage: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: width * 0.03,
  },
  title: {
    alignSelf: 'center',
    fontFamily: "Poppins",
    color: '#83520A',
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginLeft: width * 0.03,
    alignSelf: 'center'
  },
  filterIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginLeft: -width * 0.08,
    alignSelf: 'center',
    marginTop: height * 0.006,
    marginRight: width * 0.03
  },
  rfidIcon: {
    width: width * 0.07,
    height: width * 0.07,
    right: width * 0.06,
    alignSelf: 'center'
  },
  searchContainer: {
    marginLeft: -width * 0.12,
    alignSelf: 'center',
    marginTop: height * 0.03,
    height: height * 0.06,
    width: width * 0.7,
    borderRadius: 20,
    flexDirection: 'row',
    borderColor: '#83520A',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, 
  },
  searchButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  StyleOfList: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(195, 167, 113, 0.3)',
    borderColor: '#83520A',
    marginTop: height * 0.03,
    borderRadius: 10,
    width: "90%",
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  petInfoText: {
    fontSize: width * 0.04,
    color: '#838383',
  },
  petNameLabel: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: width * 0.06,
    color: '#83520A',
  },
  petTypeLabel: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: width * 0.04,
    color: '#83520A',
  },
  petAgeLabel: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: width * 0.03,
    marginTop: height * 0.002,
    color: '#83520A',
  },
  petImage: {
    width: height * 0.12,
    height: height * 0.12,
    borderRadius: 10,
    marginRight: width * 0.03,
  }
});

export default ListOfPetScreenStyle;