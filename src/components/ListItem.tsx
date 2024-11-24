import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import UserSettingsContext from "../contexts/userSettingsContext";
import { CachedRecordTransition } from "../hooks/useCachedRecords";
import { colours } from "../styles";
import Record from "../types/Record";
import { formatCost, formatMileageCost } from "../utils";

export default function ListItem({
	item,
	cachedTransition,
	openModal,
}: {
	item: Record;
	cachedTransition: CachedRecordTransition;
	openModal: () => void;
}) {
	const { userSettings } = useContext(UserSettingsContext);

	return (
		<TouchableOpacity style={styles.item} onPress={openModal}>
			<View style={{ display: "flex", flexDirection: "column" }}>
				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					{item.type === "record" && <Text style={styles.text}>{cachedTransition!.miles} Miles</Text>}
					{item.type === "record" && <Text style={styles.text}>{formatCost(item.cost, userSettings.currency)}</Text>}
				</View>
				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<Text style={styles.secondaryText}>{item.mileage}</Text>
					{item.type === "record" && (
						<Text style={styles.secondaryText}>
							{formatMileageCost(cachedTransition!.cost, userSettings.currency, userSettings.distance)}
						</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = {
	item: {
		padding: 16,
		backgroundColor: colours.shaded,
		borderRadius: 8,
		marginBottom: 10,
	},
	text: {
		fontSize: 18,
	},
	secondaryText: {
		fontSize: 12,
		color: colours.shadedText,
	},
};
