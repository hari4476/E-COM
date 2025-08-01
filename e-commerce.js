const products = [
  // Mobiles
  { id: 1, category: 'mobiles', name: 'iPhone 13', price: 799, img: 'https://www.sathya.store/img/product/64oN8poTZxPULXDp.jpg' },
  { id: 2, category: 'mobiles', name: 'Samsung Galaxy S21', price: 699, img: 'https://m.media-amazon.com/images/I/71CXhVhpM0L._UF1000,1000_QL80_.jpg' },
  { id: 3, category: 'mobiles', name: 'Google Pixel 6', price: 599, img: 'https://5.imimg.com/data5/SELLER/Default/2023/10/355046885/FW/HL/CK/126530580/google-pixel-6-256gb-black-500x500.png' },

  // Watches
  { id: 4, category: 'watches', name: 'Rolex Submariner', price: 7500, img: 'https://media.rolex.com/image/upload/q_auto:best/f_auto/c_limit,w_3840/v1727258031/rolexcom/collection/family-pages/professional-watches/submariner/top-navigation/professional-watches-submariner-all-models-navigation_m126603-0001_2210jva_001' },
  { id: 5, category: 'watches', name: 'Apple Watch Series 7', price: 399, img: 'https://rukminim2.flixcart.com/image/704/844/ku8pbbk0/smartwatch/n/6/6/ios-mkht3hn-a-apple-yes-original-imag7eqy2wthytgz.jpeg?q=90&crop=false' },
  { id: 6, category: 'watches', name: 'Fossil Chronograph', price: 150, img: 'https://static.helioswatchstore.com/media/catalog/product/m/e/me3098_1.jpg' },

  // Clothes
  { id: 7, category: 'clothes', name: 'Plain White T-Shirt', price: 20, img: 'https://outoforder.in/wp-content/uploads/2020/03/Plain-White-Tshirt-for-Men.jpg' },
  { id: 8, category: 'clothes', name: 'Blue Denim Jeans', price: 45, img: 'https://img.tatacliq.com/images/i16//437Wx649H/MP000000021276240_437Wx649H_202402211909091.jpeg' },
  { id: 9, category: 'clothes', name: 'Black Hoodie', price: 35, img: 'https://nobero.com/cdn/shop/files/WhatsAppImage2023-11-09at10.34.47AM.jpg?v=1734845956' },

  // Bags
  { id: 10, category: 'bags', name: 'Leather Handbag', price: 120, img: 'https://m.media-amazon.com/images/I/717eQv1xPDS._UY1000_.jpg' },
  { id: 11, category: 'bags', name: 'Canvas Backpack', price: 60, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbc4B37jXsDrzbPElTLrQhgvvyfGCGEJ952g&s' },
  { id: 12, category: 'bags', name: 'Travel Duffel Bag', price: 80, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5e_o1fksj8xrYyVnKJn3jxlOaZ7JawGCUFA&s' },

  // Laptops
  { id: 13, category: 'laptops', name: 'MacBook Pro 14"', price: 1999, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAbk5HQUB0kEq7SJ9PSo0tbGdisKIYaCl3iQ&s' },
  { id: 14, category: 'laptops', name: 'Dell XPS 13', price: 1299, img: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/media-gallery/platinum/notebook-xps-13-9350-t-oled-sl-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=320&wid=557&qlt=100,1&resMode=sharp2&size=557,320&chrss=full' },
  { id: 15, category: 'laptops', name: 'HP Spectre x360', price: 1399, img: 'https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2021%2F08%2FHP-Spectre-x360-14-1-of-7.jpg&signature=b273734ba382a58d403431a960fd1708' },

  // Mobile Accessories
  { id: 16, category: 'accessories', name: 'Wireless Charger', price: 40, img: 'https://www.portronics.com/cdn/shop/files/FLUX_wireless_phone_charger_stand.jpg?v=1734939820&width=1445' },
  { id: 17, category: 'accessories', name: 'Phone Case', price: 15, img: 'https://www.portronics.com/cdn/shop/files/FLUX_wireless_phone_charger_stand.jpg?v=1734939820&width=1445' },
  { id: 18, category: 'accessories', name: 'Bluetooth Earbuds', price: 60, img: 'https://images.meesho.com/images/products/455256878/bkrdu_512.jpg' },
];

const productsContainer = document.getElementById('products');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const categoryButtons = document.querySelectorAll('.category-btn');

let cart = [];

function renderProducts(filterCategory = 'all') {
  productsContainer.innerHTML = '';

  const filtered = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  filtered.forEach(product => {
    const prodEl = document.createElement('div');
    prodEl.className = 'product';
    prodEl.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productsContainer.appendChild(prodEl);
  });

  attachAddToCartEvents();
}

function attachAddToCartEvents() {
  const buttons = document.querySelectorAll('.add-cart-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      const product = products.find(p => p.id === id);
      addToCart(product);
    });
  });
}

function addToCart(product) {
  cart.push(product);
  updateCartUI();
}

function updateCartUI() {
  cartBtn.textContent = `Cart (${cart.length})`;

  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItemsList.appendChild(li);
  });

  cartTotalEl.textContent = total.toFixed(2);
}

cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'flex';
});

closeCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

checkoutBtn.addEventListener('click', () => {
  if(cart.length === 0){
    alert('Your cart is empty!');
    return;
  }
  alert(`Thank you for your purchase! Total: $${cart.reduce((acc, i) => acc + i.price, 0).toFixed(2)}`);
  cart = [];
  updateCartUI();
  cartModal.style.display = 'none';
});

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.getAttribute('data-category'));
  });
});

// Initial render with all products
renderProducts();
categoryButtons[0].classList.add('active');
updateCartUI();
