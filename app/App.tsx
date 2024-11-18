import React, { useState } from "react";
import {
	Button,
	FlatList,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { styles } from "../constants/styles";

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
			<View style={{ flex: 1, marginTop: 20, padding: 20 }}>
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
