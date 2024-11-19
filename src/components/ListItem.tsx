import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Record from "../types/Record";

export default function ListItem({ item, openModal }: { item: Record; openModal: () => void }) {
	return (
		<TouchableOpacity style={styles.item} onPress={openModal}>
			<View style={{ display: "flex", flexDirection: "column" }}>
				<View style={{ display: "flex", flexDirection: "row" }}>
					{/* // todo milage since last record */}
					<Text style={{ ...styles.text, flex: 1 }}>{item.milage - 1} Miles</Text>
					<Text style={styles.text}>£{item.cost}</Text>
				</View>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<Text style={{ ...styles.secondaryText, flex: 1 }}>{item.milage}</Text>
					<Text style={styles.secondaryText}>£0.23/mi</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = {
	item: {
		padding: 16,
		backgroundColor: "#F9F9F9",
		borderRadius: 8,
		marginBottom: 10,
	},
	text: {
		fontSize: 18,
	},
	secondaryText: {
		fontSize: 12,
		color: "#777",
	},
};
