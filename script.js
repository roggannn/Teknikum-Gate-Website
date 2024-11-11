let cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productName = e.target.getAttribute('data-name');
    const productPrice = parseFloat(e.target.getAttribute('data-price'));

    addToCart(productName, productPrice);
  });
});

function addToCart(name, price) {
  // Add item to cart
  const item = cart.find(i => i.name === name);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  // Clear current cart display
  cartItemsContainer.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}`;
    cartItemsContainer.appendChild(li);

    total += item.price * item.quantity;
  });

  // Update the total price
  totalPriceElement.textContent = total.toFixed(2) + " kr";
}