import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles as globalStyles } from "../styles";
import { formatCost } from "../utils";

export default function MileageBox({ openModal }: { openModal: () => void }) {
	return (
		<View style={styles.box}>
			<Text style={styles.titleText}>Cost per Mile</Text>
			<View style={{ display: "flex", flexDirection: "row" }}>
				<Text style={{ ...styles.mileageText, flex: 1 }}>{formatCost(0.16)}</Text>
				<TouchableOpacity activeOpacity={0.6} style={globalStyles.button} onPress={openModal}>
					<Text style={globalStyles.buttonText}>New Record</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	box: {
		padding: 16,
		backgroundColor: "#F9F9F9",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	titleText: {
		fontSize: 24,
		fontWeight: "semibold",
		textAlign: "left",
	},
	mileageText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		textAlign: "left",
	},
});
