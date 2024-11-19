import { useState } from "react";
import Record, { DEFAULT as DEFAULT_RECORD } from "../types/Record";

export default function useRecordModal() {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [record, setRecord] = useState<Record>(DEFAULT_RECORD);

	const openModal = (record: Record) => {
		setRecord({ ...record });
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return {
		modalOpen,
		record,
		setRecord,
		openModal,
		closeModal,
	};
}
