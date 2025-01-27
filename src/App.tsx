import { useState } from "react";
import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

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
      <button onClick={generatePassword}>Generate Password</button>
      <div className="bg-dark text-white min-vh-100">
        <p>Randomized password: {generatedPassword}</p>
      </div>
    </>
  );
}

export default App;
