const addProductBtn = document.querySelector("#add-product-btn");
const emptyAddProductBtn = document.querySelector("#empty-add-product-btn");

const productDrawer = document.querySelector("#product-drawer");
const drawerOverlay = document.querySelector("#drawer-overlay");

const closeDrawerBtn = document.querySelector("#close-drawer-btn");
const cancelProductBtn = document.querySelector("#cancel-product-btn");


function openProductDrawer() {
    productDrawer.classList.remove("translate-x-full");
    productDrawer.classList.add("translate-x-0");

    drawerOverlay.classList.remove(
        "opacity-0",
        "pointer-events-none"
    );

    drawerOverlay.classList.add(
        "opacity-100",
        "pointer-events-auto"
    );
}


function closeProductDrawer() {
    productDrawer.classList.remove("translate-x-0");
    productDrawer.classList.add("translate-x-full");

    drawerOverlay.classList.remove(
        "opacity-100",
        "pointer-events-auto"
    );

    drawerOverlay.classList.add(
        "opacity-0",
        "pointer-events-none"
    );
}


// OPEN
addProductBtn.addEventListener("click", openProductDrawer);

emptyAddProductBtn.addEventListener("click", openProductDrawer);


// CLOSE
closeDrawerBtn.addEventListener("click", closeProductDrawer);

cancelProductBtn.addEventListener("click", closeProductDrawer);

drawerOverlay.addEventListener("click", closeProductDrawer);