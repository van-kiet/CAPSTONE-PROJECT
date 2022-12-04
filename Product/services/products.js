function ProductService() {
  this.getList = function () {
    return axios({
      url: "https://636a274bb10125b78fd2055f.mockapi.io/Products",
      method: "GET",
    });
  };
  this.addProduct = function (data) {
    return axios({
      url: "https://636a274bb10125b78fd2055f.mockapi.io/Products",
      method: "POST",
      data: data,
    });
  };
  this.getById = function (id) {
    return axios({
      url: `https://636a274bb10125b78fd2055f.mockapi.io/Products/${id}`,
      method: "GET",
    });
  };
  this.updateProduct = function (id, data) {
    return axios({
      url: `https://636a274bb10125b78fd2055f.mockapi.io/Products/${id}`,
      method: "PUT",
      data: data,
    });
  };
  this.deleteProduct = function (id) {
    return axios({
      url: `https://636a274bb10125b78fd2055f.mockapi.io/Products/${id}`,
      method: "DELETE",
    });
  };
}
