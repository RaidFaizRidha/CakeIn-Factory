//for navbar end

document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        open: false,
        selectedItem: {},

        items: [
            { id: 1, name: "Original Burnt Cheesecake (1 Slice)", img: "original-slice.jpeg", price: 25000, class: "cheesecake-slice show", description: "A classic cheesecake with a rich and creamy texture."},
            { id: 2, name: "Matcha Burnt Cheesecake (1 Slice)", img: "matcha-slice.jpeg", price: 26000, class: "cheesecake-slice show", description: "A smaller version of our signature cheesecake." },
            { id: 3, name: "Crumble Blueberry Cheesecake (1 Slice)", img: "crumble-slice.jpeg", price: 30000, class: "cheesecake-slice show", description: "A unique burnt cheesecake with a rich, caramelized top."},
            { id: 4, name: "Original Burnt Cheesecake (Whole Cake)", img: "original-whole.jpeg", price: 200000, class: "cheesecake-whole show", description: "A soft, fluffy bun filled with rich cream filling."},
            { id: 5, name: "Matcha Burnt Cheesecake (Whole Cake)", img: "matcha-whole.jpeg", price: 208000, class: "cheesecake-whole show", description: "A deliciously soft bun with a subtle milk flavor."},
            { id: 6, name: "Crumble Blueberry Cheesecake (Whole cake)", img: "crumble-whole.jpeg", price: 230000, class: "cheesecake-whole show", description: "Chewy brownies with a generous swirl of Nutella."}
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

// convert to rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};