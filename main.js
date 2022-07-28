// CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
// OPEN CART(POP UP)
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// CLOSE CART (POP UP)
closeCart.onclick = () => {
    cart.classList.remove("active");
};
// CART WORKING
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}
// FUNCTION 
function ready(){
    // REMOVE ITEM FROM CART
    let removeCartButton = document.getElementsByClassName("cart-remove");
    console.log(removeCartButton);
    for (let i = 0; i < removeCartButton.length; i++){
        let button = removeCartButton[i]
        button.addEventListener("click", removeCartItems);
    }
    // QUANTITY CHANGES
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged)
    }   
        // Add to cart
        let addToCart = document.getElementsByClassName("add-cart")
        for (let i = 0; i < addToCart.length; i++){
            let button = addToCart [i];
            button.addEventListener("click", addCartClicked)
        }
        // Buy Button Work
        document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked)
}
// Buy Button
function buyButtonClicked(){
    alert("Has confirmado la compra")
    let cartContent = document.getElementsByClassName("cart-content")[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

// REMOVE SHIRTS FROM CART
function removeCartItems(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updateTotal();
}
// QUANTITY CHANGES FUNCTION
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}
function addCartClicked(event){
    const button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    updateTotal();
}
function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
        alert("Agregaste el producto")
        return;
        }
    }
const cartBoxContent = 
                        `<img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash-alt cart-remove'></i> `
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItems);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}
// UPDATE TOTAL
function updateTotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0
    for (let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // IF price contain some cents value...
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "$ " + total;
}

