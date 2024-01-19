import React, { useState } from "react";
import RadioButton from "./RadioButton";
import "./styles.css";

function Radio() {
    const [fruits, setFruits] = useState("Apple");

    const handleChange = (event:any) => {
        setFruits(event.target.value);
    };

    const isChecked = (value:any) => fruits === value;

    return (
        <div className="App">
            <h2>How to create reuseable custom radio button</h2>
            <div className="radiobutton-div">
                <RadioButton
                    id="Apple"
                    name="Apple"
                    value="Apple"
                    text="Apple"
                    onChange={handleChange}
                    checked={isChecked("Apple")}
                />
                <RadioButton
                    id="Berries"
                    name="Berries"
                    value="Berries"
                    text="Berries"
                    onChange={handleChange}
                    checked={isChecked("Berries")}
                />
                <RadioButton
                    id="Kiwi"
                    name="Kiwi"
                    value="Kiwi"
                    text="Kiwi"
                    onChange={handleChange}
                    checked={isChecked("Kiwi")}
                />
            </div>
            <p>
                You have selected the <strong>{fruits}</strong> fruit{" "}
            </p>
        </div>
    );
}

export default Radio;
