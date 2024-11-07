
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

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
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

// convert to rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};