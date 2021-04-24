import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar as RNStatusBar,
  Platform,
  Animated,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-elements";
import Slider from "@react-native-community/slider";
import Switches from "react-native-switches";
import { Button } from "react-native-elements/dist/buttons/Button";
import { MaterialIcons } from "@expo/vector-icons";
import Clipboard from "expo-clipboard";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function App() {
  const [length, setLength] = useState(7);
  const [checked, setChecked] = useState({
    switch1: false,
    switch2: false,
    switch3: false,
  });
  const [password, setPassword] = useState("Password");
  const [copied, setCopied] = useState("");

  function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

  const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
  const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
  const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
  const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

  const handlePress = () => {
    const pass = generatePassword();
    setPassword(pass);
  };

  const generatePassword = () => {
    let charCodes = LOWERCASE_CHAR_CODES;
    if (checked.switch1) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if (checked.switch2) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (checked.switch3) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < length; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
  };

  const copyToClipboard = async () => {
    Clipboard.setString(password);
    setCopied(true);
    // alert("Copied to clipboard!");
    ToastAndroid.showWithGravityAndOffset(
      "Copied to clipboard!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      15
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={styles.title}>
        Generate Password
      </Text>

      <View style={styles.generatedPasswordContainer}>
        <Text style={styles.name}>GENERATED PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <Text h3 style={styles.password}>
            {password}
          </Text>
          <View style={styles.space} />
          <TouchableOpacity onPress={copyToClipboard}>
            <MaterialIcons name="content-copy" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lengthContainer}>
        <Text style={styles.name}>LENGTH: {length}</Text>
        <View style={styles.rangeContainer}>
          <Text style={styles.text}>7</Text>
          <Slider
            step={1}
            style={{ width: 200, height: 40, marginLeft: 10, marginRight: 5 }}
            minimumValue={7}
            maximumValue={32}
            minimumTrackTintColor="#104DA4"
            maximumTrackTintColor="#0E2550"
            thumbTintColor="#FFFFFF"
            value={length}
            onValueChange={(value) => setLength(value)}
          />
          <Text style={styles.text}>32</Text>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.name}>SETTINGS</Text>
        <View style={styles.switchesContainer}>
          <Text style={styles.text}>Include numbers</Text>
          <Switches
            showText={false}
            shape={"pill"}
            value={checked.switch1}
            onChange={() =>
              setChecked({ ...checked, switch1: !checked.switch1 })
            }
            colorSwitchOff="#14244C"
            colorSwitchOn="#167AF6"
            buttonOffsetRight={4}
            buttonOffsetLeft={2}
          />
        </View>

        <View style={styles.space} />

        <View style={styles.switchesContainer}>
          <Text style={styles.text}>Include uppercase</Text>
          <Switches
            showText={false}
            shape={"pill"}
            value={checked.switch2}
            onChange={() =>
              setChecked({ ...checked, switch2: !checked.switch2 })
            }
            colorSwitchOff="#14244C"
            colorSwitchOn="#167AF6"
            buttonOffsetRight={4}
            buttonOffsetLeft={2}
          />
        </View>

        <View style={styles.space} />

        <View style={styles.switchesContainer}>
          <Text style={styles.text}>Include symbols</Text>
          <Switches
            showText={false}
            shape={"pill"}
            value={checked.switch3}
            onChange={() =>
              setChecked({ ...checked, switch3: !checked.switch3 })
            }
            colorSwitchOff="#14244C"
            colorSwitchOn="#167AF6"
            buttonOffsetRight={4}
            buttonOffsetLeft={2}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <AnimatedLinearGradient
          colors={["rgb(41, 102, 242)", "rgb(48, 62, 143)"]}
          style={styles.button}
        >
          <Button
            onPress={handlePress}
            containerStyle={{ height: 50, width: "100%", paddingTop: 5 }}
            title="GENERATE PASSWORD"
          />
        </AnimatedLinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050F2E",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  title: {
    color: "white",
    marginTop: 40,
  },
  name: {
    color: "#2C375B",
    fontWeight: "bold",
  },
  generatedPasswordContainer: {
    alignSelf: "flex-start",
    marginTop: 30,
    padding: 10,
    width: "100%",
  },
  passwordContainer: {
    backgroundColor: "#091741",
    height: "auto",
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  password: {
    color: "white",
  },
  lengthContainer: {
    alignSelf: "flex-start",
    marginTop: 25,
    padding: 10,
    width: "100%",
  },
  rangeContainer: {
    backgroundColor: "#091741",
    height: 80,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  settingsContainer: {
    alignSelf: "flex-start",
    marginTop: 25,
    padding: 10,
    width: "100%",
  },
  switchesContainer: {
    backgroundColor: "#091741",
    height: 60,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
  space: {
    height: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 3,
  },
});
