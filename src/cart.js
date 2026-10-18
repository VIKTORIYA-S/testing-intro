function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart() { return notImplemented(); }
function changeQuantity() { return notImplemented(); }
function removeFromCart(cart, id) {
  return cart.filter((product) => product.id !== id);
}
function calculateCartSubtotal(cart) {
  const initialValue = 0;
  const sumWithInitial = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
    initialValue,
  );
  return sumWithInitial;
}
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
