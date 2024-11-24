import { v4 as uuidv4 } from "uuid";

// Define the type for a milage record

export type StrippedRecord = {
	mileage: number;
} & ({ type: "record"; cost: number } | { type: "mileage" });

type Record = {
	id: null | string;
} & StrippedRecord;
export default Record;

export const DEFAULT: Record = { id: null, type: "record", mileage: 0, cost: 0 };

export function rehydrateRecord(strippedRecord: StrippedRecord): Record {
	return { id: uuidv4(), ...strippedRecord };
}

export function stripRecord(record: Record): StrippedRecord {
	let { id: _, ...rest } = record;
	return rest;
}
