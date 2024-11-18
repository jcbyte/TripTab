import React, { useState } from "react";
import {
	Button,
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

// Define the type for a milage record
interface Record {
	milage: number;
	cost: number;
	time: Date;
}

export default function App() {
	// List of records
	const [entities, setEntities] = useState<Record[]>([
		{ milage: 1, cost: 1, time: new Date("01/01/2001") },
		{ milage: 2, cost: 2, time: new Date("01/01/2002") },
		{ milage: 3, cost: 3, time: new Date("01/01/2003") },
		{ milage: 4, cost: 4, time: new Date("01/01/2004") },
	]);

	const [modalVisible, setModalVisible] = useState(false);
	const [newRecord, setNewRecord] = useState<Record>({ milage: 0, cost: 0, time: new Date() });

	// Handle new record button press
	const handleNewRecordPress = (): void => {
		// todo dialog to enter details
		// setEntities((entities) => {
		// 	let newEntity: Record = { milage: 99, cost: 99, time: new Date("01/01/2099") };
		// 	return [...entities, newEntity];
		// });
		setModalVisible(true);
	};

	return (
		<>
			<View style={styles.container}>
				{/* Box with milage cost and new button */}
				<View style={styles.box}>
					<Text style={styles.boxText}>Milage Cost</Text>
					<TouchableOpacity style={styles.button} onPress={handleNewRecordPress}>
						<Text style={styles.buttonText}>New Record</Text>
					</TouchableOpacity>
				</View>

				{/* List of records */}
				<FlatList
					data={entities}
					renderItem={({ item }: { item: Record }) => (
						<View style={styles.itemContainer}>
							{/* // todo show other information */}
							{/* // todo on click enable editing/deleting */}
							<Text>{item.milage}</Text>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
					style={styles.list}
				/>
			</View>

			{/* Modal for new record */}
			<Modal visible={modalVisible} animationType="slide" transparent={true}>
				{/* TouchableWithoutFeedback to dismiss modal */}
				<TouchableWithoutFeedback
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<View style={styles.modalBackground}>
						{/* Modal content */}
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
								value={newRecord.time.toLocaleDateString()}
								onChangeText={(text) => setNewRecord({ ...newRecord, time: new Date(text) })}
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
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	box: {
		backgroundColor: "#3498db", // Blue background
		padding: 20,
		marginBottom: 20, // Space between box and list
		borderRadius: 10,
		alignItems: "center",
	},
	boxText: {
		color: "#fff",
		fontSize: 18,
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#2ecc71", // Green button
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
	list: {
		marginTop: 20,
	},
	itemContainer: {
		padding: 15,
		backgroundColor: "#ecf0f1",
		marginBottom: 10,
		borderRadius: 8,
	},
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
	},
	modalContainer: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		margin: 20,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 24,
		marginBottom: 20,
		color: "#333",
	},
	input: {
		width: 250,
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
		backgroundColor: "#fff",
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
});
