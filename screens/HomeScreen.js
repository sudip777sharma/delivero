import { View, Text, TextInput, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
// import { featured } from "../constants";
import FeaturedRow from "../components/FeaturedRow";
import { getFeaturedRestaurants } from "../api";

const HomeScreen = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  useEffect(() => {
    getFeaturedRestaurants().then((data) => {
      // console.log(data);
      setFeaturedRestaurants(data);
    });
  }, []);
  return (
    <SafeAreaView className="bg-white">
      <StatusBar style="dark" />
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-2 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="18" width="18" stroke="gray" />
            <Text className="text-gray-600">New York, NYC</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 bg-gray-300 rounded-full"
        >
          <Icon.Sliders
            height="20"
            width="20"
            stroke="white"
            strokeWidth={2.5}
          />
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="bg-gray-300 rounded-full"
        >
          <Image
            className="w-10 h-10 rounded-full"
            source={require("../assets/images/deliveryGuy.jpeg")}
          />
        </View>
      </View>
      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {/* categories */}
        <Categories />

        {/* featured */}
        <View className="mt-5">
          {featuredRestaurants.map((item, index) => {
            // console.log("item", item);
            return (
              <FeaturedRow
                key={index}
                title={item.name}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
