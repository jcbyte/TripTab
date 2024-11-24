import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "../App";
import ListItem from "../components/ListItem";
import MileageBox from "../components/MileageBox";
import RecordModal from "../components/RecordModal";
import RecordsNoSelection from "../components/RecordsNoSelection";
import { CachedRecordTransition } from "../hooks/useCachedRecords";
import useRecordModal from "../hooks/useRecordModal";
import { styles as globalStyles } from "../styles";
import Record from "../types/Record";
import RecordNo from "../types/RecordNo";
import { useStateSetter } from "../types/utils";

export default function AppScreen({
	navigation,
	calculateRecordsNo,
	setCalculateRecordsNo,
	cachedRecordTransitions,
	records,
	updateRecord,
	removeRecord,
}: {
	navigation: NavigationProp<"App">;
	calculateRecordsNo: RecordNo;
	setCalculateRecordsNo: useStateSetter<RecordNo>;
	cachedRecordTransitions: CachedRecordTransition[];
	records: Record[];
	updateRecord: (record: Record) => void;
	removeRecord: (record: Record) => void;
}) {
	const { modalOpen, record: modalRecord, setRecord: setModalRecord, openModal, closeModal } = useRecordModal();

	return (
		<>
			<SafeAreaView style={globalStyles.body}>
				<View style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
					<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
						{/* Settings Button */}
						<TouchableOpacity
							activeOpacity={0.6}
							style={globalStyles.blankButton}
							onPress={() => navigation.navigate("Settings")}
						>
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
