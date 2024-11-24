import Currency from "./Currency";
import Distance from "./Distance";
import RecordNo from "./RecordNo";

export default interface UserSettings {
	calculateRecordsNo: RecordNo;
	currency: Currency;
	distance: Distance;
}

export const DEFAULT: UserSettings = { calculateRecordsNo: "all", currency: "GBP", distance: "miles" };
