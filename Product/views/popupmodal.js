const open = document.getElementById("btn-open");
const close = document.getElementById("btn-close");
const modalContainer = document.getElementById("modal-container");
const modalDemo = document.getElementById("modal-demo");

open.addEventListener("click", () => {
  modalContainer.classList.add("show");
});
close.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});
modalContainer.addEventListener("click", (e) => {
  if (e.target.id ==="modal-container") {
    close.click();
  }
});
