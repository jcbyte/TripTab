import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Record from "../types/Record";
import { formatMileageCost, mileageCost } from "../utils";

export default function ListItem({
	item,
	prevItemMileage,
	openModal,
}: {
	item: Record;
	prevItemMileage: number;
	openModal: () => void;
}) {
	return (
		<TouchableOpacity style={styles.item} onPress={openModal}>
			<View style={{ display: "flex", flexDirection: "column" }}>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<Text style={{ ...styles.text, flex: 1 }}>{item.milage - prevItemMileage} Miles</Text>
					<Text style={styles.text}>£{item.cost}</Text>
				</View>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<Text style={{ ...styles.secondaryText, flex: 1 }}>{item.milage}</Text>
					<Text style={styles.secondaryText}>
						£{formatMileageCost(mileageCost(item.milage, prevItemMileage, item.cost))}/mi
					</Text>
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
