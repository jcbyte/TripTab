import React, { useState } from "react";
import {
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { BlurView } from "expo-blur";
import { styles as globalStyles } from "../constants/styles";

// Define the type for a milage record
interface Record {
	id: string;
	milage: number;
	cost: number;
	date: Date;
}

export default function App() {
	// List of records
	const [records, setRecords] = useState<Record[]>([
		{ id: "1", milage: 1, cost: 1, date: new Date(2024, 1, 1) },
		{ id: "2", milage: 2, cost: 2, date: new Date(2024, 1, 2) },
		{ id: "3", milage: 3, cost: 3, date: new Date(2024, 1, 2) },
		{ id: "4", milage: 4, cost: 4, date: new Date(2024, 1, 3) },
	]);

	// Modal visibility
	const [modalVisible, setModalVisible] = useState(false);
	// Current modal record data
	const [newRecord, setNewRecord] = useState<Record>({ id: "todo-calculate", milage: 0, cost: 0, date: new Date() });

	// Handle new record button press
	const handleNewRecordPress = (): void => {
		setRecords((records: Record[]) => [...records, newRecord]);
		toggleModal();
	};

	const toggleModal = (): void => setModalVisible((prev) => !prev);

	return (
		<>
			<View style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column", gap: 40 }}>
					<View style={styles.mileageBox}>
						<Text style={styles.mileageTitleText}>Cost per Mile</Text>
						<View style={{ display: "flex", flexDirection: "row" }}>
							<Text style={{ ...styles.mileageText, flex: 1 }}>£0.16</Text>
							<TouchableOpacity activeOpacity={0.6} style={globalStyles.button} onPress={toggleModal}>
								<Text style={globalStyles.buttonText}>New Record</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* List of records */}
					<FlatList
						style={undefined}
						data={records}
						renderItem={({ item }: { item: Record }) => (
							<TouchableOpacity style={styles.listItem} onPress={toggleModal}>
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
						)}
						keyExtractor={(item: Record) => item.id}
						ListEmptyComponent={undefined}
					/>
				</View>
			</View>

			<Modal visible={modalVisible} animationType="fade" transparent={true}>
				<TouchableWithoutFeedback onPress={toggleModal}>
					<BlurView intensity={60} style={globalStyles.modalBackground}>
						<View style={{ ...globalStyles.modalContent, minWidth: 300 }}>
							<Text style={{ fontSize: 20, fontWeight: "semibold" }}>Add New Record</Text>

							<View style={{ marginVertical: 20, display: "flex", flexDirection: "column", gap: 10 }}>
								<TextInput
									style={globalStyles.input}
									placeholder="Mileage"
									keyboardType="numeric"
									value={newRecord.milage.toString()}
									onChangeText={(text) => setNewRecord({ ...newRecord, milage: parseFloat(text) })}
								/>
								<TextInput
									style={globalStyles.input}
									placeholder="Cost"
									keyboardType="numeric"
									value={newRecord.cost.toString()}
									onChangeText={(text) => setNewRecord({ ...newRecord, cost: parseFloat(text) })}
								/>
								<TextInput
									style={globalStyles.input}
									placeholder="Date"
									value={newRecord.date.toLocaleDateString()}
									onChangeText={(text) => setNewRecord({ ...newRecord, date: new Date(text) })}
								/>
							</View>

							<TouchableOpacity activeOpacity={0.6} style={globalStyles.button} onPress={handleNewRecordPress}>
								<Text style={globalStyles.buttonText}>Save</Text>
							</TouchableOpacity>
						</View>
					</BlurView>
				</TouchableWithoutFeedback>
			</Modal>
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
	},
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
});
