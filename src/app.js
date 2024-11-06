
document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: "CakeIn's Signature Cheesecake (11-inch)", img: "cakeslice.png", price: 20000, class: "cheesecake show"},
            { id: 2, name: "CakeIn's Signature Cheesecake (4-inch)", img: "cakeslice.png", price: 20000, class: "cheesecake show" },
            { id: 3, name: "Basque Burnt Cheesecake", img: "cakeslice.png", price: 20000, class: "cheesecake show"},
            { id: 4, name: "Cream Bun", img: "cakeslice.png", price: 20000, class: "buns show"},
            { id: 5, name: "Milk Bun", img: "cakeslice.png", price: 20000, class: "buns show"},
            { id: 6, name: "Nutella Brownies", img: "cakeslice.png", price: 20000, class: "brownies show"}
        ]
    }));
});