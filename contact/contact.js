
  // Initialize EmailJS with your user ID
  (function(){
    emailjs.init("6IKJHtfLS6u4UaUSX"); // Replace with your EmailJS user ID
  })();

  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    // Capture form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Set up EmailJS parameters
    const templateParams = {
      name: name,
      email: email,
      message: message
    };

    // Send the email using EmailJS
    emailjs.send("service_ao2xhsm", "template_qxag0wm", templateParams)
      .then(function(response) {
        console.log("Email sent successfully!", response.status, response.text);
        document.getElementById("formResponse").textContent = "Thank you for your message, " + name + "!";
        document.getElementById("contactForm").reset();
      }, function(error) {
        console.error("Email failed to send:", error);
        document.getElementById("formResponse").textContent = "An error occurred. Please try again.";
      });
  });