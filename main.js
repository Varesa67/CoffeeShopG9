
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

// cart helpers
function getCart() {
  const raw = localStorage.getItem('cart');
  if (raw) {
    try { return JSON.parse(raw); } catch { }
  }
  return { drinks: 0, bread: 0 };
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  cart[item] = (cart[item] || 0) + 1;
  saveCart(cart);
  alert(`Added one ${item} to cart`);
  updateCartBadge && updateCartBadge();
}

function displayCart() {
  const container = document.getElementById('cartContents');
  if (!container) return;
  const cart = getCart();
  let html = '';
  if (cart.drinks) {
    html += `<p>Drinks × ${cart.drinks} @ 100 = ${cart.drinks * 100}</p>`;
  }
  if (cart.bread) {
    html += `<p>Bread × ${cart.bread} @ 50 = ${cart.bread * 50}</p>`;
  }
  const total = cart.drinks * 100 + cart.bread * 50;
  if (total === 0) {
    html = '<p>Your cart is empty.</p>';
  } else {
    html += `<h3>Total: ${total}</h3>`;
  }
  container.innerHTML = html;
}

function bindCartButtons() {
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.item);
    });
  });
}

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

  bindCartButtons();
  displayCart();
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
