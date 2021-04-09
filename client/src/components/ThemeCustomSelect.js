import React from "react";
import Select from "react-select";
import iranFlag from "../assets/iran-flag.png";
import englandFlag from "../assets/england-flag.png";

export default function ThemeCustomSelect() {
  const options = [
    {
      value: "dark",
      label: "Dark",
    },
    {
      value: "light",
      label: "Light",
    },
  ];

  return (
    <div>
      <Select
        options={options}
        defaultValue={options[0]}
        classNamePrefix="themeController"
        className="themeController"
      />
    </div>
  );
}
