import React, { useState, useCallback, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import dayjs from "dayjs";
import { Undo2 } from "lucide-react";

type Language = "en" | "fr" | "it" | "de";

interface DateFormat {
  placeholder: string;
  mask: string;
}

interface DateInputProps {
  language?: Language;
  label: string;
  dateValue: string; // Redux state for date value
  setDateValue: (value: string) => void; // Redux action to set date value
  resetDateValue: () => void; // Redux action to reset date value
  restoreDateValue: () => void; // Redux action to restore date value
  required?: boolean; // Optional required prop
  error?: string; // Optional error prop to overwrite local error
}

const DateInput: React.FC<DateInputProps> = ({ language = "en", label, dateValue, setDateValue, resetDateValue, restoreDateValue, required = false, error: externalError }) => {
  const getDateFormat = (lang: Language): DateFormat => {
    switch (lang) {
      case "en":
        return {
          placeholder: "MM/DD/YYYY",
          mask: "MM/DD/YYYY",
        };
      case "fr":
        return {
          placeholder: "JJ/MM/AAAA",
          mask: "JJ/MM/AAAA",
        };
      case "it":
        return {
          placeholder: "GG/MM/AAAA",
          mask: "GG/MM/AAAA",
        };
      case "de":
        return {
          placeholder: "TT.MM.JJJJ",
          mask: "TT.MM.JJJJ",
        };
      default:
        return {
          placeholder: "MM/DD/YYYY",
          mask: "MM/DD/YYYY",
        };
    }
  };

  const { placeholder, mask } = getDateFormat(language);
  const [value, setValue] = useState<string>(mask);
  const [localError, setLocalError] = useState<string>("");
  const [lastValidDate, setLastValidDate] = useState<string>("");
  const [showRestoreIcon, setShowRestoreIcon] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPosRef = useRef<number>(0);

  const formatDate = useCallback(
    (input: string): string => {
      const numbers = input.replace(/\D/g, "");
      const chars = mask.split("");
      let result = "";
      let index = 0;

      for (let i = 0; i < chars.length; i++) {
        if (index >= numbers.length) {
          result += chars[i];
        } else if (/[A-Za-z]/.test(chars[i])) {
          result += numbers[index];
          index++;
        } else {
          result += chars[i];
        }
      }

      return result;
    },
    [mask]
  );

  const setCursorPosition = (pos: number) => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(pos, pos);
    }
  };

  const isValidDate = (day: number, month: number, year: number): boolean => {
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 1980 || year > 2100) return false;

    const date = dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD", true);
    return date.isValid() && date.year() === year && date.month() + 1 === month && date.date() === day;
  };

  const validateDate = (date: string): boolean => {
    let day, month, year;

    switch (language) {
      case "en":
        [month, day, year] = date.split("/");
        break;
      case "fr":
      case "it":
        [day, month, year] = date.split("/");
        break;
      case "de":
        [day, month, year] = date.split(".");
        break;
      default:
        return false;
    }

    day = parseInt(day, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);

    return isValidDate(day, month, year);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = formatDate(input);
    setValue(formattedInput);
    setDateValue(formattedInput);

    const nextPos = formattedInput.split("").reduce((pos, char, idx) => {
      return /[0-9]/.test(char) ? idx + 1 : pos;
    }, 0);

    cursorPosRef.current = nextPos;

    if (formattedInput.replace(/[^0-9]/g, "").length === mask.replace(/[^A-Za-z]/g, "").length) {
      if (!validateDate(formattedInput)) {
        setLocalError("Invalid date. Please enter a valid date.");
        setShowRestoreIcon(true);
      } else {
        setLocalError("");
        setLastValidDate(formattedInput);
        setShowRestoreIcon(false);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      setValue(mask);
      cursorPosRef.current = 0;
      setCursorPosition(0);
      setShowRestoreIcon(lastValidDate !== "");
      resetDateValue();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setCursorPosition(cursorPosRef.current);
    }
  };

  const handleClick = () => {
    setCursorPosition(cursorPosRef.current);
  };

  const handleFocus = () => {
    const lastDigitPos = value.split("").reduce((pos, char, idx) => {
      return /[0-9]/.test(char) ? idx + 1 : pos;
    }, 0);
    cursorPosRef.current = lastDigitPos;
    setCursorPosition(lastDigitPos);
  };

  const handleRestore = () => {
    setValue(lastValidDate);
    setLocalError("");
    setShowRestoreIcon(false);
    const lastDigitPos = lastValidDate.split("").reduce((pos, char, idx) => {
      return /[0-9]/.test(char) ? idx + 1 : pos;
    }, 0);
    cursorPosRef.current = lastDigitPos;
    setCursorPosition(lastDigitPos);
    restoreDateValue();
  };

  useEffect(() => {
    setCursorPosition(cursorPosRef.current);
  }, [value]);

  useEffect(() => {
    setValue(dateValue);
  }, [dateValue]);

  useEffect(() => {
    setValue(mask);
  }, [mask]);

  const displayError = externalError || localError;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: ".5rem" }}>
      <label htmlFor="date" style={{ margin: "0", fontSize: "0.75rem", zIndex: 2, padding: "0 0 0 .875rem" }}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", zIndex: 0 }}>
        <input
          ref={inputRef}
          type="text"
          id="date"
          name="date"
          lang={language}
          placeholder={placeholder}
          required={required}
          value={value || mask}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onFocus={handleFocus}
          style={{ height: "2.25rem", padding: "0 0 0 .75rem", fontSize: "1rem" }}
        />
        {showRestoreIcon && <Undo2 onClick={handleRestore} size={20} style={{ marginLeft: "10px", cursor: "pointer" }} />}
      </div>
      <p style={{ color: "red", fontSize: "0.75rem", margin: "0", paddingLeft: ".875rem", textAlign: "left" }}>{displayError}</p>
    </div>
  );
};

export default DateInput;
