import { StyleSheet } from "react-native";

const CustomerPetOverviewScreenStyle = StyleSheet.create({
  wholepage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  FirstContainer: {
    backgroundColor: 'rgba(195, 167, 113, 0.3)',
    height: 256,
    width: '100%',
    alignItems: 'center',

  },
  ImageProfilePet: {
    height: 142,
    width: 136,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  SecondContainer: {
    justifyContent:'center',
    flexDirection: 'row',
    height: 99,
    width: 357,
    backgroundColor: '#FFFFFF',
    borderColor: '#C3A771',
    borderRadius: 20,
    marginTop: -40,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderColor: '#83520A',
    elevation:4
  },
  ContainerMedic: {
    height: 110,
    width: 355,
    borderWidth: 1,
    borderColor: '#83520A',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 16,
    padding: 10,
    justifyContent: 'center',
  },
  TextDescription: {
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '600',
    color: '#83520A',
  },
});

export default CustomerPetOverviewScreenStyle;
