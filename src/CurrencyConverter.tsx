import "./CurrencyConverter.css";
import { observer } from "mobx-react-lite";
import { useStores } from "./hooks/useStores";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  CurrencyCode,
  convertCurrency,
  getCounterPair,
} from "./services/currencyConverter";

interface Props {
  options: {
    invoiceCurrency: CurrencyCode;
    policyCurrency: CurrencyCode;
  };
  defaultValue: CurrencyCode;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencyOptions = ({ options, defaultValue, onChange }: Props) => {
  return (
    <select
      name="currencyOptions"
      id="inputCurrency"
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <option value={options.invoiceCurrency}>{options.invoiceCurrency}</option>
      <option value={options.policyCurrency}>{options.policyCurrency}</option>
    </select>
  );
};

const ForeignExchange = observer(() => {
  const { loadingStore } = useStores();

  const [state, setState] = useState({
    fx: 0,
    amount: 100,
    exchangeRate: 0,
    date: "2000-01-01",
    notificationDate: "2000-01-01",
    invoiceCurrency: "RON",
    policyCurrency: "EUR",
    inputCurrency: "RON",
    outputCurrency: "EUR",
  });

  const init = useCallback(() => {
    const { invoiceCurrency, policyCurrency, inputCurrency, amount } = state;
    convertCurrency(invoiceCurrency, policyCurrency, amount, inputCurrency)
      .then((result) => {
        console.log(`Converted Amount: ${result.convertedAmount}, Exchange Rate: ${result.exchangeRate}`);
        setState({
          ...state,
          fx: result.convertedAmount,
          exchangeRate: result.exchangeRate,
        });
      })
      .catch((error) => console.error(error.message));
  }, []);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: (typeof state)[keyof typeof state] = event.target.value;
    setState({ ...state, [event.target.id]: value, fx: 0 });
  };

  const onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: (typeof state)[keyof typeof state] = event.target.value;
    setState({ ...state, inputCurrency: value, fx: 0 });
  };

  const handleReset = () => {
        setState({ ...state, date: state.notificationDate, fx: 0 });
  }

  const calculateFx = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingStore.simulateFetch;
    const { invoiceCurrency, policyCurrency, inputCurrency, amount } = state;
    convertCurrency(invoiceCurrency, policyCurrency, amount, inputCurrency)
      .then((result) => {
        console.log(`Converted Amount: ${result.convertedAmount}, Exchange Rate: ${result.exchangeRate}`);
        setState({
          ...state,
          fx: result.convertedAmount,
          exchangeRate: result.exchangeRate,
        });
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div id="currencyConverter">
      <div className="card">
        <form onSubmit={calculateFx}>
          <fieldset>
            <legend>Current Case</legend>
            <table>
              <tbody>
                <tr>
                  <td className="cellLabel">
                    <span>Invoice Currency</span>
                  </td>
                  <td>
                    <span id="invoiceCurrency">{state.invoiceCurrency}</span>
                  </td>
                </tr>
                <tr>
                  <td className="cellLabel">
                    <span>Policy Currency</span>
                  </td>
                  <td>
                    <span id="policyCurrency">{state.policyCurrency}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <label id="notificationDateLabel">
              Notification Date
              <input
                type="date"
                name="notificationDate"
                value={state.notificationDate}
                readOnly
                id="notificationDate"
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Exchange Rate</legend>
            <span>
              <math
                style={{ mathStyle: "compact" }}
                xmlns="http://www.w3.org/1998/Math/MathML"
              >
                <mrow>
                  <mfrac>
                    <mi>{state.policyCurrency}</mi>
                    <mi>{state.invoiceCurrency}</mi>
                  </mfrac>
                  <mo>=</mo>
                  <mn>{state.exchangeRate}</mn>
                </mrow>
                <mrow>
                  <mfrac>
                    <mi>{state.invoiceCurrency}</mi>
                    <mi>{state.policyCurrency}</mi>
                  </mfrac>
                  <mo>=</mo>
                  <mn>{1 / state.exchangeRate}</mn>
                </mrow>
              </math>
              <span>
                <time dateTime="2018-07-07">@{state.date}</time>
              </span>
            </span>
          </fieldset>
          <fieldset>
            <legend>Calculator</legend>
            <p>
              <label htmlFor="amount">Give</label>
              <input
                type="number"
                value={state.amount}
                onChange={onFieldChange}
                id="amount"
                min="0"
                step="0.01"
              />
              <CurrencyOptions
                options={{ invoiceCurrency: "RON", policyCurrency: "EUR" }}
                defaultValue={"RON"}
                onChange={onSelectionChange}
              />
            </p>
            <p>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={state.date}
                id="date"
                onChange={onFieldChange}
              />
              <input type="button" id="resetDate" value="Use notification date" onClick={handleReset}/>
            </p>
            <p>
              <label htmlFor="outputAmount">Receive</label>
              <code id="fx">{state.fx !== 0 ? state.fx : "--"}</code>
              <code> {getCounterPair(state)}</code>
            </p>
            <button type="submit">Calculate in {getCounterPair(state)}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
});

export default ForeignExchange;
