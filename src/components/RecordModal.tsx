import { BlurView } from "expo-blur";
import React from "react";
import {
	Modal,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { colours, styles as globalStyles } from "../styles";
import Record from "../types/Record";
import { useStateSetter } from "../types/utils";

export default function RecordModal({
	modalOpen,
	record,
	setRecord,
	closeModal,
	updateRecord,
	removeRecord,
}: {
	modalOpen: boolean;
	record: Record;
	setRecord: useStateSetter<Record>;
	closeModal: () => void;
	updateRecord: (record: Record) => void;
	removeRecord: (record: Record) => void;
}) {
	return (
		<Modal visible={modalOpen} animationType="fade" transparent={true}>
			<TouchableWithoutFeedback onPress={closeModal}>
				<BlurView intensity={60} style={globalStyles.centerModalBackground}>
					<View style={{ ...globalStyles.centerModalContent, minWidth: 300 }}>
						<Text style={styles.titleText}>{record.id ? "Edit Record" : "Add New Record"}</Text>

						<View style={{ marginVertical: 20, display: "flex", flexDirection: "column", gap: 10 }}>
							<TextInput
								style={globalStyles.blankInput}
								placeholder="Mileage"
								keyboardType="numeric"
								value={record.mileage ? record.mileage.toString() : undefined}
								onChangeText={(text) => setRecord({ ...record, mileage: parseFloat(text) })}
							/>
							{record.type === "record" && (
								<TextInput
									style={globalStyles.blankInput}
									placeholder="Cost"
									keyboardType="numeric"
									value={record.cost ? record.cost.toString() : undefined}
									onChangeText={(text) => setRecord({ ...record, cost: parseFloat(text) })}
								/>
							)}
							<View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
								<Text style={{ flex: 1 }}>Mileage Record</Text>
								<Switch
									thumbColor={record.type === "mileage" ? colours.primary : undefined}
									trackColor={{ true: colours.switchTrackPrimary }}
									value={record.type === "mileage"}
									onValueChange={(value) => {
										setRecord({
											...record,
											...(value ? { type: "mileage" } : { type: "record", cost: 0 }),
										});
									}}
								/>
							</View>
						</View>

						<View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
							<TouchableOpacity
								activeOpacity={0.6}
								style={globalStyles.primaryButton}
								onPress={() => {
									updateRecord(record);
									closeModal();
								}}
							>
								<Text style={globalStyles.primaryButtonText}>Save</Text>
							</TouchableOpacity>
							{record.id && (
								<TouchableOpacity
									activeOpacity={0.6}
									style={globalStyles.dangerButton}
									onPress={() => {
										removeRecord(record);
										closeModal();
									}}
								>
									<Text style={globalStyles.dangerButtonText}>Delete</Text>
								</TouchableOpacity>
							)}
						</View>
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
