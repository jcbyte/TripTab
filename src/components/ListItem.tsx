import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Record } from "../types/Record";

export default function ListItem({
	item,
	index,
	openModal,
}: {
	item: Record;
	index: number;
	openModal: (ref: "new" | number) => void;
}) {
	return (
		<TouchableOpacity style={styles.listItem} onPress={() => openModal(index)}>
			<View style={{ display: "flex", flexDirection: "column" }}>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<Text style={{ ...styles.listText, flex: 1 }}>{item.milage} Miles</Text>
					<Text style={styles.listText}>£{item.cost}</Text>
				</View>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<Text style={{ ...styles.listSecondaryText, flex: 1 }}>{item.date.toUTCString()}</Text>
					<Text style={styles.listSecondaryText}>£0.23/mi</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = {
	listItem: {
		padding: 16,
		backgroundColor: "#F9F9F9",
		borderRadius: 8,
		marginBottom: 10,
	},
	listText: {
		fontSize: 18,
	},
	listSecondaryText: {
		fontSize: 12,
		color: "#777",
	},
};
