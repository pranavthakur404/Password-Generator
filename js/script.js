const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// initially
let password = "";
let checkCount = 0;
let passwordLength = 10;
handleSlider();

// handling slider
function handleSlider() {
  lengthDisplay.textContent = inputSlider.value;
  passwordLength = inputSlider.value;
}
inputSlider.addEventListener("input", () => {
  handleSlider();
});

// now getting random integer between two
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// get random number
function getRandomNumber() {
  return getRandomInteger(0, 9);
}

// get random upper case
function getRandomUpperCase() {
  return String.fromCharCode(getRandomInteger(65, 91));
}

//get random lower case
function getRandomLowerCase() {
  return String.fromCharCode(getRandomInteger(97, 123));
}

// get random symbols
function getRandomSymbols() {
  let randomIndex = getRandomInteger(0, symbols.length);
  return symbols[randomIndex];
}

// handling checkbox
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });

  // special condintion
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});



// shuffle algorithm
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


// copy to Clipboard
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

// generate password button
generateBtn.addEventListener("click", () => {
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";

  // Now creating black function for storing input checkbox functions
  let funcArry = [];

  if (uppercaseCheck.checked) {
    funcArry.push(getRandomUpperCase);
  }
  if (lowercaseCheck.checked) {
    funcArry.push(getRandomLowerCase);
  }
  if (numbersCheck.checked) {
    funcArry.push(getRandomNumber);
  }
  if (symbolsCheck.checked) {
    funcArry.push(getRandomSymbols);
  }

  console.log(funcArry);
  // now puting compulsory letter
  for (let i = 0; i < funcArry.length; i++) {
    password += funcArry[i]();
  }

  // remaiting addition
  for (let i = 0; i < passwordLength - funcArry.length; i++) {
    let randomIndex = getRandomInteger(0, funcArry.length);
    password += funcArry[randomIndex]();
  }

//   shuffling 
password = shufflePassword(Array.from(password));

passwordDisplay.value = password;


});
