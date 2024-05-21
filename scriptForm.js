document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const errorMsg = document.getElementById("errorMsg");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) { // Mensaje de exito 
            alert("¡Mensaje enviado correctamente!");
            form.reset();
        } else { //Mensaje de error
            errorMsg.innerText = "Por favor complete todos los campos.";
            errorMsg.classList.remove("hidden");
        }
    });

    // Validación de campos mientras se escribe
    form.querySelectorAll("input[type=text], input[type=email], input[type=tel], textarea").forEach(input => {
        input.addEventListener("input", function(event) {
            const inputValue = event.target.value;
            const fieldName = event.target.name;
            const isValid = validateInput(inputValue, fieldName);
            if (!isValid) {
                event.target.value = ''; // Limpiar el campo si no es válido
            }
        });
    });

    // Validacion del formulario cuando se submitea
    function validateForm() {
        const inputs = form.querySelectorAll("input[required], textarea[required], select[required]");
        let isValid = true;
        let contactoSeleccionado = false;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            } 
        });
        var telefonoChecked = document.getElementById('telefonoPref').checked;
        var emailChecked = document.getElementById('emailPref').checked;
        if (!telefonoChecked && !emailChecked) { // Validacion del checkbox
            alert('Por favor, seleccione al menos una opción en Teléfono o Email.'); // Mensaje para seleccionar al menos una opcion del checkbox
            contactoSeleccionado = false;
        } else contactoSeleccionado = true;
        return isValid && contactoSeleccionado;
    }

    function validateInput(value, fieldName) {
        // Expresiones regulares para validar letras o números según corresponda
        const letrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/; // Solo letras y espacios
        const numerosRegex = /^\d+$/; // Solo números

        switch (fieldName) {
            case 'nombre':
                return letrasRegex.test(value);
            case 'email':
                return !/\s/.test(value); // No puede haber espacios en el email
            case 'telefono':
                return numerosRegex.test(value);
            default:
                return true;
        }
    }
});
