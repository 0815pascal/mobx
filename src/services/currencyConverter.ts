export type CurrencyCode = string; // A simple alias for clarity.

interface CounterPair {
    inputCurrency: CurrencyCode; invoiceCurrency: CurrencyCode; policyCurrency: CurrencyCode
}

interface ConversionResult {
    convertedAmount: number;
    exchangeRate: number;
}

async function fetchExchangeRate(fromCurrency: CurrencyCode,
    toCurrency: CurrencyCode,
    date: string): Promise<number> {
    console.debug(fromCurrency, toCurrency, date)
    // Placeholder for the actual API call
    // Here you would use `fetch` or any other HTTP client to make the API call.
    const fakeApiResponse = 0.2; // Simulated API response
    return Promise.resolve(fakeApiResponse);
}

export function getCounterPair({ inputCurrency, invoiceCurrency, policyCurrency }: CounterPair) {
    if (inputCurrency === invoiceCurrency) return policyCurrency;
    else return invoiceCurrency;
}


async function processConversion(
    invoiceCurrency: CurrencyCode,
    policyCurrency: CurrencyCode,
    amount: number,
    inputCurrency: CurrencyCode,
    date?: string
): Promise<ConversionResult>  {
    if (invoiceCurrency === policyCurrency) {
        return {
            convertedAmount: parseFloat(amount.toFixed(3)),
            exchangeRate: 1
        };
    }

    if (inputCurrency === invoiceCurrency) {
        const rate = await fetchExchangeRate(invoiceCurrency, policyCurrency, date || new Date().toISOString().split('T')[0]);
        return {
            convertedAmount: parseFloat((amount * rate).toFixed(3)),
            exchangeRate: rate
        };
    }

    if (inputCurrency !== invoiceCurrency) {
        const rate = await fetchExchangeRate(invoiceCurrency, policyCurrency, date || new Date().toISOString().split('T')[0]);
        return {
            convertedAmount: parseFloat((amount / rate).toFixed(3)),
            exchangeRate: rate
        };
    }

    console.error("Conversion error: Input currency does not match invoice currency.");
    throw new Error("Conversion error.");
}


export async function convertCurrency(
    invoiceCurrency: CurrencyCode,
    policyCurrency: CurrencyCode,
    amount: number | string,
    inputCurrency: CurrencyCode,
    date?: string // make date optional
): Promise<ConversionResult> {
    // Check for invalid inputs
    if (!invoiceCurrency || !policyCurrency || !amount || !inputCurrency) {
        console.error("Invalid input: All parameters must be provided.");
        throw new Error("Invalid input parameters.");
    }

    if (typeof amount === 'string') {
        amount = parseFloat(amount);
    }

    if (isNaN(amount)) {
        console.error("Invalid amount: The amount must be a valid number.");
        throw new Error("Invalid amount.");
    }

    return processConversion(invoiceCurrency, policyCurrency, amount, inputCurrency, date);
}