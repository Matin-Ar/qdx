import React from "react";
import Select from "react-select";
import iranFlag from "../assets/iran-flag.png";
import englandFlag from "../assets/england-flag.png";

export default function LangCustomSelect() {
  const options = [
    {
      value: "iran",
      label: (
        <div>
          <img src={iranFlag} />
        </div>
      ),
    },
    {
      value: "england",
      label: (
        <div>
          <img src={englandFlag} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Select
        options={options}
        defaultValue={options[0]}
        classNamePrefix="languageController"
        className="languageController"
      />
    </div>
  );
}
