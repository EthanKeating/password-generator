import { useState, useEffect, useRef } from "react";
import "./App.css";
import { TypeAnimation } from "react-type-animation";
import { FaCopy } from "react-icons/fa";

function App() {
  const [titlePasswordValid, setTitlePasswordValid] = useState(false);

  const [passwordLength, setPasswordLength] = useState(10);
  const [passwordLengthSlider, setPasswordLengthSlider] = useState(
    passwordLength * 10
  );

  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "~!@#$%^&*()_-+=[]<>?";

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitlePasswordValid(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const clampPasswordLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPasswordLength = Number(e.target.value) / 100;

    if (newPasswordLength < 1 || newPasswordLength > 32) return;

    setPasswordLength(Math.floor(newPasswordLength));
    setPasswordLengthSlider(newPasswordLength * 100);
  };

  const handleUppercaseChange = (e: any) => {
    setIncludeUppercase(e.target.checked);
  };

  const handleNumbersChange = (e: any) => {
    setIncludeNumbers(e.target.checked);
  };

  const handleSpecialChange = (e: any) => {
    setIncludeSpecialChars(e.target.checked);
  };

  const generatePassword = () => {
    let randomChars = lowercaseChars;
    if (includeUppercase) randomChars += uppercaseChars;
    if (includeNumbers) randomChars += numbers;
    if (includeSpecialChars) randomChars += specialChars;

    let randomPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      randomPassword += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    setGeneratedPassword(randomPassword);
  };

  return (
    <>
      <div
        className="title"
        style={
          titlePasswordValid
            ? { borderBottom: "4px solid rgb(32, 210, 118)" }
            : {}
        }
      >
        <TypeAnimation
          sequence={["password generator", 0]}
          wrapper="div"
          speed={45}
          deletionSpeed={1}
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: "2.5rem",
            display: "block",
            textAlign: "center",
          }}
          repeat={0}
        />
      </div>
      <div className="app">
        <div className="password-output"></div>
        <div className="settings">
          <h1>Customize your password</h1>
          <div className="form-container">
            <div className="length-container">
              <div className="length-input-container">
                <input
                  readOnly
                  className="length-input"
                  type="number"
                  value={passwordLength}
                  onChange={clampPasswordLength}
                  min="1"
                  max="32"
                />
              </div>
              <div className="length-slider-container">
                <input
                  type="range"
                  min="100"
                  max="3200"
                  value={passwordLengthSlider}
                  onChange={clampPasswordLength}
                  className="length-slider"
                />
              </div>
            </div>
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={handleUppercaseChange}
                />
                Include Uppercase
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={handleNumbersChange}
                />
                Include Number
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={includeSpecialChars}
                  onChange={handleSpecialChange}
                />
                Include Special Characters
              </label>
            </div>
          </div>
        </div>
        <div className="output-container">
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Generate Button */}
            <button
              onClick={generatePassword}
              className="mint-button"
              style={{ padding: "10px", cursor: "pointer" }}
            >
              Generate
            </button>
            <input
              type="text"
              className="password-output"
              value={generatedPassword}
              readOnly
              style={{
                padding: "10px",
                margin: "0",
                width: "200px",
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            />

            <button className="mint-button" style={{ cursor: "pointer" }}>
              <FaCopy size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
