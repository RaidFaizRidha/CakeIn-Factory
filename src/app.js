//for navbar end

document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        open: false,
        selectedItem: {},

        items: [
            { id: 1, name: "Original Burnt Cheesecake (1 Slice)", img: "original-slice.jpeg", price: 25000, class: "cheesecake-slice show", description: "A classic cheesecake with a rich and creamy texture."},
            { id: 2, name: "Matcha Burnt Cheesecake (1 Slice)", img: "matcha-slice.jpeg", price: 26000, class: "cheesecake-slice show", description: "A smaller version of our signature cheesecake." },
            { id: 3, name: "Crumble Blueberry Cheesecake (1 Slice)", img: "crumble-slice-new.jpeg", price: 30000, class: "cheesecake-slice show", description: "A unique burnt cheesecake with a rich, caramelized top."},
            { id: 4, name: "Brownies Burnt Cheesecake (1 Slice)", img: "brownies-slice.jpeg", price: 30000, class: "cheesecake-slice show", description: "A decadent dessert combining a fudgy brownie base with a rich, caramelized burnt cheesecake topping."},
            { id: 5, name: "Original Burnt Cheesecake (Whole Cake)", img: "original-whole.jpeg", price: 200000, class: "cheesecake-whole show", description: "A soft, fluffy bun filled with rich cream filling."},
            { id: 6, name: "Matcha Burnt Cheesecake (Whole Cake)", img: "matcha-whole.jpeg", price: 208000, class: "cheesecake-whole show", description: "A deliciously soft bun with a subtle milk flavor."},
            { id: 7, name: "Crumble Blueberry Cheesecake (Whole cake)", img: "crumble-whole.jpeg", price: 240000, class: "cheesecake-whole show", description: "Chewy brownies with a generous swirl of Nutella."},
            { id: 8, name: "Brownies Burnt Cheesecake (Whole Slice)", img: "brownies-whole.jpeg", price: 240000, class: "cheesecake-whole show", description: "Chewy brownies with a generous swirl of Nutella."}
        ],

        openModal(item) {
            this.selectedItem = item;
            this.open = true; 
            this.toggleScroll(true);
        },

        closeModal() {
            this.open = false;
            this.selectedItem = {};
            this.toggleScroll(false);
        },

        toggleScroll(disable) {
            if (disable) {
                document.body.classList.add('no-scroll')
            } else {
                document.body.classList.remove('no-scroll')
            }
        },

        init() {
            this.items.forEach(item => {
                item.buttonText = 'Add to cart';
            });
        },
 
        addedText(item) {
            item.buttonText = 'Added';
            
            setTimeout(() => {
                item.buttonText = 'Add to cart';
            }, 800);
        },

    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        open: false,
        
        add(newItem) {
            const cartItem = this.items.find((item) => item.id === newItem.id)
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price })
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map ((item) => {
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },

        remove (id) {
            const cartItem = this.items.find((item) => item.id === id);

            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
        
    });

});

const form = document.getElementById('order-form');
const checkoutButton = document.getElementById('submit-btn');
const shippingAddressField = document.getElementById('address');
const pickupOption = document.getElementById('pickup');
const deliveryOption = document.getElementById('delivery');

// Initially disable the button
checkoutButton.disabled = true;
shippingAddressField.disabled = true;

// Listen for input changes on the form
form.addEventListener('input', validateForm);

// Listen for option changes (Pickup or Delivery)
pickupOption.addEventListener('click', function () {
    shippingAddressField.required = false; // Address is not required for Pickup
    shippingAddressField.disabled = true; // Disable the address field
    shippingAddressField.value = ''; // Clear the address field
    form.dataset.option = 'pickup'; // Set selected option
    document.getElementById('option').value = 'Pickup'; // Update hidden input
    validateForm(); // Revalidate the form to update the button state
});

deliveryOption.addEventListener('click', function () {
    shippingAddressField.required = true; // Address is required for Delivery
    shippingAddressField.disabled = false; // Enable the address field
    form.dataset.option = 'delivery'; // Set selected option
    document.getElementById('option').value = 'Delivery'; // Update hidden input
    validateForm(); // Revalidate the form to update the button state
});

// Validate the form
function validateForm() {
    let allFieldsFilled = true;

    // Check all form inputs
    for (let i = 0; i < form.elements.length; i++) {
        const field = form.elements[i];
        // Skip buttons or non-input elements
        if (field.type !== 'button' && field.type !== 'submit') {
            if (field.required && !field.value.trim()) {
                allFieldsFilled = false;
                break;
            }
        }
    }

    const optionSelected = form.dataset.option === 'pickup' || form.dataset.option === 'delivery';

    // Enable or disable the button based on form input values and selected option
    checkoutButton.disabled = !(allFieldsFilled && optionSelected);
    checkoutButton.classList.toggle('disabled', !(allFieldsFilled && optionSelected));
}

checkoutButton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/6282137756010?text=' + encodeURIComponent(message));
})

const formatMessage = (obj) => {
    const shippingAddress = obj.shippingAddress ? `Alamat: ${obj.shippingAddress}` : 'Alamat Pickup: Perumahan Buana Vista Indah tahap 1, Blok H No.49 \n https://maps.app.goo.gl/auL9tPRgFrHwYz4c9';
    const option = obj.option === 'Pickup' ? 'Pickup' : 'Delivery';

    return `Data Customer
        Nama: ${obj.name}
        Email: ${obj.email}
        No HP: ${obj.phone}
        Pilihan: ${option}
        ${shippingAddress}

Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`).join('')}
Total: ${rupiah(obj.total)}
Terima Kasih.`;
};

// convert to rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

document.getElementById('subscriptionForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Create the JSONP script tag
    const script = document.createElement('script');
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbwrKEIRAGIoXEmK4nXp4aVWvigkVVRIul8n8qtCdZOY6pdWxCzoFIfz_tKmT5KKlwb3Gw/exec';
    script.src = `${webAppUrl}?callback=handleResponse&name=${name}&email=${email}`;

    // Append the script to the body
    document.body.appendChild(script);
});

// Callback function for the JSONP response
function handleResponse(response) {
    console.log("Response received:", response); // Debug the response
    const msg = document.getElementById("subs-status");
    const nameInput  = document.getElementById("name");
    const emailInput  = document.getElementById("email");

    if (response.status === "success") {
        // alert(response.message); // Success message
        msg.innerHTML = "Subscription Successful";
        nameInput.value = "";
        emailInput.value = "";
        setTimeout(function() {
            msg.innerHTML = "";
        },3000);
    } else {
        // alert("An error occurred: " + response.message); // Error message
        msg.innerHTML = "Subscription Failed"
        nameInput.value = "";
        emailInput.value = "";
        setTimeout(function() {
            msg.innerHTML = "";
        },3000);
    }
}