// Define the type for a milage record
export default interface Record {
	id: null | string;
	milage: number;
	cost: number;
}

export const DEFAULT: Record = { id: null, milage: 0, cost: 0 };
