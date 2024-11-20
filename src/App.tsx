import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

import ListItem from "./components/ListItem";
import MileageBox from "./components/MileageBox";
import RecordModal from "./components/RecordModal";
import useRecordModal from "./hooks/useRecordModal";
import { styles as globalStyles } from "./styles";
import Record from "./types/Record";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { insertRecord } from "./utils";

// todo first element issues
// todo main mileage box
// todo input boxes aren't so difficult
// todo edit incl delete
// todo scroll
// todo main box select past 10/100/all etc
// todo settings page miles/km, currency
// todo settings page export, import

export default function App() {
	// List of records
	const [records, setRecords] = useState<Record[]>([
		{ id: uuidv4(), milage: 65531, cost: 38.97 },
		{ id: uuidv4(), milage: 65286, cost: 14.5 },
		{ id: uuidv4(), milage: 65187, cost: 28.96 },
		{ id: uuidv4(), milage: 65003, cost: 0 },
	]);

	// useEffect(() => {
	// 	setRecords((records: Record[]) => {
	// 		sortRecords(records);
	// 		return records;
	// 	});
	// });

	// Add or update a record
	function updateRecords(record: Record): void {
		if (record.id) {
			// This record already exists so update it
			setRecords((records: Record[]) => {
				let newRecords = records.filter((existingRecord) => existingRecord.id !== record.id);
				insertRecord(newRecords, record);
				return newRecords;
			});
		} else {
			// This is a new record so add it to the list
			record.id = uuidv4();
			setRecords((records: Record[]) => {
				let newRecords = [...records];
				insertRecord(newRecords, record);
				return newRecords;
			});
		}
	}

	const { modalOpen, record: modalRecord, setRecord: setModalRecord, openModal, closeModal } = useRecordModal();

	return (
		<>
			<SafeAreaView style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column", gap: 40 }}>
					<MileageBox openModal={() => openModal({ id: null, milage: 0, cost: 0 })} />

					{/* List of records */}
					<FlatList
						style={undefined}
						data={records}
						renderItem={({ item, index }: { item: Record; index: number }) => (
							<ListItem
								item={item}
								prevItemMileage={index + 1 < records.length ? records[index + 1].milage : 0}
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
