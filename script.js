//SELEÇAO DE ELEMENTOS
const generatePasswordBtn = document.querySelector("#generate_password");
const generatedPasswordElement = document.querySelector("#generated_password");

const openCloseGeneratorBtn = document.querySelector("#open_generate_options");
const generatePasswordContainer = document.querySelector("#generate_options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordBtn = document.querySelector("#copy_password");

//FUNÇOES-----------------
//FUNÇAO PARA GERAR LETRA MINUSCULAS ATRAVES DE UM CODIGO NUMERICO
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//FUNÇAO PARA GERAR LETRA MAIUSCULAS ATRAVES DE UM CODIGO NUMERICO
const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//FUNÇAO PARA GERAR UM NUMERO ALEATORIO
const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

//FUNÇAO PARA GERAR SIMBOLOS ALEATORIOS
const getSymbol = () => {
    
    const symbols = "!@#$%&*()[]{}<>☻☺♦♣♠♥";
    
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//FUNÇAO PARA CRIAR UMA STRING USANDO OS CARACTERES GERADOS ALEATORIAMENTE E ATRIBUIR EM UM ELEMENTO HTML
const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = ""
    const passwordLength = lengthInput.value;
    const generators = [];

    if(lettersInput.checked) generators.push(getLetterLowerCase, getLetterUpperCase)
    if(numbersInput.checked) generators.push(getNumber);
    if(symbolsInput.checked) generators.push(getSymbol);

    if(generators.length === 0) return;

    for(i = 0; i < passwordLength; i = i + generators.length) {

        generators.forEach(() => {
            
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            
            password+= randomValue;
        })
    }

    password = password.slice(0, passwordLength);

    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
}

//EVENTOS
openCloseGeneratorBtn.addEventListener("click", () => {

    generatePasswordContainer.classList.toggle("hide");
})

generatePasswordBtn.addEventListener("click", (e) => {
    generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol)
})

copyPasswordBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        
        copyPasswordBtn.innerText = "Senha copiada com sucesso";

        setTimeout(() => {

            copyPasswordBtn.innerText = "Copiar";
            
        }, 1000);
    })
})

