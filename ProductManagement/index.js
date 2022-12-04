let productsService = new ProductService();
const domId = (id) => {
  return document.getElementById(id);
};

const getProductList = () => {
  productsService.getList().then(function (response) {
    renderProductList(response.data);
  });
};

const renderProductList = (data) => {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<tr>
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].price}</td>
            <td><img style ="height:100px;" src="${data[i].img}" ></td>
            <td><p>${data[i].desc}</p></td>
            <td>
                <button onclick="deleteProduct('${
                  data[i].id
                }')" class="btn btn-outline-dark"> Xoá </button>
                
                <button data-target="#myModal" data-toggle="modal" class="btn btn-outline-info" onclick="openUpdateModal(${
                  data[i].id
                })"> Sửa </button>
            </td>
          </tr>`;
  }
  document.getElementById("tblDanhSachSP").innerHTML = html;
  reset();
};

domId("btnThemSP").onclick = function () {
  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(".modal-footer").innerHTML =
    "<button onclick='addProduct()' class='btn btn-primary'>Thêm</button>";
};
const addProduct = () => {
  let isValidate = validateForm();
  if (!isValidate) return;
  let name = domId("TenSP").value;
  let price = domId("GiaSP").value;
  let img = domId("HinhSP").value;
  let desc = domId("MoTaSP").value;
  let frontCamera = domId("camtruoc").value;
  let backCamera = domId("camsau").value;
  let screen = domId("manHinhSP").value;
  let type = domId("type").value;

  let product = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  document.querySelector(".close").click();
  productsService.addProduct(product).then(function () {
    alert("Thêm sản phẩm thành công");
    getProductList();
  });
};

const openUpdateModal = (id) => {
  document.querySelector(".modal-title").innerHTML = "Sửa sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick='updateProduct(${id})' class='btn btn-primary'>Sửa</button>`;

  productsService.getById(id).then(function (response) {
    domId("TenSP").value = response.data.name;
    domId("GiaSP").value = response.data.price;
    domId("HinhSP").value = response.data.img;
    domId("MoTaSP").value = response.data.desc;
  });
};
const updateProduct = (id) => {
  let isValidate = validateForm();
  if (!isValidate) return;

  let name = domId("TenSP").value;
  let price = domId("GiaSP").value;
  let img = domId("HinhSP").value;
  let desc = domId("MoTaSP").value;

  let product = new Product(name, price, img, desc);

  document.querySelector(".close").click();

  productsService.updateProduct(id, product).then(function () {
    alert("Sửa sản phẩm thành công");
    getProductList();
  });
  reset();
};

const deleteProduct = (id) => {
  productsService.deleteProduct(id).then(function () {
    alert("Xoá thành công");
    getProductList();
  });
};
reset = () => {
  domId("nameSP").style.display = "none";
  domId("priceSP").style.display = "none";
  domId("imgSP").style.display = "none";
  domId("descSP").style.display = "none";
};

validateForm = () => {
  let productName = domId("TenSP").value;
  let productPrice = domId("GiaSP").value;
  let productImg = domId("HinhSP").value;
  let productDesc = domId("MoTaSP").value;
  let productFrontCamera = domId("camtruoc").value;
  let productBackCamera = domId("camsau").value;
  let screen = domId("manHinhSP").value;

  isValidate = true;
  isValidate &=
    required(productFrontCamera, "tbCamTruoc") &&
    checkCamera(productFrontCamera, "tbCamTruoc");
  domId("tbCamTruoc").style.display = "block";

  isValidate &=
    required(productBackCamera, "tbCamSau") &&
    checkCamera(productBackCamera, "tbCamSau");
  domId("tbCamSau").style.display = "block";

  isValidate &= required(screen, "screenSP") && checkScreen(screen, "screenSP");
  domId("screenSP").style.display = "block";

  isValidate &=
    required(productName, "nameSP") && checkName(productName, "nameSP");
  domId("nameSP").style.display = "block";

  isValidate &=
    required(productPrice, "priceSP") &&
    checkBasicSalary(productPrice, "priceSP");
  domId("priceSP").style.display = "block";

  isValidate &=
    required(productImg, "imgSP") && checkUrlImg(productImg, "imgSP");
  domId("imgSP").style.display = "block";

  isValidate &= required(productDesc, "descSP");
  domId("descSP").style.display = "block";

  return isValidate;
};

// Validate
required = (value, spanId) => {
  if (value.length === 0) {
    domId(spanId).innerHTML = "* Ô này bắt buộc nhập.";
    return !1;
  }
  domId(spanId).innerHTML = "";
  return !0;
};

checkBasicSalary = (value, spanId) => {
  let pattern = /^([5-9]\d{2}|[1-9]\d{4}|[1-9]\d{3})$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return !0;
  }
  document.getElementById(spanId).innerHTML = "* Nhập giá từ 500 - 99999";
  return !1;
};

checkUrlImg = (value, spanId) => {
  let pattern = /^.*\.(?:jpg|gif|png)$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return !0;
  }
  document.getElementById(spanId).innerHTML =
    "* Nhập Url theo dạng ( .jpg, .gif hoặc .png)";
  return !1;
};

checkName = (value, spanId) => {
  let pattern = /^[A-z 0-9\+]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return !0;
  }
  document.getElementById(spanId).innerHTML =
    "* Chỉ chấp nhận các ký tự A-z 0-9 và +";
  return !1;
};
checkCamera = (value, spanId) => {
  let pattern = /^[A-z 0-9\&]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return !0;
  }
  document.getElementById(spanId).innerHTML =
    "* Chỉ chấp nhận các ký tự A-z 0-9 và &";
  return !1;
};
checkScreen = (value, spanId) => {
  let pattern = /^[A-z 0-9]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return !0;
  }
  document.getElementById(spanId).innerHTML =
    "* Chỉ chấp nhận các ký tự A-z 0-9";
  return !1;
};

// ===================================================================================

window.onload = () => {
  getProductList();
};
