// Initialize EmailJS with your public key
emailjs.init("6IKJHtfLS6u4UaUSX");  // Replace with your Public Key

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    const templateParams = {
        name: name,
        email: email,
        message: message
    };

    const serviceId = 'service_ao2xhsm';
    const templateId = 'template_qxag0wm';

    emailjs.send(serviceId, templateId, templateParams)
        .then((response) => {
            console.log('Success:', response);
            document.getElementById('response').innerText = 'Message sent successfully!';
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('response').innerText = 'Error sending message.';
        });
});