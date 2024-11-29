import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
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
import { Theme, useTheme } from "../hooks/Theme";
import Record from "../types/Record";
import { adjustColour } from "../utils/colourUtils";
import { useStateSetter } from "../utils/typeUtils";

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
	const { theme, styles } = useTheme();
	const myStyles = getMyStyles(theme);

	const [costInput, setCostInput] = useState<string>("");

	useEffect(() => {
		if (modalOpen) {
			setCostInput(record.type == "record" && record.cost ? record.cost.toString() : "");
		}
	}, [modalOpen]);

	function updateCost(costInput: string) {
		setCostInput(costInput);
		if (record.type == "record") {
			setRecord({ ...record, cost: parseFloat(costInput) });
		}
	}

	return (
		<Modal visible={modalOpen} animationType="fade" transparent={true}>
			<TouchableWithoutFeedback onPress={closeModal}>
				<BlurView intensity={60} style={styles.centerModalBackground}>
					<View style={{ ...styles.centerModalContent, minWidth: 300 }}>
						<Text style={myStyles.titleText}>{record.id ? "Edit Record" : "Add New Record"}</Text>

						<View style={{ marginVertical: 20, display: "flex", flexDirection: "column", gap: 10 }}>
							<TextInput
								style={styles.blankInput}
								placeholderTextColor={theme.shaded.colour}
								placeholder="Mileage"
								keyboardType="numeric"
								value={record.mileage ? record.mileage.toString() : undefined}
								onChangeText={(text) => setRecord({ ...record, mileage: parseInt(text) })}
							/>
							{record.type === "record" && (
								<TextInput
									style={styles.blankInput}
									placeholderTextColor={theme.shaded.colour}
									placeholder="Cost"
									keyboardType="numeric"
									value={costInput}
									onChangeText={(text) => updateCost(text)}
								/>
							)}
							<View
								style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
							>
								<Text style={myStyles.labelText}>Mileage Record</Text>
								<Switch
									thumbColor={record.type === "mileage" ? theme.primary.colour : theme.disabled.colour}
									trackColor={{
										true: adjustColour(theme.primary.colour, -0.25),
										false: adjustColour(theme.disabled.colour, -0.25),
									}}
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
								style={styles.primaryButton}
								onPress={() => {
									updateRecord(record);
									closeModal();
								}}
							>
								<Text style={styles.primaryButtonText}>Save</Text>
							</TouchableOpacity>
							{record.id && (
								<TouchableOpacity
									activeOpacity={0.6}
									style={styles.dangerButton}
									onPress={() => {
										removeRecord(record);
										closeModal();
									}}
								>
									<Text style={styles.dangerButtonText}>Delete</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</BlurView>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		titleText: {
			fontSize: 20,
			fontWeight: "semibold",
			textAlign: "left",
			color: theme.background.text,
		},
		labelText: {
			color: theme.background.text,
		},
	});
