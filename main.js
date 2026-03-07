const cartIcon=document.getElementById("icart"),cartContainer=document.getElementById("cart-container"),
cartClose=document.getElementById("cart-close"),cartContent=document.getElementById("cart-content"),
totalPriceEl=document.querySelector(".total-price"),cartCountEl=document.getElementById("cart-count"),
cartOrderBtn=document.getElementById("cart-order-btn");
let cart=[];

function updateCart(){
    cartContent.innerHTML="";
    let total=0;
    cart.forEach((item,index)=>{
        total+=item.price;
        const div=document.createElement("div");
        div.style.marginBottom="10px";
        div.innerHTML=`${item.title} - ₱${item.price} <button onclick="removeItem(${index})" class="btn btn-sm btn-danger">X</button>`;
        cartContent.appendChild(div);
    });
    totalPriceEl.innerText=`₱${total}`;
    cartCountEl.innerText=cart.length;
}

function removeItem(index){
    cart.splice(index,1);
    updateCart();
}

cartIcon.onclick=()=>cartContainer.classList.toggle("active");
cartClose.onclick=()=>cartContainer.classList.remove("active");

document.querySelectorAll(".add-cart").forEach(btn=>{
    btn.onclick=e=>{
        e.stopPropagation();
        const productEl=btn.closest(".products");
        const title=productEl.dataset.title;
        const price=parseInt(productEl.querySelector(".price").dataset.price);
        cart.push({title,price});
        updateCart();
        const msg=productEl.querySelector(".added-msg");
        msg.style.display="inline-block";
        setTimeout(()=>{msg.style.display="none"},1500);
    };
});

const detailModal=document.getElementById("product-detail-modal"),detailImg=document.getElementById("detail-img"),detailTitle=document.getElementById("detail-title"),detailDesc=document.getElementById("detail-desc"),popupPrice=document.getElementById("popup-price"),flavorSection=document.getElementById("flavor-section"),flavorSelect=document.getElementById("flavor-select"),popupAddCart=document.getElementById("popup-add-cart"),popupOrder=document.getElementById("popup-order");

const flavorData={
    "Croffles":[
        {name:"Chocolate",price:95},
        {name:"Vanilla & Milk",price:95},
        {name:"Matcha",price:100},
        {name:"Java Chip",price:105},
        {name:"Mocha",price:95},
        {name:"Cookies & Cream",price:105},
        {name:"Blueberry",price:95},
        {name:"Red Velvet",price:95},
        {name:"Butterscotch",price:95},
        {name:"Biscoff",price:140}
    ],
    "Frappe":[
        {name:"Chocolate Frappe",price:95},
        {name:"Vanilla & Milk Frappe",price:95},
        {name:"Matcha Frappe",price:100},
        {name:"Java Chip Frappe",price:105},
        {name:"Mocha Frappe",price:95},
        {name:"Cookies & Cream Frappe",price:105},
        {name:"Blueberry Frappe",price:95},
        {name:"Red Velvet Frappe",price:95},
        {name:"Butterscotch Frappe",price:95},
        {name:"Biscoff Frappe",price:140}
    ]
};

document.querySelectorAll(".products").forEach(prod=>{
    prod.onclick=()=>{
        detailImg.src=prod.dataset.img;
        detailTitle.innerText=prod.dataset.title;
        detailDesc.innerText=prod.dataset.desc;
        if(flavorData[prod.dataset.title]){
            flavorSection.style.display="block";
            flavorSelect.innerHTML="";
            flavorData[prod.dataset.title].forEach(f=>{
                const option=document.createElement("option");
                option.value=f.price;
                option.innerText=`${f.name} - ₱${f.price}`;
                flavorSelect.appendChild(option);
            });
            popupPrice.innerText=`₱${flavorData[prod.dataset.title][0].price}`;
        }else{
            flavorSection.style.display="none";
            popupPrice.innerText=prod.querySelector(".price").innerText;
        }
        detailModal.style.display="flex";
    };
});

flavorSelect.onchange=()=>{
    popupPrice.innerText=`₱${flavorSelect.value}`;
};

popupAddCart.onclick=()=>{
    let price=parseInt(flavorSection.style.display=="block"?flavorSelect.value:popupPrice.innerText.replace("₱",""));
    let title=detailTitle.innerText;
    cart.push({title,price});
    updateCart();
    alert("Added to Cart");
};

popupOrder.onclick=()=>{
    showPaymentModal();
};

document.getElementById("detail-close").onclick=()=>{
    detailModal.style.display="none";
};

const paymentModal=document.getElementById("payment-modal"),loader=document.getElementById("loader"),paymentMsg=document.getElementById("payment-msg"),confirmPayment=document.getElementById("confirm-payment"),closePayment=document.getElementById("close-payment");

function showPaymentModal(){
    paymentMsg.style.display="none";
    loader.style.display="block";
    paymentModal.style.display="flex";
}

confirmPayment.onclick=()=>{
    loader.style.display="block";
    paymentMsg.style.display="none";
    setTimeout(()=>{
        loader.style.display="none";
        paymentMsg.style.display="block";
        cart=[];
        updateCart();
    },2000);
};

closePayment.onclick=()=>{
    paymentModal.style.display="none";
};

cartOrderBtn.onclick=()=>{
    showPaymentModal();
};
