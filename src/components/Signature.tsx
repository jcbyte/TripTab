import Constants from "expo-constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Theme, useTheme } from "../hooks/Theme";

export default function Signature() {
	const { theme, styles } = useTheme();
	const myStyles = getMyStyles(theme);

	return (
		<View style={myStyles.signature}>
			<Text style={myStyles.text}>TripTab v{Constants.expoConfig?.version ?? "(Unknown Version)"}</Text>
			<Text style={myStyles.text}>By Joel Cutler</Text>
			{__DEV__ && <Text style={myStyles.devText}>Dev Build</Text>}
		</View>
	);
}

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		text: {
			color: theme.shaded.colour,
			textAlign: "right",
		},
		devText: {
			color: "#ff0000",
			textAlign: "right",
		},
		signature: {
			position: "absolute",
			bottom: 0,
			right: 0,
			padding: 10,
		},
	});
