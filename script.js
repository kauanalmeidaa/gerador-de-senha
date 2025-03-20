document.addEventListener("DOMContentLoaded", function() {
    const passwordField = document.getElementById("password");
    const copyButton = document.getElementById("copyButton");
    const includeNumbers = document.getElementById("includeNumbers");
    const includeSymbols = document.getElementById("includeSymbols");
    const includeUppercase = document.getElementById("includeUppercase");

    passwordField.value = "";

    document.querySelector("button.btn-primary").addEventListener("click", generatePassword);
    copyButton.addEventListener("click", copyToClipboard);

    function generatePassword() {
        const length = 10;
        let lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        let numbers = "0123456789";
        let symbols = "!@#$%^&*()_+[]{}|;:,.<>?/";
        let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let chars = lowercaseChars;
        let requiredChars = [];

        if (includeNumbers.checked) {
            chars += numbers;
            requiredChars.push(randomChar(numbers));
        }

        if (includeSymbols.checked) {
            chars += symbols;
            requiredChars.push(randomChar(symbols));
        }
        
        if (includeUppercase.checked) {
            chars += uppercaseChars;
            requiredChars.push(randomChar(uppercaseChars));
        }

        let password = requiredChars;
        while (password.length < length) {
            password.push(randomChar(chars));
        }

        password = shuffleArray(password);

        passwordField.value = password.join("");
    }

    function randomChar(charSet) {
        return charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function copyToClipboard() {
        if (passwordField.value !== "") {
            passwordField.select();
            passwordField.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(passwordField.value).then(() => {
                copyButton.innerHTML = '<i class="bi bi-check-lg"></i>';
                copyButton.disabled = true;
                setTimeout(() => { 
                    copyButton.innerHTML = '<i class="bi bi-clipboard"></i>';
                    copyButton.disabled = false;
                }, 2000);
            });
        }
    }
});
