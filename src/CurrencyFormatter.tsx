import { forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { CURRENCY } from "./types/CurrencyTypes";

interface CustomChangeEvent {
  target: {
    name: string;
    value: string | number | null;
  };
}

interface FormatterProps {
  name: string;
  onChange: (event: CustomChangeEvent) => void;
  [key: string]: unknown;
}

type FormatterType = ForwardRefExoticComponent<PropsWithoutRef<FormatterProps> & RefAttributes<HTMLInputElement>>;

/**
 * Generates a percentage input formatter component with customizable parameters.
 * 
 * @param {Partial<NumericFormat>} parameters - Optional parameters to customize the NumericFormat component.
 * @returns {FormatterType} A forwarded ref component that formats percentage inputs.
 */
const PercentageInputFormatterGenerator = (parameters: { decimalScale: number; fixedDecimalScale?: boolean }) => {
  const ForwardedComponent = forwardRef<HTMLInputElement, FormatterProps>((props, ref) => {
    const { onChange, ...other } = props;

    const MAX_LIMIT = 100;

    const defaultProps = {
      decimalSeparator: ".",
      suffix: "%",
      valueIsNumericString: true,
      decimalScale: 2,
      fixedDecimalScale: true,
      allowNegative: false,
      defaultValue: 0,
    };

    // Merge default props with passed parameters and other props
    const mergedProps = { ...defaultProps, ...parameters, ...other };

    return (
      <NumericFormat
        {...mergedProps}
        getInputRef={ref}
        onValueChange={(values: NumberFormatValues) => {
          onChange({
            target: {
              name: props.name,
              value: values.value === "" ? null : parseFloat(values.value),
            },
          });
        }}
        decimalSeparator="."
        suffix="%"
        valueIsNumericString
        fixedDecimalScale={true}
        allowNegative={false}
        defaultValue={0}
        isAllowed={(values) => {
          const { value } = values;
          return parseInt(value) <= MAX_LIMIT;
        }}
        {...parameters}
      />
    );
  });

  // Set the displayName dynamically based on the forwarded component's name
  ForwardedComponent.displayName = `Forwarded(${NumericFormat.name || "Component"})`;

  return ForwardedComponent;
};

const PercentageInputFormatter = PercentageInputFormatterGenerator({
  decimalScale: 2,
});

const PercentageInputFormatter3 = PercentageInputFormatterGenerator({
  decimalScale: 3,
  fixedDecimalScale: false,
});

/**
 * A numeric formatter component that formats input as Swiss Francs (CHF).
 */
const NumericFormatter: FormatterType = forwardRef<HTMLInputElement, FormatterProps>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values: NumberFormatValues) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="'"
      decimalSeparator="."
      valueIsNumericString
      decimalScale={0}
      suffix="CHF"
      fixedDecimalScale={true}
    />
  );
});

/**
 * Generates a currency formatter component with a specified prefix.
 * 
 * @param {string | undefined} prefix - The currency prefix to be added to the formatted value.
 * @returns {FormatterType} A forwarded ref component that formats currency inputs.
 */
const factory = (prefix: string | undefined): FormatterType => {
  const ForwardedComponent = forwardRef<HTMLInputElement, FormatterProps>((props, ref) => {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: NumberFormatValues) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="'"
        decimalSeparator="."
        valueIsNumericString
        prefix={prefix}
        decimalScale={2}
        fixedDecimalScale={true}
      />
    );
  });

  ForwardedComponent.displayName = `Forwarded(${NumericFormat.name || "Component"})`;
  return ForwardedComponent;
};

/**
 * An object containing currency formatters for different currency codes.
 * The 'noFormat' key contains a formatter without a currency prefix.
 */
const Formatters: { [key: string]: FormatterType | undefined } = { noFormat: undefined };

Object.keys(CURRENCY)?.forEach((currencyCode) => {
  const prefix = `${currencyCode} `;
  Formatters[currencyCode] = factory(prefix);
});

Formatters.noFormat = factory("");

NumericFormatter.displayName = "NumericFormatter";

export { Formatters, NumericFormatter, PercentageInputFormatter, PercentageInputFormatter3 };
