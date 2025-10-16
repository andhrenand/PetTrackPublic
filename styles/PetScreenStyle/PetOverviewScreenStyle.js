import { StyleSheet } from "react-native";

const PetOverviewScreenStyle = StyleSheet.create({
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
    marginTop: 0,
    alignSelf: 'center',
  },
  SecondContainer: {
    paddingBottom:5,
    flexDirection: 'row',
    height: 95,
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
    elevation:4,
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
    
    flexDirection: 'row',
  },
  TextDescription: {
    alignSelf:'center',
    marginTop: 3,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '600',
    color: '#83520A',
  },
});

export default PetOverviewScreenStyle;
