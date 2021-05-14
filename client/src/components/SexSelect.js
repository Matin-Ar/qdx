import React, { useState } from "react";
import agenderBlackIcon from "../../src/assets/gender/agender-black.png";
import agenderColorIcon from "../../src/assets/gender/agender-color.png";
import maleBlackIcon from "../../src/assets/gender/male-black.png";
import maleColorIcon from "../../src/assets/gender/male-color.png";
import femaleBlackIcon from "../../src/assets/gender/female-black.png";
import femaleColorIcon from "../../src/assets/gender/female-color.png";

function SexSelect(props) {
  const [gender, setGender] = useState(props.genderProp);
  console.log("initial gender is : ", props.genderProp);

  const handleGenderValue = (e) => {
    if (e.target.id === "malelabel") {
      setGender("male");
    } else if (e.target.id === "femalelabel") {
      setGender("female");
    } else if (e.target.id === "rathernotsaylable") {
      setGender("agender");
    }

    props.setFormGender(gender);
    console.log("sent gender to form is : ", gender);
  };

  return (
    <div className="sex-checkbox-wrapper">
      <div className="gender-container" onClick={handleGenderValue}>
        <input type="radio" name="genderoption" id="male" value="male" />
        <label htmlFor="male" id="malelabel">
          <img src={gender === "male" ? maleColorIcon : maleBlackIcon} />
          آقا
        </label>
      </div>
      <div className="gender-container" onClick={handleGenderValue}>
        <input type="radio" name="genderoption" id="female" value="female" />
        <label htmlFor="female" id="femalelabel">
          <img src={gender === "female" ? femaleColorIcon : femaleBlackIcon} />
          خانم
        </label>
      </div>
      <div className="gender-container" onClick={handleGenderValue}>
        <input
          type="radio"
          name="genderoption"
          id="rathernotsay"
          value="rathernotsay"
        />

        <label htmlFor="rathernotsay" id="rathernotsaylable">
          {" "}
          <img
            src={gender === "agender" ? agenderColorIcon : agenderBlackIcon}
          />{" "}
          ترجیح میدم مشخص نکنم
        </label>
      </div>
    </div>
  );
}

export default SexSelect;
