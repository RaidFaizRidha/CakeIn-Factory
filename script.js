const navLinks = document.querySelectorAll('.navbar-menu');
const sections = document.querySelectorAll('section');

let currentSection = 'home';
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        if (window.scrollY >= (section.offsetTop - section.clientHeight / 3)) {
            currentSection= section.id;
        }
    });

    navLinks.forEach(navLink => {
        if (navLink.href.includes(currentSection)) {
            document.querySelector('.actived').classList.remove('actived');
            navLink.classList.add('actived');
        }
    });
});

// toggle class active for cart page start
const shoppingCart = document.querySelector('.cart-page');
document.querySelector('#cart-container-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    document.body.classList.add('no-scroll');
    document.querySelector('.modal-cart').classList.add('active-modal-cart');
    e.preventDefault();
};

const fc = document.querySelector('.client-form');
const sc = document.querySelector('#cart-container-button');
document.addEventListener('click', function(e) {
    if (!sc.contains(e.target) && !shoppingCart.contains(e.target) && !fc.contains(e.target)) {
        shoppingCart.classList.remove('active');
        document.body.classList.remove('no-scroll');
        document.querySelector('.modal-cart').classList.remove('active-modal-cart');
    };
});

const cfButton = document.querySelector('.checkout-button');
document.querySelector('.checkout-button').onclick = (e) => {
    fc.classList.toggle('form-active');
    e.preventDefault();
};

const closeIconCf = document.querySelector('.close-icon-delivery');
document.addEventListener('click', function(e) {
    if (closeIconCf.contains(e.target)) {
        fc.classList.remove('form-active'); // Close the form
        return; // Exit to prevent other conditions from running
    }

    if (!fc.contains(e.target) && !cfButton.contains(e.target)) {
        fc.classList.remove('form-active');
    };
});

function chooseOption(option) {
    const addressField = document.getElementById('address');
    const pickupLink = document.getElementById('pickup');
    const deliveryLink = document.getElementById('delivery');
    // addressField.disabled = true;
  
    if (option === 'delivery') {
      // Enable address field for delivery
    //   addressField.disabled = false;
    //   addressField.required = true;
      deliveryLink.classList.add('selected');
      pickupLink.classList.remove('selected');
    } else if (option === 'pickup') {
      // Disable address field for pickup
    //   addressField.disabled = true;
    //   addressField.required = false;
      pickupLink.classList.add('selected');
      deliveryLink.classList.remove('selected');
    }
  }
  
// toggle class active for cart page end

// toggle dropdown
const dropdown = document.querySelector('.dropdown-page');
document.querySelector('#navbar-dropdown').onclick = (e) => {
    dropdown.classList.toggle('active');
    document.body.classList.add('no-scroll-dropdown');
    document.querySelector('.modal-dropdown').classList.add('active-modal-dropdown');
    e.preventDefault();
}

const dropdownOutside = document.querySelector('#navbar-dropdown');
document.addEventListener('click', function(e) {
    if (!dropdownOutside.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        document.body.classList.remove('no-scroll-dropdown');
        document.querySelector('.modal-dropdown').classList.remove('active-modal-dropdown')
    };
});

// highlight category start
var btnContainer = document.getElementById("category-container");
var btns = btnContainer.getElementsByClassName("category-menu");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active-category");
    current[0].className = current[0].className.replace(" active-category", "");
    this.className += " active-category";
  });
}
// highlight category end

// category filter start
filterSelection("all")
function filterSelection(c) {
    const x = document.getElementsByClassName("card-products");
    if (c == "all") c = "";
    for ( let i = 0; i < x.length; i++ ) {
        removingClass( x[i], "show" );
        if ( x[i].className.indexOf(c) > -1 ) addingClass( x[i], "show" )
    }
};

function addingClass(element, name) {
    let arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
};

function removingClass(element, name) {
    let arr1,arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        };
    };
    element.className = arr1.join(" ");
};

for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1);
    }
};
// category filter end




