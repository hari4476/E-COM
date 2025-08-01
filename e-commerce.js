let cart = [];
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const closeCartButton = document.getElementById('close-cart');

const updateCart = () => {
    cartItemsList.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(listItem);
        total += parseFloat(item.price);
    });
    
    totalPriceElement.textContent = total.toFixed(2);
    cartButton.textContent = `Cart (${cart.length})`;
};

const openCart = () => {
    cartModal.style.display = 'flex';
};

const closeCart = () => {
    cartModal.style.display = 'none';
};

const addToCart = (event) => {
    const button = event.target;
    const product = {
        id: button.getAttribute('data-id'),
        name: button.getAttribute('data-name'),
        price: button.getAttribute('data-price')
    };
    cart.push(product);
    updateCart();
};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

cartButton.addEventListener('click', openCart);
closeCartButton.addEventListener('click', closeCart);
