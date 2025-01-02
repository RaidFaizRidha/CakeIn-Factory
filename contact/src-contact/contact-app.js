let captchaResponse = ''; // Variable to store the captcha response

window.onload = function () {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('send');
    const inputs = form.querySelectorAll('input, textarea');

    // Function to check if all inputs have values and if captcha is validated
    function checkFormValidity() {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        console.log("Form fields filled: ", allFilled); // Debugging log

        // Enable submit button only if all fields are filled and captcha is completed
        submitBtn.disabled = !(allFilled && captchaResponse.length > 0);

        console.log("Submit button disabled: ", submitBtn.disabled);  // Debugging log
    }

    // Add input event listeners to form fields
    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    // reCAPTCHA callback for success (called when the captcha is completed)
    window.onCaptchaSuccess = function (response) {
        console.log("Captcha success callback triggered");  // Debugging log
        console.log("Captcha response: ", response); // Log the response

        captchaResponse = response;  // Store the captcha response
        checkFormValidity();  // Re-check form validity when captcha completes
    };

    // reCAPTCHA callback for expired (called when the captcha expires)
    window.onCaptchaExpired = function () {
        console.log("Captcha expired callback triggered");  // Debugging log
        captchaResponse = '';  // Reset the captcha response if it expires
        checkFormValidity();  // Re-check form validity when captcha expires
    };

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Ensure captcha response exists before sending the form
        if (!captchaResponse || captchaResponse.length === 0) {
            const formStatus = document.getElementById('status-form');
            formStatus.innerHTML = "Please complete the reCAPTCHA.";
            return;
        }

        // Disable the submit button after form submission
        submitBtn.disabled = true;

        emailjs.sendForm('service_ao2xhsm', 'template_pumjpnn', this)
            .then(() => {
                const formStatus = document.getElementById('status-form');
                formStatus.innerHTML = 'Message sent successfully!';
                setTimeout(() => formStatus.innerHTML = '', 4000);

                // Reset the form (but preserve captcha response)
                form.reset();
                grecaptcha.reset(); // Reset captcha after form submission

                // Manually call checkFormValidity after reset to ensure the button is updated correctly
                submitBtn.disabled = true;  // Disable button after reset
                checkFormValidity(); // Check validity after reset and update button state
                console.log("Submit button re-enabled after successful submission.");
            }, (error) => {
                const formStatus = document.getElementById('status-form');
                formStatus.innerHTML = 'Failed to send message. Please try again later.';
                console.log('FAILED...', error);
            });
    });

    // Initial check for form validity when page loads
    checkFormValidity();

    // Manually trigger checkFormValidity after form reset to ensure button state is updated correctly
    form.addEventListener('reset', function () {
        console.log("Form was reset, checking validity again...");
        checkFormValidity(); // Manually check validity after reset
    });

    // Additional check after form is refilled, in case the submit button stays disabled
    form.addEventListener('input', function () {
        checkFormValidity(); // Recheck form validity when fields are modified
    });
};
