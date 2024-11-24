import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { colours, styles as globalStyles } from "../styles";

export type Option<T> = { label: string; key: string; value: T };

export default function SlideUpSelection<T>({
	title,
	options,
	isOpen,
	close,
	onSelect,
}: {
	title?: string;
	options: Option<T>[];
	isOpen: boolean;
	close: () => void;
	onSelect: (selectedItem: T) => void;
}) {
	return (
		<Modal visible={isOpen} animationType="slide" transparent={true}>
			<TouchableWithoutFeedback onPress={close}>
				<View style={globalStyles.bottomModalBackground}>
					<View style={globalStyles.bottomModalContent}>
						{title && <Text style={styles.titleText}>{title}</Text>}
						<FlatList
							data={options}
							renderItem={({ item }: { item: Option<T> }) => (
								<TouchableOpacity
									style={styles.item}
									onPress={() => {
										onSelect(item.value);
										close();
									}}
								>
									<Text style={styles.itemText}>{item.label}</Text>
								</TouchableOpacity>
							)}
							keyExtractor={(item: Option<T>) => item.key}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
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
