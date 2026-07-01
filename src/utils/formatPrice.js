export function formatPrice(price) {
  if (typeof price === 'number') {
    return `₹${price.toLocaleString('en-IN')}`;
  }
  return price;
}

export default formatPrice;
