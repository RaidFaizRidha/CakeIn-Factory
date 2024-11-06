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
        }
    }
    element.className = arr1.join(" ");
}

for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1)
    }
}
// category filter end
