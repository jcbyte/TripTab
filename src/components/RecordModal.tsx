import { BlurView } from "expo-blur";
import React from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles as globalStyles } from "../styles";
import Record from "../types/Record";
import { useStateSetter } from "../types/utils";

export default function RecordModal({
	modalOpen,
	record,
	setRecord,
	closeModal,
	updateRecords,
}: {
	modalOpen: boolean;
	record: Record;
	setRecord: useStateSetter<Record>;
	closeModal: () => void;
	updateRecords: (record: Record) => void;
}) {
	return (
		<Modal visible={modalOpen} animationType="fade" transparent={true}>
			<TouchableWithoutFeedback onPress={closeModal}>
				<BlurView intensity={60} style={globalStyles.modalBackground}>
					<View style={{ ...globalStyles.modalContent, minWidth: 300 }}>
						<Text style={styles.titleText}>Add New Record</Text>

						<View style={{ marginVertical: 20, display: "flex", flexDirection: "column", gap: 10 }}>
							<TextInput
								style={globalStyles.input}
								placeholder="Mileage"
								keyboardType="numeric"
								value={record.mileage.toString()}
								onChangeText={(text) => setRecord({ ...record, mileage: parseFloat(text) })}
							/>
							{record.type === "record" && (
								<TextInput
									style={globalStyles.input}
									placeholder="Cost"
									keyboardType="numeric"
									value={record.cost.toString()}
									onChangeText={(text) => setRecord({ ...record, cost: parseFloat(text) })}
								/>
							)}
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

const styles = StyleSheet.create({
	titleText: {
		fontSize: 20,
		fontWeight: "semibold",
		textAlign: "left",
	},
});
