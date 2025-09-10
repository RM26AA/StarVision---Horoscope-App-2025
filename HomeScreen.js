import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const zodiacSigns = [
  { name: "Aries", date: "Mar 21 - Apr 19", image: require("../assets/aries-1.png") },
  { name: "Taurus", date: "Apr 20 - May 20", image: require("../assets/taurus.png") },
  { name: "Gemini", date: "May 21 - Jun 20", image: require("../assets/gemini.png") },
  { name: "Cancer", date: "Jun 21 - Jul 22", image: require("../assets/cancer.png") },
  { name: "Leo", date: "Jul 23 - Aug 22", image: require("../assets/leo.png") },
  { name: "Virgo", date: "Aug 23 - Sep 22", image: require("../assets/virgo.png") },
  { name: "Libra", date: "Sep 23 - Oct 22", image: require("../assets/libra.png") },
  { name: "Scorpio", date: "Oct 23 - Nov 21", image: require("../assets/scopio.png") },
  { name: "Sagittarius", date: "Nov 22 - Dec 21", image: require("../assets/sactirus.png") },
  { name: "Capricorn", date: "Dec 22 - Jan 19", image: require("../assets/capricorn.png") },
  { name: "Aquarius", date: "Jan 20 - Feb 18", image: require("../assets/aquarius.png") },
  { name: "Pisces", date: "Feb 19 - Mar 20", image: require("../assets/pisches.png") },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 10,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 16,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
      onPress={() => navigation.navigate("Detail", { sign: item.name })}
    >
      <Image
        source={item.image}
        style={{ width: 60, height: 60, marginBottom: 8 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#004080", textAlign: "center" }}>
        {item.name}
      </Text>
      <Text style={{ fontSize: 12, color: "#555", marginTop: 2, textAlign: "center" }}>
        {item.date}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      {/* Header */}
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#004080" }}>
          Choose Your Sign
        </Text>
        <Text style={{ fontSize: 14, color: "#555", marginTop: 4 }}>
          Select your zodiac sign to read today’s horoscope
        </Text>
      </View>

      {/* Grid */}
      <FlatList
        data={zodiacSigns}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
