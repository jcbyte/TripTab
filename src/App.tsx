import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { v4 as uuidv4 } from "uuid";
import ListItem from "./components/ListItem";
import MileageBox from "./components/MileageBox";
import RecordModal from "./components/RecordModal";
import useRecordModal from "./hooks/useRecordModal";
import { styles as globalStyles } from "./styles";
import Record from "./types/Record";

import { Feather } from "@expo/vector-icons";
import "react-native-get-random-values";
import RecordsNoSelection from "./components/RecordsNoSelection";
import useCachedRecords from "./hooks/useCachedRecords";

// todo force first element to be a mileage type
// todo scroll
// todo settings page miles/km, currency
// todo settings page export, import
// todo dark theme

export type RecordNo = "all" | number;

export default function App() {
	// List of records
	const { records, cachedRecordTransitions, updateRecord, removeRecord } = useCachedRecords([
		{ id: uuidv4(), type: "record", mileage: 65531, cost: 38.97 },
		{ id: uuidv4(), type: "record", mileage: 65286, cost: 14.5 },
		{ id: uuidv4(), type: "record", mileage: 65187, cost: 28.96 },
		{ id: uuidv4(), type: "mileage", mileage: 65003 },
	]);

	const { modalOpen, record: modalRecord, setRecord: setModalRecord, openModal, closeModal } = useRecordModal();

	const [calculateRecordsNo, setCalculateRecordsNo] = useState<RecordNo>("all");

	return (
		<>
			<SafeAreaView style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
					<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
						{/* Settings Button */}
						<TouchableOpacity activeOpacity={0.6} style={globalStyles.blankButton}>
							<Feather name="settings" color={globalStyles.blankButtonText.color} size={18} />
						</TouchableOpacity>

						{/* Calculated Records No */}
						<RecordsNoSelection calculateRecordsNo={calculateRecordsNo} setCalculateRecordsNo={setCalculateRecordsNo} />
					</View>

					{/* Milage Box */}
					<MileageBox
						cachedRecordTransitions={cachedRecordTransitions}
						calculateRecordsNo={calculateRecordsNo}
						openModal={() =>
							openModal({ id: null, type: "record", mileage: records.length > 0 ? records[0].mileage : 0, cost: 0 })
						}
					/>

					{/* List of records */}
					<FlatList
						data={records}
						renderItem={({ item, index }: { item: Record; index: number }) => (
							<ListItem
								item={item}
								cachedTransition={cachedRecordTransitions[index]}
								openModal={() => openModal(item)}
							/>
						)}
						keyExtractor={(item: Record) => item.id!}
						ListEmptyComponent={<Text style={{ textAlign: "center" }}>No Records Yet</Text>}
					/>
				</View>
			</SafeAreaView>

			<RecordModal
				modalOpen={modalOpen}
				record={modalRecord}
				setRecord={setModalRecord}
				closeModal={closeModal}
				updateRecord={updateRecord}
				removeRecord={removeRecord}
			/>
		</>
	);
}
