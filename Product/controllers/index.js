const productService = new ProductService();
const domId = (id) => document.getElementById(id);
//in ra màn hình =============================
const getProductService = () => {
  productService.getList().then(function (response) {
    renderProductList(response.data);
  });
};
const renderProductList = (data) => {
  let content = "";
  // console.log(data);
  for (let i in data) {
    content += `
        <div class = "card">
        <img src="${data[i].img}" >
        <div class = "info">
        <h4>${data[i].name}</h4>
        <p>
        <span>${data[i].desc}</span> <br/>
        Screen:${data[i].screen}. <br/>
        BackCamera:${data[i].backCamera} <br/>
        FontCamera: ${data[i].frontCamera} <br/>
        Price:$${data[i].price}<button onclick="findCart(${data[i].id})">Add</button>
        </p>
        </div>
        </div>
        `;
  }
  domId("renderproducts").innerHTML = content;
};
// filter======================================
const filterProductList = (type) => {
  let list = [];
  productService.getList().then(function (response) {
    const data = response.data;
    for (let i in data) {
      if (data[i].type === type) {
        list.push(data[i]);
      }
      if (type === "all") {
        list.push(data[i]);
      }
    }
    renderProductList(list);
  });
};
domId("type").onchange = (event) => {
  let type = event.target.value;
  filterProductList(type);
};
// in cart
let list = [];
const findCart = (id) => {
  productService.getList().then(function (response) {
    const data = response.data;
    const idx = data.findIndex((element) => {
      return element.id == id;
    });

    var cartItem = {
      product: 0,
      quantity: 1,
    };
    let test = false;

    if (list.length > 0) {
      for (let i in list) {
        if (list[i].product.id == id) {
          if (list[i].quantity === 10) {
            alert("Chỉ được thêm tối đa 10 sản phẩm!");
            test = true;
          } else {
            list[i].quantity += 1;
            test = true;
          }
        }
      }
      if (test == false) {
        cartItem.product = data[idx];
        list.push(cartItem);
      }
    } else {
      cartItem.product = data[idx];
      list.push(cartItem);
    }
    setLocalStorage();
    const listLocal = getLocalStorage();
    renderCart(listLocal);
    domId("tb").style.display = "none";
  });
};
const renderCart = (data) => {
  let cart = ``;

  for (let i in data) {
    cart += `
      <tr>
      <td><img src="${data[i].product.img}" ></td>
      <td>${data[i].product.name}</td>
      <td><div class="div"><button type="button"  onclick="quantityDown(${
        data[i].product.id
      })"><i class="las la-minus"></i></button><span id="quantity">${
      data[i].quantity
    }</span><button  onclick="quantityUp(${
      data[i].product.id
    })"><i class="las la-plus"></i></button></div></td>
      <td>$${data[i].product.price * data[i].quantity}</td>
      <td><i onclick="remove(${
        data[i].product.id
      })" class="fas fa-trash"></i></td>
      </tr>
      `;
  }
  total();
  domId("cart").innerHTML = cart;
};
const quantityDown = (id) => {
  for (let i in list) {
    if (list[i].quantity === 1) {
      list.splice(i, 1);
    } else if (list[i].product.id == id) {
      list[i].quantity -= 1;
    }
  }
  if (list.length < 1) {
    domId("tb").style.display = "block";
  }
  setLocalStorage();

  renderCart(list);
};
const quantityUp = (id) => {
  for (let i in list) {
    if (list[i].quantity === 10 && list[i].product.id == id) {
      alert("Tối đa chỉ được 10 sản phẩm!");
    } else if (list[i].product.id == id) {
      list[i].quantity += 1;
    }
  }
  console.log("2");
  setLocalStorage();
  renderCart(list);
};
const remove = (id) => {
  for (let i in list) {
    if (list[i].product.id == id) {
      list.splice(i, 1);
    }
  }
  if (list.length < 1) {
    domId("tb").style.display = "block";
  }
  setLocalStorage();
  renderCart(list);
};
const total = () => {
  let total = 0;
  for (let i in list) {
    total += list[i].quantity * list[i].product.price;
  }
  domId("tongtien").innerHTML = total;
};
const clearList = () => {
  list = [];
  if (list.length < 1) {
    domId("tb").style.display = "block";
  }
  renderCart(list);
  setLocalStorage();
};
const setLocalStorage = () => {
  const stringify = JSON.stringify(list);
  localStorage.setItem("LIST_CART", stringify);
};
const getLocalStorage = () => {
  const stringify = localStorage.getItem("LIST_CART");
  if (stringify) {
    return JSON.parse(stringify);
  }
  console.log("1");
};
window.onload = () => {
  getProductService();
  list = getLocalStorage();
  if (list.length > 0) {
    domId("tb").style.display = "none";
  } else {
    domId("tb").style.display = "block";
  }

  renderCart(list);
  console.log(list);
};
