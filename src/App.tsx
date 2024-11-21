import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

import { v4 as uuidv4 } from "uuid";
import ListItem from "./components/ListItem";
import MileageBox from "./components/MileageBox";
import RecordModal from "./components/RecordModal";
import useRecordModal from "./hooks/useRecordModal";
import { styles as globalStyles } from "./styles";
import Record from "./types/Record";

import "react-native-get-random-values";
import useCachedRecords from "./hooks/useCachedRecords";

// todo edit incl delete
// todo scroll
// todo main box select past 10/100/all etc
// todo settings page miles/km, currency
// todo settings page export, import
// todo main box divides incorrectly

export default function App() {
	// List of records
	const { records, cachedRecordTransitions, updateRecords } = useCachedRecords([
		{ id: uuidv4(), type: "record", mileage: 65531, cost: 38.97 },
		{ id: uuidv4(), type: "record", mileage: 65286, cost: 14.5 },
		{ id: uuidv4(), type: "record", mileage: 65187, cost: 28.96 },
		{ id: uuidv4(), type: "mileage", mileage: 65003 },
	]);

	const { modalOpen, record: modalRecord, setRecord: setModalRecord, openModal, closeModal } = useRecordModal();

	return (
		<>
			<SafeAreaView style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column", gap: 40 }}>
					<MileageBox
						cachedRecordTransitions={cachedRecordTransitions}
						calculateRecordsNo={100}
						openModal={() => openModal({ id: null, type: "record", mileage: 0, cost: 0 })}
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
				updateRecords={updateRecords}
			/>
		</>
	);
}
