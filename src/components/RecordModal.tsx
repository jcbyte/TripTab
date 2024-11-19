import { BlurView } from "expo-blur";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles as globalStyles } from "../styles";
import { Record } from "../types/Record";

export interface RecordModalHandles {
	openModal: (record: Record) => void;
}

export default forwardRef(RecordModal);

function RecordModal({ updateRecords }: { updateRecords: (record: Record) => void }, ref: any) {
	const [modalOpen, setModalOpen] = useState(false);
	const [record, setRecord] = useState<Record>({ id: "", milage: 0, cost: 0, date: new Date() });

	useImperativeHandle(
		ref,
		(): RecordModalHandles => ({
			openModal: (record: Record) => {
				setRecord(record);
				setModalOpen(true);
			},
		})
	);

	function closeModal(): void {
		setModalOpen(false);
	}

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
