import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import ShoppingCartScreenStyle from "../../styles/PaymentScreenStyle/ShoppingCartScreenStyle";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function ShoppingCartScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]); // Cart to hold selected products
  const [transaction, setTransaction] = useState([]); // Transaction state
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filterProductList = [
    "All",
    "Food",
    "Snack & Treat",
    "Accesories",
    "Health & Care",
    "Daily Essentials",
    "Other",
  ];

  useEffect(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.productName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(firestoreDb, "products");
        const querySnapshot = await getDocs(productsCollectionRef);

        if (!querySnapshot.empty) {
          const productsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            productAmount: Number(doc.data().productAmount || 0), // Total stock available
            quantityToBuy: 0, // Initial quantity to buy is 0
          }));
          setProducts(productsArray);
          setFilteredProducts(productsArray);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products from Firestore: ", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = products.filter((product) =>
      product.productName && typeof product.productName === "string"
        ? product.productName.toLowerCase().includes(text.toLowerCase())
        : false
    );
    setFilteredProducts(filtered);
  };

  const handleIncreaseProductAmount = (productId) => {
    const updatedProducts = [...products];
    const product = updatedProducts.find((item) => item.id === productId);

    if (product && product.quantityToBuy < product.productAmount) {
      product.quantityToBuy += 1;

      // Update cart
      const updatedCart = [...cart];
      const cartItem = updatedCart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantityToBuy = product.quantityToBuy;
      } else {
        updatedCart.push({ ...product });
      }
      setCart(updatedCart);
    } else {
      alert("Quantity exceeds available stock!");
    }
    setProducts(updatedProducts);
  };

  const handleDecreaseProductAmount = (productId) => {
    const updatedProducts = [...products];
    const product = updatedProducts.find((item) => item.id === productId);

    if (product && product.quantityToBuy > 0) {
      product.quantityToBuy -= 1;

      // Update cart
      const updatedCart = [...cart];
      const cartItem = updatedCart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantityToBuy = product.quantityToBuy;
        if (cartItem.quantityToBuy === 0) {
          const index = updatedCart.indexOf(cartItem);
          updatedCart.splice(index, 1); // Remove item from cart
        }
      }
      setCart(updatedCart);
    }
    setProducts(updatedProducts);
  };

  const calculateTotalCost = () => {
    return cart.reduce(
      (total, product) => total + (product.quantityToBuy || 0) * product.price,
      0
    );
  };

  const handleProceedToPayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add some products to proceed.");
      return;
    }

    const newTransaction = {
      id: `txn_${Date.now()}`, // Unique transaction ID
      items: cart,
      totalCost: calculateTotalCost(),
      timestamp: new Date(),
    };

    try {
      // Update transaction state
      setTransaction((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);

      // Navigate to the payment screen with cart data
      navigation.navigate("Payment Screen", { cart });
    } catch (error) {
      console.error("Error creating transaction: ", error);
      alert("Failed to create a transaction. Please try again.");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const productsCollectionRef = collection(firestoreDb, "products");
      const querySnapshot = await getDocs(productsCollectionRef);

      if (!querySnapshot.empty) {
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          productAmount: Number(doc.data().productAmount || 0),
          quantityToBuy: 0,
        }));
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error refreshing products:", error);
      Alert.alert("Error", "Failed to refresh product list.");
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View style={{ padding: 15 }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
          borderWidth: 0,
        }}
      >
        <View style={ShoppingCartScreenStyle.searchContainer}>
          <Image
            source={require("../../assets/searchIcon.png")}
            style={ShoppingCartScreenStyle.searchIcon}
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
        <TouchableOpacity onPress={handleProceedToPayment}>
          <Image
            source={require("../../assets/shoppingCart.png")}
            style={ShoppingCartScreenStyle.shoppingCartIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ width: "97.5%", height: 40 }}
      >
        {filterProductList.map((category) => (
          <TouchableOpacity
            key={category}
            style={ShoppingCartScreenStyle.styleContainerFilter}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={ShoppingCartScreenStyle.styleTextFilter}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text
        style={{
          fontSize: 20,
          marginTop: 7,
          fontFamily: "Poppins",
          fontWeight: "bold",
          color: "#83520A",
        }}
      >
        List of Product
      </Text>
      <View style={ShoppingCartScreenStyle.containerListProduct}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FF6347"
            style={{ marginTop: 20 }}
          />
        ) : error ? (
          <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>
            {error}
          </Text>
        ) : filteredProducts.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No products available.
          </Text>
        ) : (
          <ScrollView
            style={{
              marginTop: 10,
              width: "100%",
              borderWidth: 0,
              alignContent: "center",
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {filteredProducts.map((product) => (
              <View
                key={product.id}
                style={ShoppingCartScreenStyle.containerProduct}
              >
                {product.image && (
                  <Image
                    source={{ uri: product.image }}
                    style={ShoppingCartScreenStyle.productImage}
                  />
                )}
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text style={ShoppingCartScreenStyle.productNameStyle}>
                    {product.productName}
                  </Text>
                  <Text style={ShoppingCartScreenStyle.productPriceStyle}>
                    Rp.{product.price}
                  </Text>
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    Stock: {product.productAmount}
                  </Text>
                </View>
                <View style={ShoppingCartScreenStyle.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => handleDecreaseProductAmount(product.id)}
                    style={ShoppingCartScreenStyle.quantityButton}
                  >
                    <Text style={ShoppingCartScreenStyle.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={ShoppingCartScreenStyle.quantityText}>
                    {product.quantityToBuy || 0}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleIncreaseProductAmount(product.id)}
                    style={ShoppingCartScreenStyle.quantityButton}
                  >
                    <Text style={ShoppingCartScreenStyle.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
