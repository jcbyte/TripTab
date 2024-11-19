import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { styles as globalStyles } from "../constants/styles";

// Define the type for a milage record
interface Record {
	milage: number;
	cost: number;
	date: Date;
}

export default function App() {
	// List of records
	const [entities, setEntities] = useState<Record[]>([
		{ milage: 1, cost: 1, date: new Date(2024, 1, 1) },
		{ milage: 2, cost: 2, date: new Date(2024, 1, 2) },
		{ milage: 3, cost: 3, date: new Date(2024, 1, 2) },
		{ milage: 4, cost: 4, date: new Date(2024, 1, 3) },
	]);

	const [modalVisible, setModalVisible] = useState(false);
	const [newRecord, setNewRecord] = useState<Record>({ milage: 0, cost: 0, date: new Date() });

	// Handle new record button press
	const handleNewRecordPress = (): void => {
		// todo dialog to enter details
		// setEntities((entities) => {
		// 	let newEntity: Record = { milage: 99, cost: 99, time: new Date(2024, 1, 9) };
		// 	return [...entities, newEntity];
		// });
		setModalVisible(true);
	};

	return (
		<>
			<View style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column" }}>
					<View style={styles.mileageBox}>
						<Text style={styles.mileageTitleText}>Cost per Mile</Text>
						<View style={{ display: "flex", flexDirection: "row" }}>
							<Text style={styles.mileageText}>£0.16</Text>
							<TouchableOpacity activeOpacity={0.6} style={globalStyles.button} onPress={handleNewRecordPress}>
								<Text style={globalStyles.buttonText}>New Record</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* List of records */}
					<FlatList
						data={entities}
						renderItem={({ item }: { item: Record }) => (
							<View>
								{/* // todo show other information */}
								{/* // todo on click enable editing/deleting */}
								<Text>{item.milage}</Text>
								<Text>{item.cost}</Text>
								<Text>{item.date.toUTCString()}</Text>
							</View>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			</View>

			{/* <Modal visible={modalVisible} animationType="slide" transparent={true}>
				<TouchableWithoutFeedback
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<View style={styles.modalBackground}>
						<View style={styles.modalContainer}>
							<Text style={styles.modalTitle}>Add New Record</Text>

							<TextInput
								style={styles.input}
								placeholder="Mileage"
								keyboardType="numeric"
								value={newRecord.milage.toString()}
								onChangeText={(text) => setNewRecord({ ...newRecord, milage: parseFloat(text) })}
							/>
							<TextInput
								style={styles.input}
								placeholder="Cost"
								keyboardType="numeric"
								value={newRecord.cost.toString()}
								onChangeText={(text) => setNewRecord({ ...newRecord, cost: parseFloat(text) })}
							/>
							<TextInput
								style={styles.input}
								placeholder="Date"
								value={newRecord.date.toLocaleDateString()}
								onChangeText={(text) => setNewRecord({ ...newRecord, date: new Date(text) })}
							/>

							<View style={styles.modalButtons}>
								<Button title="Cancel" onPress={() => setModalVisible(false)} />
								<Button
									title="Add Record"
									onPress={() => {
										console.log("Add record");
									}}
								/>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal> */}
		</>
	);
}

const styles = StyleSheet.create({
	mileageBox: {
		padding: 16,
		backgroundColor: "#F9F9F9",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	mileageTitleText: {
		fontSize: 24,
		fontWeight: "semibold",
		textAlign: "left",
	},
	mileageText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		textAlign: "left",
		flex: 1,
	},
});
