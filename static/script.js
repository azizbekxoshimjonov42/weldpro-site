function changeLanguage(language) {
    const elements = document.querySelectorAll("[data-uz]");

    elements.forEach(function (element) {
        const translation = element.getAttribute("data-" + language);

        if (translation) {
            element.textContent = translation;
        }
    });

    document.documentElement.lang = language;
    localStorage.setItem("weldpro-language", language);

    const buttons = document.querySelectorAll(".languages button");

    buttons.forEach(function (button) {
        button.classList.remove("active");
    });

    const languages = ["uz", "ru", "en", "zh"];
    const buttonIndex = languages.indexOf(language);

    if (buttonIndex !== -1) {
        buttons[buttonIndex].classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const savedLanguage =
        localStorage.getItem("weldpro-language") || "uz";

    changeLanguage(savedLanguage);
});document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cartButton");
    const cartPanel = document.getElementById("cartPanel");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartClose = document.getElementById("cartClose");
    const cartItems = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const productCards = document.querySelectorAll(".product-card");

    const cart = {};

    function currentLanguage() {
        const activeButton = document.querySelector("[data-lang].active");
        return activeButton ? activeButton.dataset.lang : "uz";
    }

    const buttonTranslations = {
        uz: "Savatga qo‘shish",
        ru: "Добавить в корзину",
        en: "Add to cart",
        zh: "加入购物车"
    };

    productCards.forEach((card, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "add-to-cart";
        button.dataset.uz = "Savatga qo‘shish";
        button.dataset.ru = "Добавить в корзину";
        button.dataset.en = "Add to cart";
        button.dataset.zh = "加入购物车";
        button.textContent =
            buttonTranslations[currentLanguage()] ||
            buttonTranslations.uz;

        button.addEventListener("click", () => {
            if (!cart[index]) {
                cart[index] = 0;
            }

            cart[index]++;
            renderCart();
            openCart();
        });

        card.appendChild(button);
    });

    function renderCart() {
        cartItems.innerHTML = "";

        let total = 0;

        Object.keys(cart).forEach((index) => {
            const quantity = cart[index];

            if (quantity <= 0) {
                delete cart[index];
                return;
            }

            total += quantity;

            const card = productCards[index];
            const title =
                card.querySelector("h3")?.textContent.trim() ||
                `Mahsulot ${Number(index) + 1}`;

            const item = document.createElement("div");
            item.className = "cart-item";

            item.innerHTML = `
                <h4>${title}</h4>

                <div class="cart-quantity">
                    <button type="button" class="minus">−</button>
                    <strong>${quantity}</strong>
                    <button type="button" class="plus">+</button>
                    <button type="button" class="cart-remove">×</button>
                </div>
            `;

            item.querySelector(".minus").addEventListener("click", () => {
                cart[index]--;
                renderCart();
            });

            item.querySelector(".plus").addEventListener("click", () => {
                cart[index]++;
                renderCart();
            });

            item.querySelector(".cart-remove").addEventListener("click", () => {
                delete cart[index];
                renderCart();
            });

            cartItems.appendChild(item);
        });

        cartCount.textContent = total;
        cartTotal.textContent = total;
        cartEmpty.style.display = total === 0 ? "block" : "none";
    }

    function openCart() {
        cartPanel.classList.add("open");
        cartOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeCart() {
        cartPanel.classList.remove("open");
        cartOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    cartButton.addEventListener("click", openCart);
    cartClose.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    renderCart();
});