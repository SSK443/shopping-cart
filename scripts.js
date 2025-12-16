document.addEventListener('DOMContentLoaded',function(){
  const products=[
    {id:1,products:"lamp",price:33},
    {id:2,products:"torch",price:150},
    {id:3,products:"tree",price:400},
    {id:4,products:"tyre",price:3300},
  ]
  const cart=[];
  let total=0;
  const productSection = document.querySelector(".products");
  const addmsg = document.querySelector(".card-msg");
  const totalValue = document.querySelector(".total-price");
const proDiv=document.createElement('div');
proDiv.className="pro"
products.forEach((pro)=>{
 proDiv.innerHTML += `
  <article class='prod'><span>product:${pro.products}</span> <span>price:${pro.price}</span> <button prod-id="${pro.id}">add to card</button></article>
  
  `;
})
productSection.appendChild(proDiv);

proDiv.addEventListener('click',function(e){
  if(e.target.tagName==="BUTTON"){
   let productId=parseInt(e.target.getAttribute("prod-id"))
   
    let cartResult=products.find((pro)=>pro.id===productId)
    cart.push(cartResult);
   
    addToCart()
  }

})

function addToCart(){
  total=0
  if(cart.length>0){
    addmsg.innerHTML='';
    cart.forEach((pro)=>{
      addmsg.innerHTML += `
      
       <article class='prod'><span>product:${pro.products}</span> <span>price:${pro.price}</span> </article>
      `;
      total+=pro.price
      
    })

totalprice(total)
  }else{
    console.log('something wrong');
    
  }

}

function totalprice(price){
totalValue.style.visibility = "visible";
totalValue.innerHTML = `
<article>total:${price} <button class="checkOut"

>checkout</button></article>

`;

}

totalValue.addEventListener('click',function(e){
  if(e.target.classList.contains('checkOut')){
    checkOut(e)
  }
})
function checkOut(e){
  e.stopPropagation()
  
  alert('checkout sucessfully')
  totalValue.style.visibility = "hidden";
  cart.length=0;
  addmsg.innerHTML="empty card"
  total=0

}

})