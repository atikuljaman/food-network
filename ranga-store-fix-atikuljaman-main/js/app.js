const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <div class="btn-icon">
      <div>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="detailsBtn(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
      </div>
      <div>
      <span><i class="fas fa-star-half-alt"></i> ${product.rating.rate}</span>
      <span><i class="fas fa-thumbs-up"></i> ${product.rating.count}</span>
      </div>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  //document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  //document.getElementById(id).innerText = Math.round(value);
 document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
  getInputValue("price") + getInputValue("delivery-charge") +
  getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};



// load products details
const detailsBtn = id => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
  .then(data => displayOnUi(data))
};

// display product details on UI
const displayOnUi = details => {
  console.log(details);
  const productDiv = document.getElementById('product-div');
  productDiv.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('product-details');
  div.innerHTML = ` 
  <img src="${details.image}" alt="">
  <div class="product-desc">
    <p class="product-title">${details.title}</p>
    <P>${details.description}</P>
    <P class="product-price">Price: $ ${details.price}</P>
    <p class="product-rating">Rating <i class="fas fa-star-half-alt"></i> ${details.rating.rate}</p>
  </div>
</div>
  </hr>
  `
  productDiv.appendChild(div)
};