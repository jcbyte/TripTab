type Currency = "GBP" | "USD" | "EUR";
export default Currency;

interface CurrencyInfo {
	symbol: string;
	name: string;
}

export const currencyMap: Record<Currency, CurrencyInfo> = {
	GBP: { symbol: "£", name: "British Pounds" },
	EUR: { symbol: "€", name: "Euros" },
	USD: { symbol: "$", name: "US Dollars" },
};
