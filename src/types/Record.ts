// Define the type for a milage record

type Record = {
	id: null | string;
	mileage: number;
} & ({ type: "record"; cost: number } | { type: "mileage" });
export default Record;

export const DEFAULT: Record = { id: null, type: "record", mileage: 0, cost: 0 };
