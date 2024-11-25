import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Record from "../types/Record";
import { normalisedMileageCost } from "../utils/costUtils";

export type CachedRecordTransition = null | {
	miles: number;
	cost: number;
};

const DEFAULT_CACHED_RECORD_TRANSITION: CachedRecordTransition = { miles: 0, cost: 0 };

export default function useCachedRecords(initialRecords: Record[]): {
	records: Record[];
	cachedRecordTransitions: CachedRecordTransition[];
	updateRecord: (record: Record) => void;
	removeRecord: (record: Record) => void;
	replaceRecords: (records: Record[]) => void;
} {
	const [records, setRecords] = useState<Record[]>(toSortedRecords(initialRecords));
	const [cachedRecordTransitions, setCachedRecordTransitions] = useState<CachedRecordTransition[]>(
		getCachedCosts(toSortedRecords(initialRecords))
	);

	function toSortedRecords(records: Record[]): Record[] {
		return [...records].sort((a: Record, b: Record) => b.mileage - a.mileage);
	}

	function getCachedCosts(records: Record[]): CachedRecordTransition[] {
		let recordTransitions: CachedRecordTransition[] = [];
		for (let i = 0; i < records.length; i++) {
			recordTransitions.push(DEFAULT_CACHED_RECORD_TRANSITION);
			localUpdateRecordTransition(records, recordTransitions, i);
		}
		return recordTransitions;
	}

	function replaceRecords(records: Record[]) {
		let newRecords: Record[] = toSortedRecords(records);
		let newTransitions = getCachedCosts(newRecords);

		setRecords(newRecords);
		setCachedRecordTransitions(newTransitions);
	}

	function localUpdateRecordTransition(records: Record[], recordTransitions: CachedRecordTransition[], index: number) {
		// If this index is out of bounds then do not update
		if (index < 0 || index >= records.length) return;

		let transition: CachedRecordTransition = null;
		// If this is a mileage record, then leave the transition as null

		if (records[index].type === "record") {
			// Calculate the cached data based on this and the next record
			let record = records[index];
			// If there is no next record imagine it is a 0 milage record
			let prevRecord = index + 1 >= records.length ? { id: "0", type: "mileage", mileage: 0 } : records[index + 1];
			let miles = record.mileage - prevRecord.mileage;
			let cost = normalisedMileageCost(miles, record.cost);
			transition = { miles: miles, cost: cost };
		}

		// Update the transitions array in place
		recordTransitions[index] = transition;
	}

	function localRemoveRecord(records: Record[], recordTransitions: CachedRecordTransition[], index: number) {
		// Remove the record
		records.splice(index, 1);

		// Remove the cached transition data
		recordTransitions.splice(index, 1);
		// Update the cached data of item before as this will have changed
		localUpdateRecordTransition(records, recordTransitions, index - 1);
	}

	function localAddRecord(
		records: Record[],
		recordTransitions: CachedRecordTransition[],
		record: Record,
		index: number
	) {
		// Add the record
		records.splice(index, 0, record);

		// Create and calculate the transition data for this record
		recordTransitions.splice(index, 0, DEFAULT_CACHED_RECORD_TRANSITION);
		localUpdateRecordTransition(records, recordTransitions, index);
		// Update the cached data of item before as this will have changed
		localUpdateRecordTransition(records, recordTransitions, index - 1);
	}

	// Add or update a record
	function updateRecord(record: Record): void {
		let newRecords: Record[] = [...records];
		let newTransitions: CachedRecordTransition[] = [...cachedRecordTransitions];

		if (record.id) {
			// This record already exists
			let existingRecordIndex: number = newRecords.findIndex(
				(existingRecord: Record) => existingRecord.id === record.id
			);
			// Remove the record from the array (as it may need to placed in a different location)
			localRemoveRecord(newRecords, newTransitions, existingRecordIndex);
		} else {
			// This is a new record so give it an id
			record.id = uuidv4();
		}

		// Add the record (back) into the array in the correct position
		let newRecordIndex = newRecords.findIndex((existingRecord) => existingRecord.mileage < record.mileage);
		if (newRecordIndex === -1) {
			// If no smaller milage is found, append at the end
			newRecordIndex = newRecords.length;
		}

		// Insert the record at the correct position
		localAddRecord(newRecords, newTransitions, record, newRecordIndex);

		// Update the state variables
		setRecords(newRecords);
		setCachedRecordTransitions(newTransitions);
	}

	// Remove a record (only uses id, so other attributes can have been modified)
	function removeRecord(record: Record): void {
		let newRecords: Record[] = [...records];
		let newTransitions: CachedRecordTransition[] = [...cachedRecordTransitions];

		let recordIndex: number = newRecords.findIndex((existingRecord: Record) => existingRecord.id === record.id);
		localRemoveRecord(newRecords, newTransitions, recordIndex);

		// Update the state variables
		setRecords(newRecords);
		setCachedRecordTransitions(newTransitions);
	}

	return { records, cachedRecordTransitions, updateRecord, removeRecord, replaceRecords };
}
