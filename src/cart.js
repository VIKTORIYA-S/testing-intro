function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) throw new RangeError("Вы не добавили товар в корзину.");
  const existing = cart.find((item) => item.id === product.id);
  const newQuantity = (existing ? existing.quantity : 0) + quantity;
  if (product.stock < newQuantity) throw new RangeError("Недостаточно товара на складе.");
  if (existing) return cart.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item));
  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, id, quantity) {
  if (quantity <= 0) throw new RangeError("Вы не добавили товар в корзину.");
  const existing = cart.find((item) => item.id === id);
  if (!existing) return cart;
  if (existing.stock < quantity)
    throw new RangeError("Недостаточно товара на складе.");
  const result = cart.map((item) => (item.id === id ? { ...item, quantity } : item));
  return result;
}
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
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = (promoCode === 'SAVE10' && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0);
  const delivery = (subtotal < 50000 ? 30000 : 0);
  const total = subtotal - discount + delivery;
  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
