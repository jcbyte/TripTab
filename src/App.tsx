import React, { useState } from "react";
import { FlatList, View } from "react-native";

import ListItem from "./components/ListItem";
import MileageBox from "./components/MileageBox";
import RecordModal from "./components/RecordModal";
import useRecordModal from "./hooks/useRecordModal";
import { styles as globalStyles } from "./styles";
import Record from "./types/Record";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function App() {
	// List of records
	const [records, setRecords] = useState<Record[]>([
		{ id: uuidv4(), milage: 1, cost: 1, date: new Date(2024, 1, 1) },
		{ id: uuidv4(), milage: 2, cost: 2, date: new Date(2024, 1, 2) },
		{ id: uuidv4(), milage: 3, cost: 3, date: new Date(2024, 1, 2) },
		{ id: uuidv4(), milage: 4, cost: 4, date: new Date(2024, 1, 3) },
	]);

	const { modalOpen, record: modalRecord, setRecord: setModalRecord, openModal, closeModal } = useRecordModal();

	// Add or update a record
	function updateRecords(record: Record): void {
		if (record.id) {
			// This record already exists so update it
			setRecords((records: Record[]) =>
				records.map((existingRecord) => (existingRecord.id === record.id ? record : existingRecord))
			);
		} else {
			// This is a new record so add it to the list
			record.id = uuidv4();
			setRecords((records: Record[]) => [...records, record]);
		}
	}

	return (
		<>
			<View style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column", gap: 40 }}>
					<MileageBox openModal={() => openModal({ id: null, milage: 0, cost: 0, date: new Date() })} />

					{/* List of records */}
					<FlatList
						style={undefined}
						data={records}
						renderItem={({ item }: { item: Record }) => <ListItem item={item} openModal={() => openModal(item)} />}
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
