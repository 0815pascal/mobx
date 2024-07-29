import { observer } from "mobx-react-lite";
import DateInput from "./DateInput"
import { useState } from "react";
import SelectLanguage from "./SelectLanguage";

const FormElements = observer(() => {
  const [language, setLanguage] = useState<"en" | "fr" | "it" | "de">("en");
  // const dispatch = useDispatch();
  // const dateValue = useSelector((state: RootState) => state.date.value);

  const getLabelForLanguage = (lang: "en" | "fr" | "it" | "de"): string => {
    switch (lang) {
      case "en":
        return "Date";
      case "fr":
        return "Date";
      case "it":
        return "Data";
      case "de":
        return "Datum";
      default:
        return "Date";
    }
  };

  const label = getLabelForLanguage(language);

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
      <SelectLanguage selectedLanguage={language} onChange={setLanguage} />
      <DateInput
        language={language}
        required
        label={label}
      />
      <button type="submit">Submit</button>
    </form>
  );
});

export default FormElements