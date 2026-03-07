function initScrollSpy() {
  const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));
  const navbar = document.querySelector('.navbar');
  const offset = () => navbar ? navbar.offsetHeight : 0;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollPos = window.scrollY + offset() + 20;
        let currentIndex = 0;
        sections.forEach((sec, i) => {
          if (!sec) return;
          if (sec.offsetTop <= scrollPos) currentIndex = i;
        });
        navLinks.forEach((link, i) => {
          if (i === currentIndex) link.classList.add('active');
          else link.classList.remove('active');
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
document.addEventListener('DOMContentLoaded', initScrollSpy);

/* menu.js code */
let btnEl = document.getElementById("icart"); 
let cartContainerEl = document.querySelector(".cart-container");
let cartCloseEl = document.getElementById("cart-close");
let productList=[];

let newDivEl = document.createElement("div");
let bascketEl = document.querySelector(".cart-content");

if (btnEl) {
  btnEl.addEventListener("click",()=>{
      cartContainerEl.classList.add("cart-active");
  });
}

if (cartCloseEl) {
  cartCloseEl.addEventListener("click",()=>{
      cartContainerEl.classList.remove("cart-active");
  });
}

function removeItem() {
    // Remove food items from cart
    let cartEl = document.querySelectorAll(".cart-remove");
    cartEl.forEach((btnRemove) => {
        btnRemove.addEventListener("click", removeParent);
    });

    // Product item change event
    let quantityEl = document.querySelectorAll(".cart-quantity");
    quantityEl.forEach((inputBoxEl) => {
        inputBoxEl.addEventListener("change", quantityBox);
    });

    // Product cart
    let addBtnEl = document.querySelectorAll(".btn-cart");
    addBtnEl.forEach((btn) => {
        btn.addEventListener("click", addtocart);
    });

    updateTotal();
}
removeItem();  // callback function

function removeParent() {
    // Remove product from cart
    this.parentElement.remove();
    removeItem();
}

function quantityBox() {
    if(isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    removeItem();
}

// Add to cart
function addtocart() {
    // Dynamically create element
    let product = this.parentElement;
    let productTitle = product.querySelector("#product-title").innerText;
    let productPrice = product.querySelector("#price").innerText;
    let productImg = product.querySelector(".product-img").src;

    let newProduct = {productTitle, productPrice, productImg};
    productList.push(newProduct);

    // Create new div element
    let showCartList = creatCartProduct(productTitle, productPrice, productImg);
    // let newDivEl = document.createElement("div");
    newDivEl.innerHTML = showCartList;
    // let bascketEl = document.querySelector(".cart-content");
    bascketEl.append(newDivEl);
    removeItem();
}

function creatCartProduct(productTitle, productPrice, productImg) {
    return `
        <div class="cart-box">
            <img src="${productImg}" class="cart-img">
            <div class="detail-box">
                <div class="cart-food-title">${productTitle}</div>
                <div class="price-box">
                    <div class="cart-price">${productPrice}</div>
                    <div class="cart-amt">${productPrice}</div>
                </div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i name="trash" class="bi bi-trash cart-remove"></i>
        </div>
    `
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    let total = 0;

    if (!totalValue) return;

    cartItems.forEach(product => {
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
      });
      totalValue.innerHTML='Rs.'+total;
  
        //cart-count
      const cartCount=document.querySelector('#cart-count');
      let count=productList.length;
      cartCount.innerHTML=count;

      if(count===0){
        cartCount.style.display="none"
      }
      else{
        cartCount.style.display="block"
      }
}


const cartIcon=document.getElementById("icart"),cartContainer=document.getElementById("cart-container"),
cartClose=document.getElementById("cart-close"),cartContent=document.getElementById("cart-content"),
totalPriceEl=document.querySelector(".total-price"),cartCountEl=document.getElementById("cart-count"),
cartOrderBtn=document.getElementById("cart-order-btn");
let cart=[];function updateCart(){cartContent.innerHTML="";let total=0;cart.forEach((item,index)=>{total+=item.price;const div=document.createElement("div");div.style.marginBottom="10px";div.innerHTML=`${item.title} - ₱${item.price} <button onclick="removeItem(${index})" class="btn btn-sm btn-danger">X</button>`;cartContent.appendChild(div);});totalPriceEl.innerText=`₱${total}`;cartCountEl.innerText=cart.length;}function removeItem(index){cart.splice(index,1);updateCart();}cartIcon.onclick=()=>cartContainer.classList.toggle("active");cartClose.onclick=()=>cartContainer.classList.remove("active");document.querySelectorAll(".add-cart").forEach(btn=>{btn.onclick=e=>{e.stopPropagation();const productEl=btn.closest(".products");const title=productEl.dataset.title;const price=parseInt(productEl.querySelector(".price").dataset.price);cart.push({title,price});updateCart();const msg=productEl.querySelector(".added-msg");msg.style.display="inline-block";setTimeout(()=>{msg.style.display="none"},1500);};});const detailModal=document.getElementById("product-detail-modal"),detailImg=document.getElementById("detail-img"),detailTitle=document.getElementById("detail-title"),detailDesc=document.getElementById("detail-desc"),popupPrice=document.getElementById("popup-price"),flavorSection=document.getElementById("flavor-section"),flavorSelect=document.getElementById("flavor-select"),popupAddCart=document.getElementById("popup-add-cart"),popupOrder=document.getElementById("popup-order");const flavorData={"Croffles":[{name:"Chocolate",price:95},{name:"Vanilla & Milk",price:95},{name:"Matcha",price:100},{name:"Java Chip",price:105},{name:"Mocha",price:95},{name:"Cookies & Cream",price:105},{name:"Blueberry",price:95},{name:"Red Velvet",price:95},{name:"Butterscotch",price:95},{name:"Biscoff",price:140}],"Frappe":[{name:"Chocolate Frappe",price:95},{name:"Vanilla & Milk Frappe",price:95},{name:"Matcha Frappe",price:100},{name:"Java Chip Frappe",price:105},{name:"Mocha Frappe",price:95},{name:"Cookies & Cream Frappe",price:105},{name:"Blueberry Frappe",price:95},{name:"Red Velvet Frappe",price:95},{name:"Butterscotch Frappe",price:95},{name:"Biscoff Frappe",price:140}]};document.querySelectorAll(".products").forEach(prod=>{prod.onclick=()=>{detailImg.src=prod.dataset.img;detailTitle.innerText=prod.dataset.title;detailDesc.innerText=prod.dataset.desc;if(flavorData[prod.dataset.title]){flavorSection.style.display="block";flavorSelect.innerHTML="";flavorData[prod.dataset.title].forEach(f=>{const option=document.createElement("option");option.value=f.price;option.innerText=`${f.name} - ₱${f.price}`;flavorSelect.appendChild(option);});popupPrice.innerText=`₱${flavorData[prod.dataset.title][0].price}`;}else{flavorSection.style.display="none";popupPrice.innerText=prod.querySelector(".price").innerText;}detailModal.style.display="flex";};});flavorSelect.onchange=()=>{popupPrice.innerText=`₱${flavorSelect.value}`};popupAddCart.onclick=()=>{let price=parseInt(flavorSection.style.display=="block"?flavorSelect.value:popupPrice.innerText.replace("₱",""));let title=detailTitle.innerText;cart.push({title,price});updateCart();alert("Added to Cart");};popupOrder.onclick=()=>{showPaymentModal()};document.getElementById("detail-close").onclick=()=>{detailModal.style.display="none"};const paymentModal=document.getElementById("payment-modal"),loader=document.getElementById("loader"),paymentMsg=document.getElementById("payment-msg"),confirmPayment=document.getElementById("confirm-payment"),closePayment=document.getElementById("close-payment");function showPaymentModal(){paymentMsg.style.display="none";loader.style.display="block";paymentModal.style.display="flex"}confirmPayment.onclick=()=>{loader.style.display="block";paymentMsg.style.display="none";setTimeout(()=>{loader.style.display="none";paymentMsg.style.display="block";cart=[];updateCart();},2000)};closePayment.onclick=()=>{paymentModal.style.display="none"};cartOrderBtn.onclick=()=>{showPaymentModal()};
