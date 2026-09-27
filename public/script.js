const addProductBtn = document.querySelector("#add-product-btn");
const emptyAddProductBtn = document.querySelector("#empty-add-product-btn");

const productDrawer = document.querySelector("#product-drawer");
const drawerOverlay = document.querySelector("#drawer-overlay");

const closeDrawerBtn = document.querySelector("#close-drawer-btn");
const cancelProductBtn = document.querySelector("#cancel-product-btn");

let editingProductId = null;



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



addProductBtn.addEventListener("click", openProductDrawer);

emptyAddProductBtn.addEventListener("click", openProductDrawer);


closeDrawerBtn.addEventListener("click", closeProductDrawer);

cancelProductBtn.addEventListener("click", closeProductDrawer);

drawerOverlay.addEventListener("click", closeProductDrawer);



const productList = document.querySelector("#product-list");
const emptyState = document.querySelector("#empty-state");
const pagination = document.querySelector("#pagination");

const searchInput = document.querySelector("#search-input");

let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products.");
        }

        const products = await response.json();

        console.log("Products:", products);

        renderProducts(products);
        updateDashboard(products);

    } catch (error) {
        console.error("Failed to load products:", error);
    }
}


function renderProducts(products) {

    // Clear anything currently in the table
    productList.innerHTML = "";

    // If MongoDB has no products
    if (products.length === 0) {
        emptyState.classList.remove("hidden");
        pagination.classList.add("hidden");
        return;
    }

    // We DO have products
    emptyState.classList.add("hidden");

    products.forEach(product => {

        const row = document.createElement("tr");

        row.className = `
            border-b border-[#E7EEEE]
            hover:bg-[#FAFCFC]
            transition-colors
        `;

        row.innerHTML = `
            <td class="px-6 py-5">
                <div>
                    <p class="font-semibold text-[#102A33]">
                        ${product.name}
                    </p>

                    <p class="mt-1 text-xs text-[#819196]">
                        ${product.tags?.join(" • ") || "No tags"}
                    </p>
                </div>
            </td>

            <td class="px-6 py-5">
                <span class="text-sm text-[#53676D]">
                    ${product.category}
                </span>
            </td>

            <td class="px-6 py-5">
                <span class="text-sm font-semibold text-[#102A33]">
                    $${Number(product.price).toFixed(2)}
                </span>
            </td>

            <td class="px-6 py-5">
                ${
                    product.inStock
                        ? `
                            <span class="
                                inline-flex items-center gap-2
                                px-3 py-1.5
                                rounded-full
                                bg-[#E9F8F1]
                                text-[#15785A]
                                text-xs font-semibold
                            ">
                                <span class="
                                    w-1.5 h-1.5
                                    rounded-full
                                    bg-[#08C7A1]
                                "></span>

                                In stock
                            </span>
                        `
                        : `
                            <span class="
                                inline-flex items-center gap-2
                                px-3 py-1.5
                                rounded-full
                                bg-[#F2F4F4]
                                text-[#708287]
                                text-xs font-semibold
                            ">
                                <span class="
                                    w-1.5 h-1.5
                                    rounded-full
                                    bg-[#94A3A7]
                                "></span>

                                Unavailable
                            </span>
                        `
                }
            </td>

                <td class="px-6 py-5">
                    <div class="flex items-center justify-end gap-2">

                        <button
                            class="
                                edit-product-btn
                                px-3 py-2
                                rounded-lg
                                bg-[#EAF7F5]
                                text-[#087D9D]
                                text-xs
                                font-semibold
                                hover:bg-[#DDF2EF]
                                transition-colors
                            "
                            data-id="${product._id}"
                        >
                            Edit
                        </button>

                        <button
                            class="
                                delete-product-btn
                                px-3 py-2
                                rounded-lg
                                bg-[#FFF0F0]
                                text-[#B54747]
                                text-xs
                                font-semibold
                                hover:bg-[#FFE2E2]
                                transition-colors
                            "
                            data-id="${product._id}"
                        >
                            Delete
                        </button>

                    </div>
                </td>
        `;

        productList.appendChild(row);
    });
}

productList.addEventListener("click", async (event) => {

    const editButton = event.target.closest(".edit-product-btn");

    if (editButton) {

        const productId = editButton.dataset.id;

        try {
            const response = await fetch(`/api/products/${productId}`);

            if (!response.ok) {
                throw new Error("Could not load product.");
            }

            const product = await response.json();

            editingProductId = product._id;

            document.querySelector("#product-name").value =
                product.name;

            document.querySelector("#product-description").value =
                product.description;

            document.querySelector("#product-price").value =
                product.price;

            document.querySelector("#product-category").value =
                product.category;

            document.querySelector("#product-stock").checked =
                product.inStock;

            document.querySelector("#product-tags").value =
                product.tags?.join(", ") || "";

            document.querySelector("#drawer-title").textContent =
                "Edit product";

            document.querySelector("#save-product-btn").textContent =
                "Update product";

            openProductDrawer();

        } catch (error) {
            console.error("Failed to load product:", error);
        }

        return;
    }


    const deleteButton = event.target.closest(".delete-product-btn");

    if (deleteButton) {

        const productId = deleteButton.dataset.id;

        const confirmed = confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Delete failed:", data);
                return;
            }

            console.log("Product deleted:", data);

            await fetchProducts();

        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    }
});

function updateStats(products) {
    const totalProducts = products.length;

    const inStockProducts = products.filter(
        product => product.inStock === true
    ).length;

    const unavailableProducts = products.filter(
        product => product.inStock === false
    ).length;

    const totalValue = products.reduce(
        (total, product) => total + product.price,
        0
    );

    const availability =
        totalProducts > 0
            ? Math.round((inStockProducts / totalProducts) * 100)
            : 0;

    // Update DOM here
}

function updateDashboard(products) {

    const totalProducts = products.length;

    const inStock = products.filter(product => product.inStock).length;

    const outOfStock = products.filter(product => !product.inStock).length;

    const catalogValue = products.reduce(
        (total, product) => total + Number(product.price),
        0
    );

    const availability =
        totalProducts === 0
            ? 0
            : Math.round((inStock / totalProducts) * 100);


    document.querySelector("#total-products").textContent =
        totalProducts;

    document.querySelector("#in-stock-count").textContent =
        inStock;

    document.querySelector("#out-stock-count").textContent =
        outOfStock;

    document.querySelector("#catalog-value").textContent =
        catalogValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        });

    document.querySelector("#availability-percent").textContent =
        `${availability}%`;

    document.querySelector("#availability-bar").style.width =
        `${availability}%`;
}


const productForm = document.querySelector("#product-form");

productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const product = {
        name: document.querySelector("#product-name").value.trim(),
        description: document.querySelector("#product-description").value.trim(),
        price: Number(document.querySelector("#product-price").value),
        category: document.querySelector("#product-category").value.trim(),
        inStock: document.querySelector("#product-stock").checked,
        tags: document
            .querySelector("#product-tags")
            .value
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "")
    };

    console.log("Sending product:", product);

    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("API error:", data);
            return;
        }

        console.log("Product created:", data);

        productForm.reset();
        closeProductDrawer();

    } catch (error) {
        console.error("Failed to create product:", error);
    }
});

fetchProducts();