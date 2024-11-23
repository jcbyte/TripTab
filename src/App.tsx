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

// todo settings page miles/km, currency
// todo settings page export, import
// todo dark theme
// todo save

export type RecordNo = "all" | number;

export default function App() {
	// List of records
	const { records, cachedRecordTransitions, updateRecord, removeRecord } = useCachedRecords([
		{ id: uuidv4(), type: "record", mileage: 65531, cost: 38.97 },
		{ id: uuidv4(), type: "record", mileage: 65286, cost: 14.5 },
		{ id: uuidv4(), type: "record", mileage: 65187, cost: 28.96 },
		{ id: uuidv4(), type: "record", mileage: 65003, cost: 38.42 },
		{ id: uuidv4(), type: "record", mileage: 64774, cost: 37.6 },
		{ id: uuidv4(), type: "record", mileage: 64414, cost: 12.41 },
		{ id: uuidv4(), type: "record", mileage: 64333, cost: 36.18 },
		{ id: uuidv4(), type: "record", mileage: 64062, cost: 16.55 },
		{ id: uuidv4(), type: "record", mileage: 63913, cost: 14.99 },
		{ id: uuidv4(), type: "record", mileage: 63783, cost: 18.27 },
		{ id: uuidv4(), type: "record", mileage: 63662, cost: 40.52 },
		{ id: uuidv4(), type: "record", mileage: 63321, cost: 29.5 },
		{ id: uuidv4(), type: "record", mileage: 63103, cost: 24.5 },
		{ id: uuidv4(), type: "record", mileage: 62929, cost: 39.83 },
		{ id: uuidv4(), type: "record", mileage: 62634, cost: 52.19 },
		{ id: uuidv4(), type: "record", mileage: 62205, cost: 47 },
		{ id: uuidv4(), type: "mileage", mileage: 61880 },
		{ id: uuidv4(), type: "record", mileage: 61119, cost: 47.39 },
		{ id: uuidv4(), type: "record", mileage: 60792, cost: 40.74 },
		{ id: uuidv4(), type: "mileage", mileage: 60449 },
	]);

	const { modalOpen, record: modalRecord, setRecord: setModalRecord, openModal, closeModal } = useRecordModal();

	const [calculateRecordsNo, setCalculateRecordsNo] = useState<RecordNo>("all");

	return (
		<>
			<SafeAreaView style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
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
						style={{ borderRadius: 8 }}
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
