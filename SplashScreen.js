import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ArrowRight } from "lucide-react-native";
import { MotiView } from "moti";

export default function SplashScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#ffffff", "#87CEFA"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* Logo */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
      >
        <Image
          source={require("../assets/logo-2.png")}
          style={{ width: 120, height: 120, marginBottom: 20 }}
          resizeMode="contain"
        />
      </MotiView>

      {/* App Name */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 500, duration: 800 }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#004080" }}>
          StarVision
        </Text>
      </MotiView>

      {/* Get Started Button */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1000, duration: 800 }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#004080",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 25,
            marginTop: 40,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            Read Future
          </Text>
          <ArrowRight color="white" size={22} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </MotiView>
    </LinearGradient>
  );
}
