import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ListItem from "./components/ListItem";
import RecordModal from "./components/RecordModal";
import useRecordModal from "./hooks/useRecordModal";
import { styles as globalStyles } from "./styles";
import Record, { DEFAULT as DEFAULT_RECORD } from "./types/Record";

export default function App() {
	// List of records
	const [records, setRecords] = useState<Record[]>([
		{ id: "1", milage: 1, cost: 1, date: new Date(2024, 1, 1) },
		{ id: "2", milage: 2, cost: 2, date: new Date(2024, 1, 2) },
		{ id: "3", milage: 3, cost: 3, date: new Date(2024, 1, 2) },
		{ id: "4", milage: 4, cost: 4, date: new Date(2024, 1, 3) },
	]);

	const { modalOpen, record: modalRecord, setRecord: setModalRecord, openModal, closeModal } = useRecordModal();

	// Add or update a record
	function updateRecords(record: Record): void {
		// if id === null then create new record
		// else update where id === id
		//
		// setRecords((records: Record[]) => [...records, newRecord]);
		console.log(record);
	}

	function showModal(ref: "new" | number): void {
		let record: Record = ref === "new" ? { ...DEFAULT_RECORD } : { ...records[ref] };
		openModal(record);
	}

	return (
		<>
			<View style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column", gap: 40 }}>
					<View style={styles.mileageBox}>
						<Text style={styles.mileageTitleText}>Cost per Mile</Text>
						<View style={{ display: "flex", flexDirection: "row" }}>
							<Text style={{ ...styles.mileageText, flex: 1 }}>£0.16</Text>
							<TouchableOpacity activeOpacity={0.6} style={globalStyles.button} onPress={() => showModal("new")}>
								<Text style={globalStyles.buttonText}>New Record</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* List of records */}
					<FlatList
						style={undefined}
						data={records}
						renderItem={({ item, index }: { item: Record; index: number }) => (
							<ListItem item={item} index={index} openModal={showModal} />
						)}
						keyExtractor={(item: Record) => item.id!}
						ListEmptyComponent={undefined}
					/>
				</View>
			</View>

			<RecordModal
				modalOpen={modalOpen}
				record={modalRecord}
				setRecord={setModalRecord}
				closeModal={closeModal}
				updateRecords={updateRecords}
			/>
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
});
