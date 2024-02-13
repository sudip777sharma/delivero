import {
  View,
  Text,
  ScrollView,
  TouchableOpacityBase,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getCategories } from "../api";
import { urlFor } from "../sanity";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      // console.log("data", data);
      setCategories(data);
    });
  }, []);
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category, index) => {
          let isActive = category._id === activeCategory;
          let btnClass = isActive ? "#4B5563" : "#E5E7EB";
          let textClass = isActive
            ? "font-semibold text-gray-800"
            : "text-gray-500";
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                style={{ backgroundColor: btnClass }}
                onPress={() => setActiveCategory(category._id)}
                className={`p-1 rounded-full shadow"}`}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  className="rounded-full"
                  source={{ uri: urlFor(category.image).url() }}
                />
              </TouchableOpacity>
              <Text className={"" + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
