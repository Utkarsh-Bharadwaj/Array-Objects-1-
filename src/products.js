var products = [{ "id": 101, "name": "Basket Ball", "image": "basketball.png", "price": 150 },
{ "id": 102, "name": "Football", "image": "football.png", "price": 120 },
{ "id": 103, "name": "Soccer", "image": "soccer.png", "price": 110 },
{ "id": 104, "name": "Table Tennis", "image": "table-tennis.png", "price": 130 },
{ "id": 105, "name": "Tennis", "image": "tennis.png", "price": 100 }];

cart = products;
empCart = [];

for(var i =0; i<products.length; i++){
    cart[i].quantity=1;
}

function displayProducts(products) {
    for (var i = 0; i < products.length; i++) {
        $('#products').append(`<div id="product-${products[i].id}" class="product">
        <img src="images/${products[i].image}">
        <h3 class="title"><a href="#">${products[i].name}</a></h3>
        <span>Price: ${products[i].price} </span>
        <a class="add-to-cart" data-addcart= "${products[i].id}" id="${products[i].id}"  href="#">Add To Cart</a>
    </div>`)
    }
}

$('document').ready(function () {
    displayProducts(products);
});

$(document).ready(function () {
    var addProd;
    temp = [];

    $(document).on('click','.add-to-cart',function(){
        addProd = $(this).data('addcart');
        for(var i = 0;i<products.length;i++){
            if(products[i].id==addProd){
                if(temp.includes(products[i])){
                    temp[i].quantity+=1; 
                }else{
                    temp.push(products[i]);
                }
            }
        }
        empCart=temp;
        cartDisplay(temp);
    })
});

function cartDisplay(prod){
    var html1 = '<tr><th>ID</th><th>Name</th><th>Price</th><th>Quantity</th><th>Update</th><th>Delete</th></tr>';
    
    var total = 0;
    for(var i=0;i<prod.length;i++){
        var pprice=0;
        pprice=prod[i].quantity*prod[i].price;
        total += pprice; 
        html1 +='<tr>\
        <td>'+prod[i].id+'</td>\
        <td>'+prod[i].name+'</td>\
        <td>'+pprice+'</td>\
        <td><input type="text" id="num" value="'+prod[i].quantity+'"</td><td><input type="button" id="update" data-prod="'+i+'" value="Update"</td>\
        <td><a href="#" id="delete" data-del="'+prod[i].id+'">Delete</a></td>\
        </tr><br>'
    }
    html1 +='<tr><td></td><td>Sum</td><td>'+total+'</td><td></td></tr>'
    html1 +='<input type="button" value="Cart Empty" onclick="cartEmpty()" id="emp">'
    $('#tbody').html(html1);

}

$(document).ready(function(){
    var val;
    $(document).on('click','#update',function(){
        var qua = $('#num').val();
        val = $(this).data('prod');
        empCart[val].quantity = qua;
        cartDisplay(empCart)
    })
})

function cartEmpty(){
    empCart=[];
    cartDisplay(empCart)
}

$(document).ready(function(){
    var clear;
    $(document).on('click','#delete',function(){
        clear = $(this).data('del');
        for(var i=0;i<empCart.length;i++){
            if(empCart[i].id==clear){
                empCart.splice(i,1);
            }
        }
        cartDisplay(empCart)
    })
})



