import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "../ThemedApp";
import ListItem from "../components/ListItem";
import MileageBox from "../components/MileageBox";
import RecordModal from "../components/RecordModal";
import RecordsNoSelection from "../components/RecordsNoSelection";
import { CachedRecordTransition } from "../hooks/CachedRecordsHook";
import useRecordModal from "../hooks/RecordModalHook";
import { Theme, useTheme } from "../hooks/Theme";
import Record from "../types/Record";

export default function AppScreen({
	navigation,
	cachedRecordTransitions,
	records,
	updateRecord,
	removeRecord,
}: {
	navigation: NavigationProp<"App">;
	cachedRecordTransitions: CachedRecordTransition[];
	records: Record[];
	updateRecord: (record: Record) => void;
	removeRecord: (record: Record) => void;
}) {
	const { theme, styles } = useTheme();
	const myStyles = getMyStyles(theme);

	const { modalOpen, record: modalRecord, setRecord: setModalRecord, openModal, closeModal } = useRecordModal();

	return (
		<>
			<View style={{ ...myStyles.body, display: "flex", flexDirection: "column", gap: 10 }}>
				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					{/* Settings Button */}
					<TouchableOpacity
						activeOpacity={0.6}
						style={styles.blankButton}
						onPress={() => navigation.navigate("Settings")}
					>
						<Feather name="settings" color={styles.blankButtonText.color} size={18} />
					</TouchableOpacity>

					{/* Calculated Records No */}
					<RecordsNoSelection />
				</View>

				{/* Milage Box */}
				<MileageBox
					cachedRecordTransitions={cachedRecordTransitions}
					openModal={() =>
						openModal({ id: null, type: "record", mileage: records.length > 0 ? records[0].mileage : 0, cost: 0 })
					}
				/>

				{/* List of records */}
				<FlatList
					style={{ borderRadius: 8 }}
					data={records}
					renderItem={({ item, index }: { item: Record; index: number }) => (
						<ListItem item={item} cachedTransition={cachedRecordTransitions[index]} openModal={() => openModal(item)} />
					)}
					keyExtractor={(item: Record) => item.id!}
					ListEmptyComponent={<Text style={{ textAlign: "center" }}>No Records Yet</Text>}
				/>
			</View>

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

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		body: {
			paddingHorizontal: 20,
			paddingTop: 10,
			flex: 1,
			backgroundColor: theme.background.colour,
		},
	});
