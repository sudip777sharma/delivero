import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { featured } from "../constants";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../slices/cartSlice";
import { urlFor } from "../sanity";

const CartScreen = () => {
  // const restaurant = featured.restaurants[0];
  const restaurant = useSelector(selectRestaurant);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigation = useNavigation();
  const [groupedItems, setGroupedItems] = useState({});
  const dispatch = useDispatch();
  const deliveryFee = 2;
  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item._id]) {
        group[item._id].push(item);
      } else {
        group[item._id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="relative py-4 shadow-sm h-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 rounded-full p-1 top-5 left-2"
          style={{ backgroundColor: themeColors.bgColor(1) }}
        >
          <Icon.ArrowLeft strokeWidth={3} stroke={"white"} />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>

        {/* delivery time */}
        <View
          style={{ backgroundColor: themeColors.bgColor(0.2) }}
          className="flex-row px-4 items-center"
        >
          <Image
            source={require("../assets/images/bikeGuy.png")}
            className="w-20 h-20 rounded-full"
          />
          <Text className="flex-1 pl-4">Delivery in 20-30 minutes</Text>
          <TouchableOpacity>
            <Text className="font-bold" style={{ color: themeColors.text }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>

        {/* dishes  */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          className="bg-white pt-5"
        >
          {Object.entries(groupedItems).map(([key, items]) => {
            let dish = items[0];
            return (
              <View
                key={key}
                className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
              >
                <Text className="font-bold" style={{ color: themeColors.text }}>
                  {items.length} x
                </Text>
                <Image
                  className="h-14 w-14 rounded-full"
                  source={{ uri: urlFor(dish.image).url() }}
                />
                <Text className="flex-1 font-bold text-gray-700">
                  {dish.name}
                </Text>
                <Text className="font-semibold text-base">${dish.price}</Text>
                <TouchableOpacity
                  className="p-1 rounded-full"
                  style={{ backgroundColor: themeColors.bgColor(1) }}
                  onPress={() => dispatch(removeFromCart({ id: dish._id }))}
                >
                  <Icon.Minus
                    strokeWidth={2}
                    height={20}
                    width={20}
                    stroke={"white"}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* total */}
        <View
          style={{ backgroundColor: themeColors.bgColor(0.2) }}
          className="p-6 px-8 rounded-t-3xl space-y-4"
        >
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Sub Total</Text>
            <Text className="text-gray-700">${cartTotal}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Delivery fee</Text>
            <Text className="text-gray-700">${deliveryFee}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-700 font-extrabold">Total</Text>
            <Text className="text-gray-700 font-extrabold">
              ${deliveryFee + cartTotal}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderPreparing")}
              style={{ backgroundColor: themeColors.bgColor(1) }}
              className="p-3 rounded-full"
            >
              <Text className="text-white text-center  font-bold text-lg">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
