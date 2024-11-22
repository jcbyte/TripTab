import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { RecordNo } from "../App";
import { styles as globalStyles } from "../styles";
import { useStateSetter } from "../types/utils";
import SlideUpSelection, { Option } from "./SlideUpSelection";

const options: Option<RecordNo>[] = [
	{ label: "10", key: "10", value: 10 },
	{ label: "50", key: "50", value: 50 },
	{ label: "100", key: "100", value: 100 },
	{ label: "All", key: "all", value: "all" },
];

export default function RecordsNoSelection({
	calculateRecordsNo,
	setCalculateRecordsNo,
}: {
	calculateRecordsNo: RecordNo;
	setCalculateRecordsNo: useStateSetter<RecordNo>;
}) {
	const [slideOpen, setSlideOpen] = useState(true);

	function openSlide(): void {
		setSlideOpen(true);
	}

	function closeSlide(): void {
		setSlideOpen(false);
	}

	return (
		<>
			<TouchableOpacity activeOpacity={0.6} style={globalStyles.blankButton} onPress={openSlide}>
				<Feather name="chevron-down" color={globalStyles.blankButtonText.color} size={18} />
				<Text style={globalStyles.blankButtonText}>
					{calculateRecordsNo === "all" ? "All" : calculateRecordsNo.toString()}
				</Text>
			</TouchableOpacity>

			<SlideUpSelection
				options={options}
				isOpen={slideOpen}
				close={closeSlide}
				itemSelected={(selectedItem: RecordNo) => {
					setCalculateRecordsNo(selectedItem);
				}}
			/>
		</>
	);
}
