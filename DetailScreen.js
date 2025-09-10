import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { MotiView } from "moti";
import { Audio } from "expo-av";

// Map of signs → image
const zodiacSigns = [
  { name: "Aries", image: require("../assets/aries-1.png") },
  { name: "Taurus", image: require("../assets/taurus.png") },
  { name: "Gemini", image: require("../assets/gemini.png") },
  { name: "Cancer", image: require("../assets/cancer.png") },
  { name: "Leo", image: require("../assets/leo.png") },
  { name: "Virgo", image: require("../assets/virgo.png") },
  { name: "Libra", image: require("../assets/libra.png") },
  { name: "Scorpio", image: require("../assets/scopio.png") },
  { name: "Sagittarius", image: require("../assets/sactirus.png") },
  { name: "Capricorn", image: require("../assets/capricorn.png") },
  { name: "Aquarius", image: require("../assets/aquarius.png") },
  { name: "Pisces", image: require("../assets/pisches.png") },
];

const GEMINI_API_KEY = "ADD API KEY HERE"; // replace with your real key

export default function DetailScreen() {
  const route = useRoute();
  const { sign } = route.params;

  const [loading, setLoading] = useState(true);
  const [parsed, setParsed] = useState({ today: "", tomorrow: "", weekly: "", monthly: "" });
  const [sound, setSound] = useState();

  // Get the image for this sign
  const signData = zodiacSigns.find((z) => z.name === sign);

  // Play sound when messages appear
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/noti-1.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.log("Error playing sound", err);
    }
  };

  useEffect(() => {
    if (!loading) {
      playSound();
    }
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [loading]);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const prompt = `
        Generate a horoscope for ${sign}.
        Structure response like this (no extra intro, no markdown formatting):
        Today's Message: ...
        Tomorrow's Message: ...
        Weekly Message: ...
        Monthly Message: ... 
        Standout Days: (3 numbers)
        Challenging Days: (3 numbers)
        Today is ${today.toDateString()}, Tomorrow is ${tomorrow.toDateString()}.
        `;

        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-goog-api-key": GEMINI_API_KEY,
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Parse the text into sections
        const todayMatch = text.match(/Today's Message:(.*?)(Tomorrow's Message:|$)/s);
        const tomorrowMatch = text.match(/Tomorrow's Message:(.*?)(Weekly Message:|$)/s);
        const weeklyMatch = text.match(/Weekly Message:(.*?)(Monthly Message:|$)/s);
        const monthlyMatch = text.match(/Monthly Message:(.*?)(Standout Days:|$)/s);
        const standoutMatch = text.match(/Standout Days:(.*?)(Challenging Days:|$)/s);
        const challengingMatch = text.match(/Challenging Days:(.*)/s);

        setParsed({
          today: todayMatch ? todayMatch[1].trim() : "",
          tomorrow: tomorrowMatch ? tomorrowMatch[1].trim() : "",
          weekly: weeklyMatch ? weeklyMatch[1].trim() : "",
          monthly:
            (monthlyMatch ? monthlyMatch[1].trim() : "") +
            (standoutMatch ? `\n\n⭐ Standout Days: ${standoutMatch[1].trim()}` : "") +
            (challengingMatch ? `\n⚡ Challenging Days: ${challengingMatch[1].trim()}` : ""),
        });
      } catch (err) {
        console.error(err);
        setParsed({
          today: "Error fetching horoscope.",
          tomorrow: "",
          weekly: "",
          monthly: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [sign]);

  const renderBubble = (title, content, delay) =>
    content ? (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay, duration: 500 }}
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#004080" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#333", marginTop: 6 }}>{content}</Text>
      </MotiView>
    ) : null;

  return (
    <LinearGradient
      colors={["#ffffff", "#87CEFA"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            color: "#004080",
          }}
        >
          {sign}
        </Text>

        {/* Sign Icon */}
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          {signData?.image && (
            <Image
              source={signData.image}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Horoscope Messages */}
        {loading ? (
          <ActivityIndicator size="large" color="#004080" />
        ) : (
          <>
            {renderBubble("Today's Message", parsed.today, 200)}
            {renderBubble("Tomorrow's Message", parsed.tomorrow, 400)}
            {renderBubble("Weekly Message", parsed.weekly, 600)}
            {renderBubble("Monthly Message", parsed.monthly, 800)}
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}


