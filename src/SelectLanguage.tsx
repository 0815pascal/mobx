import React from "react";

type Language = "en" | "fr" | "it" | "de";

interface SelectLanguageProps {
  selectedLanguage: Language;
  onChange: (language: Language) => void;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ selectedLanguage, onChange }) => {
  return (
    <div>
      <label htmlFor="language">Select Language: </label>
      <select id="language" value={selectedLanguage} onChange={(e) => onChange(e.target.value as Language)}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="it">Italian</option>
        <option value="de">German</option>
      </select>
    </div>
  );
};

export default SelectLanguage;
