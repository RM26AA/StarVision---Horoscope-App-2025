# StarVision - Modern Horoscope App

**StarVision** is a minimal, clean, and modern horoscope app built with **Expo (React Native + Web)**. It provides daily, weekly, and monthly horoscopes for all 12 zodiac signs, powered dynamically by the **Gemini API**. The app is fully animated, with smooth transitions, interactive UI, and sound effects to enhance the user experience.

---

## Features

- **12 Zodiac Signs**: Browse all signs in a sleek 3x4 grid.
- **Dynamic Horoscope Messages**: Daily, tomorrow, weekly, and monthly forecasts generated via the Gemini API.
- **Interactive Detail Screen**: Each sign has a dedicated page with title, icon, and horoscope messages displayed in animated bubble cards.
- **Modern Design**: White and blue gradient, minimalistic, clean interface.
- **Sound Effects**: Plays a notification sound when horoscope messages appear.
- **Cross-Platform**: Works on iOS, Android, and Web (Expo).

---

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/starvision.git
cd starvision
```

2. Install dependencies:

```
npm install
# or
yarn install
```

3. Install Expo dependencies (if not installed):

```
expo install expo-av expo-linear-gradient react-native-svg moti
```

4. Add your Gemini API key in DetailScreen.js:

```
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
```

5. Add your assets:

- Zodiac images in /assets
- Notification sound in /assets/noti-1.mp3

## Running the App

```
expo start
```

- Open on iOS Simulator, Android Emulator, or web browser.

## Project Structure

```
starvision/
│
├── assets/            # Images and sound files
├── pages/
│   ├── SplashScreen.js
│   ├── HomeScreen.js
│   └── DetailScreen.js
├── App.js             # Navigation
├── package.json
└── README.md
```

## Dependencies

- Expo
- React Native
- Moti (for animations)
- Expo AV (for sound)
- Expo LinearGradient

## License

This project is licensed under the MIT License.




















