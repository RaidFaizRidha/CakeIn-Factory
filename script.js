
// toggle class active for cart page start
const shoppingCart = document.querySelector('.cart-page');
document.querySelector('#cart-container-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    document.body.classList.add('no-scroll');
    document.querySelector('.modal-cart').classList.add('active-modal-cart');
    e.preventDefault();
};

const sc = document.querySelector('#cart-container-button');
document.addEventListener('click', function(e) {
    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
        document.body.classList.remove('no-scroll');
        document.querySelector('.modal-cart').classList.remove('active-modal-cart')
    };
});
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
}

function addingClass(element, name) {
    let arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

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