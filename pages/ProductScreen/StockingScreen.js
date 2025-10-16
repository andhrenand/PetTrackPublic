import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import StockingScreenStyle from "../../styles/ProductScreenStyle/StockingScreenStyle";
import { useState, useEffect, useCallback } from "react";

export default function StockingScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const filterCategories = [
    { label: "All", value: null },
    { label: "Food", value: "Food" },
    { label: "Snack & Treat", value: "Snack & Treat" },
    { label: "Accesories", value: "Accesories" },
    { label: "Health & Care", value: "Health & Care" },
    { label: "Daily Essentials", value: "Daily Essentials" },
    { label: "Other", value: "Other" },
  ]

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const productsCollectionRef = collection(firestoreDb, "products");
      const querySnapshot = await getDocs(productsCollectionRef);

      if (!querySnapshot.empty) {
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  const pairProducts = (products) => {
    const pairs = [];
    for (let i = 0; i < products.length; i += 2) {
      pairs.push(products.slice(i, i + 2));
    }
    return pairs;
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = products.filter((product) =>
      product.productName && typeof product.productName === "string"
        ? product.productName.toLowerCase().includes(text.toLowerCase())
        : false
    );
    setFilteredProducts(filtered);
  };

  const renderProductPair = ({ item }) => (
    <View style={StockingScreenStyle.pairContainer}>
      {item.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={StockingScreenStyle.productItem}
          onPress={() => navigation.navigate("Edit Stock", { product })}
        >
          {product.image ? (
            <Image
              source={{ uri: product.image }}
              style={StockingScreenStyle.productImage}
            />
          ) : (
            <View style={StockingScreenStyle.noImagePlaceholder}>
              <Text style={StockingScreenStyle.noImageText}>No Image</Text>
            </View>
          )}
          <View style={StockingScreenStyle.productInfo}>
            <Text style={StockingScreenStyle.productName}>
              {product.productName}
            </Text>
            <Text style={StockingScreenStyle.productDetails}>
              Amount: {product.productAmount}
            </Text>
            <Text style={StockingScreenStyle.productDetails}>
              Price: {product.price}
            </Text>
            <Text style={StockingScreenStyle.productDescription}>
              {product.productDescription}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      {item.length < 2 && <View style={StockingScreenStyle.emptyItem} />}
    </View>
  );

  return (
    <View style={StockingScreenStyle.wholepage}>
      <View style={{ flexDirection: "row", marginTop: 20, alignSelf:'center'}}>
        <View style={StockingScreenStyle.searchContainer}>
          <Image
            source={require("../../assets/searchIcon.png")}
            style={StockingScreenStyle.searchIcon}
          />
          <TextInput
            style={{
              marginLeft: 10,
              fontFamily: "Poppins",
              fontSize: 16,
              width: "100%",
            }}
            placeholder="Search Products....."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Categories Filter */}
      <View
        style={{
          height: 40,
          width: '93%',
          marginTop: 10,
         alignSelf:'center',
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
         
        >
          {filterCategories.map((category, index) => (
      <TouchableOpacity
        key={index}
        style={StockingScreenStyle.styleContainerFilter}
        onPress={() => {
          if (category.value === null) {
            setFilteredProducts(products); // Show all
          } else {
            setFilteredProducts(
              products.filter((product) => product.category === category.value)
            );
          }
        }}
      >
        <Text style={StockingScreenStyle.styleTextFilter}>
          {category.label}
        </Text>
      </TouchableOpacity>
    ))}
       </ScrollView>
      </View>

      {/* Product List */}
      <View style={StockingScreenStyle.containerListOfProduct}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FF6347"
            style={StockingScreenStyle.loader}
          />
        ) : filteredProducts.length === 0 ? (
          <Text style={StockingScreenStyle.noProductsText}>
            No products available.
          </Text>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={pairProducts(filteredProducts)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderProductPair}
            contentContainerStyle={StockingScreenStyle.listContainer}
          />
        )}
      </View>

      {/* Add Product Button */}
      <TouchableOpacity
        style={{
          width: 200,
          height: 45,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 8,
          backgroundColor: "#83520A",
          marginTop: 20,
          alignSelf: "center",
          justifyContent:'center',
          borderRadius:90,
        }}
        onPress={() => navigation.navigate("Add Stock Screen")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 5,
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          Add product
        </Text>
      </TouchableOpacity>
    </View>
  );
}