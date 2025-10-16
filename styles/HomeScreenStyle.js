import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const HomeScreenStyles = StyleSheet.create({
  wholepage: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    backgroundColor: "rgba(195, 167, 113, 0.3)",
    marginTop: hp("5%"),
    borderRadius: wp("5%"),
    alignSelf: "center",
    height: hp("6%"),
    width: wp("90%"),
    justifyContent: "center",
    paddingLeft: wp("5%"),
  },
  styleWelcome: {
    fontSize: wp("7%"),
    fontFamily: "Poppins",
    fontWeight: "bold",
    textAlign: "left",
    color: "#83520A",
  },
  MenuContainer: {
    backgroundColor: "rgba(195, 167, 113, 0.3)",
    height: hp("52%"),
    width: wp("90%"),
    marginTop: hp("2%"),
    alignSelf: "center",
    alignItems: "center",
    borderRadius: wp("5%"),
  },
  TextService: {
    alignSelf: "center",
    marginTop: hp("2%"),
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: "#83520A",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Spread buttons evenly across the row
    marginVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
  },
  ContainerButtonService: {
    height: hp("17%"),
    width: wp("40%"),
    marginTop: hp("1%"),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("5%"),
    marginHorizontal: wp("2%"),
  },
  textPet: {
    color: "#83520A",
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginTop: hp("1%"),
  },
});

export default HomeScreenStyles;
