const dataLowerCase = "azertyuiopqsdfghjklmwxcvbn";
const dataUpperCase = dataLowerCase.toUpperCase();
const dataNumbers = "0123456789";
const dataSymbols = "#@&\"'(§è!çà)-^¨$*%ù+=/:.;?,";
const rangeValue = document.getElementById('password-range')
const passwordOutput = document.getElementById('password-output')


const generatePassword = () => {
  let data = [];
  let password = "";

  // if (lowercase.checked) data.push(...dataLowerCase);
  // if (uppercase.checked) data.push(...dataUpperCase);
  // if (numbers.checked) data.push(...dataNumbers);
  // if (symbols.checked) data.push(...dataSymbols);

  lowercase.checked ? data.push(...dataLowerCase) : null;
  uppercase.checked ? data.push(...dataUpperCase) : null;
  numbers.checked ? data.push(...dataNumbers) : null;
  symbols.checked ? data.push(...dataSymbols) : null;

  if (data.length === 0) {
    alert('please select at least one password parameter');
  }

  for (let i = 0; i < rangeValue.value; i++) {
    password += data[Math.floor(Math.random() * data.length)];
  }
  
  passwordOutput.value = password;

  passwordOutput.select();
  document.execCommand('copy');
}

generateButton.addEventListener('click', () => {
  generatePassword();
  generateButton.innerText = 'Password copied to clipboard!';
  setTimeout(() => {
    generateButton.innerText = 'Generate Password';
  }, 2500)
});