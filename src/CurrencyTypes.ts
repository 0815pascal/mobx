type CHF = 'CHF';
type DKK = 'DKK';
type EUR = 'EUR';
type GBP = 'GBP';
type MAD = 'MAD';
type RON = 'RON';
type USD = 'USD';

export type ValidCurrency = CHF | EUR | USD | GBP | MAD | DKK | RON;

export interface Currency {
    CHF: CHF;
    EUR: EUR;
    USD: USD;
    GBP: GBP;
    MAD: MAD;
    DKK: DKK;
    RON: RON;
}

export const CURRENCY: Currency = {
    CHF: 'CHF',
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP',
    MAD: 'MAD',
    DKK: 'DKK',
    RON: 'RON',
};