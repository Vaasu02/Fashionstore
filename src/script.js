let shop = document.querySelector("#shop");
console.log(shop);


let basket=JSON.parse(localStorage.getItem("data")) || [];
let generateshop=()=>{
    return (shop.innerHTML=shopitems.map((x)=>{
        let {price,id,desc,image,name}=x;
        let search= basket.find((x)=> x.id===id) || [];
    return `<div id=product-id-${id}
    class="items">
    <img width=220px src="${image}" alt="">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash"></i>
                <div id=${id} class="quantity">${search.item === undefined?0:search.item}</div>
                <i onclick="increment(${id})" class="bi bi-plus"></i>
            </div>
        </div>
    </div>
</div>`;    
    }).join(""));
}

generateshop();


let increment=(id)=>{
    let selecteditem=id;
    let search=basket.find((x)=> x.id===selecteditem.id);
    if(search===undefined){
        basket.push({
            id:selecteditem.id,
            item:1
        });
    }else{
        search.item += 1;
    }
    
    
    update(selecteditem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket);
    
   
};
let decrement=(id)=>{
    let selecteditem=id;
    let search=basket.find((x)=> x.id===selecteditem.id);

    if(search===undefined){
        return;
    }else if(search.item===0){
        return;
    }else{
        search.item -= 1;
    }
    
    update(selecteditem.id);
    

    // console.log(basket);

    basket=basket.filter((x)=>x.item!==0);
    localStorage.setItem("data",JSON.stringify(basket));
   
};

let update=(id)=>{
    let search=basket.find((x)=> x.id===id);
    console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
};

let calculation=()=>{
    let carticon=document.querySelector(".cartamount");
    carticon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x + y, 0);
   
};
calculation();
