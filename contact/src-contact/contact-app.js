window.onload = function () {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('send');
    const inputs = form.querySelectorAll('input, textarea');
    
    let captchaResponse = '';  // Store captcha response

    // Function to check if all inputs have values and if captcha is validated
    function checkFormValidity() {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        console.log("Form fields filled: ", allFilled); // Debugging log

        // Enable submit button only if all fields are filled and captcha is completed
        submitBtn.disabled = !(allFilled && captchaResponse.length > 0);

        if (!submitBtn.disabled) {
            console.log("Submit button enabled");
        } else {
            console.log("Submit button disabled");
        }
    }

    // Add input event listeners to form fields
    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    // Add reCAPTCHA callback for success
    window.onCaptchaSuccess = function (response) {
        console.log("Captcha completed successfully"); // Debugging log
        captchaResponse = response;  // Capture the captcha response
        console.log("Captcha response: ", captchaResponse); // Log the captcha response
        checkFormValidity();  // Re-check form validity when captcha completes
    };

    // Add reCAPTCHA callback for expiration
    window.onCaptchaExpired = function () {
        console.log("Captcha expired"); // Debugging log
        captchaResponse = '';  // Reset the captcha response if it expires
        checkFormValidity();  // Re-check form validity when captcha expires
    };

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!captchaResponse.length > 0) {
            const formStatus = document.getElementById('status-form');
            formStatus.innerHTML = "Please complete the reCAPTCHA.";
            return;
        }

        emailjs.sendForm('service_ao2xhsm', 'template_pumjpnn', this)
            .then(() => {
                const formStatus = document.getElementById('status-form');
                formStatus.innerHTML = 'Message sent successfully!';
                setTimeout(() => formStatus.innerHTML = '', 4000);
                form.reset();
                grecaptcha.reset(); // Reset captcha after form submission
                submitBtn.disabled = !(allFilled && captchaResponse.length > 0);
                checkFormValidity();
            }, (error) => {
                const formStatus = document.getElementById('status-form');
                formStatus.innerHTML = 'Failed to send message. Please try again later.';
                console.log('FAILED...', error);
            });
    });

    // Initial check for form validity when page loads
    checkFormValidity();
};
