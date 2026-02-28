
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

const title = document.getElementById("productTitle");
const desc = document.getElementById("productDesc");
const specsList = document.getElementById("productSpecs");
const button = document.getElementById("productBtn");

function updateProduct(index) {
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

updateProduct(0);

const carousel = document.getElementById("carouselExampleCaptions");
carousel.addEventListener("slid.bs.carousel", function (event) {
  updateProduct(event.to);
});
