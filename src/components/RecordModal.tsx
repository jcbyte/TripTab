import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles as globalStyles } from "../styles";

export default function RecordModal({ modalOpen, record, setRecord, closeModal, updateRecords }: any) {
	return (
		<Modal visible={modalOpen} animationType="fade" transparent={true}>
			<TouchableWithoutFeedback onPress={closeModal}>
				<BlurView intensity={60} style={globalStyles.modalBackground}>
					<View style={{ ...globalStyles.modalContent, minWidth: 300 }}>
						<Text style={{ fontSize: 20, fontWeight: "semibold" }}>Add New Record</Text>

						<View style={{ marginVertical: 20, display: "flex", flexDirection: "column", gap: 10 }}>
							<TextInput
								style={globalStyles.input}
								placeholder="Mileage"
								keyboardType="numeric"
								value={record.milage.toString()}
								onChangeText={(text) => setRecord({ ...record, milage: parseFloat(text) })}
							/>
							<TextInput
								style={globalStyles.input}
								placeholder="Cost"
								keyboardType="numeric"
								value={record.cost.toString()}
								onChangeText={(text) => setRecord({ ...record, cost: parseFloat(text) })}
							/>
							<TextInput
								style={globalStyles.input}
								placeholder="Date"
								value={record.date.toLocaleDateString()}
								onChangeText={(text) => setRecord({ ...record, date: new Date(text) })}
							/>
						</View>

						<TouchableOpacity
							activeOpacity={0.6}
							style={globalStyles.button}
							onPress={() => {
								updateRecords(record);
								closeModal();
							}}
						>
							<Text style={globalStyles.buttonText}>Save</Text>
						</TouchableOpacity>
					</View>
				</BlurView>
			</TouchableWithoutFeedback>
		</Modal>
	);
}
