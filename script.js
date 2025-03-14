document.addEventListener("DOMContentLoaded", function() {
    const passwordField = document.getElementById("password");
    const copyButton = document.getElementById("copyButton");
    const includeNumbers = document.getElementById("includeNumbers");
    const includeSymbols = document.getElementById("includeSymbols");
    const includeUppercase = document.getElementById("includeUppercase");

    // Deixa o campo da senha em branco ao carregar a página
    passwordField.value = "";

    document.querySelector("button.btn-primary").addEventListener("click", generatePassword);
    copyButton.addEventListener("click", copyToClipboard);

    function generatePassword() {
        const length = 10;
        let chars = "abcdefghijklmnopqrstuvwxyz";
        if (includeNumbers.checked) chars += "0123456789";
        if (includeSymbols.checked) chars += "!@#$%^&*()_+[]{}|;:,.<>?/";
        if (includeUppercase.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        passwordField.value = password;
    }

    function copyToClipboard() {
        if (passwordField.value !== "") {
            passwordField.select();
            passwordField.setSelectionRange(0, 99999); // Para dispositivos móveis
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