import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Theme, useTheme } from "../hooks/Theme";

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
	onSelect: (selectedItem: Option<T>) => void;
}) {
	const { theme, styles } = useTheme();
	const myStyles = getMyStyles(theme);

	return (
		<Modal visible={isOpen} animationType="slide" transparent={true}>
			<TouchableWithoutFeedback onPress={close}>
				<View style={styles.bottomModalBackground}>
					<View style={styles.bottomModalContent}>
						{title && <Text style={myStyles.titleText}>{title}</Text>}
						<FlatList
							data={options}
							renderItem={({ item }: { item: Option<T> }) => (
								<TouchableOpacity
									style={myStyles.item}
									onPress={() => {
										onSelect(item);
										close();
									}}
								>
									<Text style={myStyles.itemText}>{item.label}</Text>
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

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		item: {
			padding: 16,
			backgroundColor: theme.element.colour,
			borderRadius: 8,
			marginBottom: 2,
		},
		titleText: {
			marginBottom: 20,
			fontSize: 18,
			fontWeight: "semibold",
			textAlign: "left",
			color: theme.background.text,
		},
		itemText: {
			fontSize: 16,
			textAlign: "left",
			color: theme.element.text,
		},
	});
