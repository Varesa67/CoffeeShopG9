
const products = [
  {
    title: "Ikuyo Kita",
    desc: "Best Girl",
    specs: ["Lead Guitar", "Singer", "Funk Guitarist"],
    button: "Learn More"
  },
  {
    title: "Anna Yanami",
    desc: "Losing Heroine",
    specs: ["4k tv", "Blue Haired", "Lovable"],
    button: "Learn More"
  },
  {
    title: "Ganyu",
    desc: "THE GOAT!!!",
    specs: ["Cocomilk", "OG Freeze Character", "Greatest Character of ALL TIME"],
    button: "Learn More"
  },
  {
    title: "Shinonome Yukina",
    desc: "Restrictive Writer Senpai",
    specs: ["Best Girl in my opinion", "Magazine Writer", "Yane no Shita no Artemis"],
    button: "Learn More"
  }
];

let title, desc, specsList, button;

function updateProduct(index) {
  if (!title || !desc || !specsList || !button) return;
  const product = products[index];
  title.textContent = product.title;
  desc.textContent = product.desc;
  button.textContent = product.button;

  specsList.innerHTML = "";
  product.specs.forEach(spec => {
    const li = document.createElement("li");
    li.textContent = "• " + spec;
    specsList.appendChild(li);
  });
}

// carousel initialization moved into DOM ready below

document.addEventListener('DOMContentLoaded', () => {
  // product carousel / hero only present on index
  title = document.getElementById("productTitle");
  desc = document.getElementById("productDesc");
  specsList = document.getElementById("productSpecs");
  button = document.getElementById("productBtn");

  if (title && desc && specsList && button) {
    updateProduct(0);
    const carousel = document.getElementById("carouselExampleCaptions");
    if (carousel) {
      carousel.addEventListener("slid.bs.carousel", function (event) {
        updateProduct(event.to);
      });
    }
  }
});

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
