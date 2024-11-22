import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RecordNo } from "../App";
import { colours, styles as globalStyles } from "../styles";
import { useStateSetter } from "../types/utils";

type Option = { label: string; value: RecordNo };
const options: Option[] = [
	{ label: "10", value: 10 },
	{ label: "50", value: 50 },
	{ label: "100", value: 100 },
	{ label: "All", value: "all" },
];

export default function RecordsNoSelection({
	calculateRecordsNo,
	setCalculateRecordsNo,
}: {
	calculateRecordsNo: RecordNo;
	setCalculateRecordsNo: useStateSetter<RecordNo>;
}) {
	const [modalOpen, setModalOpen] = useState(true);

	function openModal(): void {
		setModalOpen(true);
	}

	function closeModal(): void {
		setModalOpen(false);
	}

	function updateRecordsNo(newRecordsNo: RecordNo): void {
		setCalculateRecordsNo(newRecordsNo);
		closeModal();
	}

	return (
		<>
			<TouchableOpacity activeOpacity={0.6} style={globalStyles.blankButton} onPress={openModal}>
				<Feather name="chevron-down" color={globalStyles.blankButtonText.color} size={18} />
				<Text style={globalStyles.blankButtonText}>
					{calculateRecordsNo === "all" ? "All" : calculateRecordsNo.toString()}
				</Text>
			</TouchableOpacity>

			<Modal visible={modalOpen} animationType="slide" transparent={true}>
				<TouchableWithoutFeedback onPress={closeModal}>
					<View style={globalStyles.bottomModalBackground}>
						<View style={globalStyles.bottomModalContent}>
							<Text style={styles.titleText}>Calculate from Previous Records</Text>
							<FlatList
								data={options}
								renderItem={({ item }: { item: Option; index: number }) => (
									<TouchableOpacity
										style={styles.item}
										onPress={() => {
											updateRecordsNo(item.value);
										}}
									>
										<Text style={styles.itemText}>{item.label}</Text>
									</TouchableOpacity>
								)}
								keyExtractor={(item: Option) => item.value.toString()}
								ListEmptyComponent={<Text style={{ textAlign: "center" }}>No Records Yet</Text>}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 16,
		backgroundColor: colours.shaded,
		borderRadius: 8,
		marginBottom: 2,
	},
	titleText: {
		marginBottom: 20,
		fontSize: 18,
		fontWeight: "semibold",
		textAlign: "left",
	},
	itemText: {
		fontSize: 16,
		textAlign: "left",
	},
});
