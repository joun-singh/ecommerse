export const addItemToCart = (product, next) => {
  var cart = [];
  if (typeof window === "object") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...product, count: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  next();
};

export const loadCart = () => {
  if (typeof window === "object") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productID) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      var cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart = cart.filter((item) => item._id !== productID);

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
  }
  next();
};
