// Shopping Cart Functions
var shoppingCart = (function () {
    //Private methods and props
    var cart = [];

    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    };

    // saveCart() - allows to go from page to page - add an item and display cart later
    function saveCart() //use when edit is made to cart
    {
        localStorage.setItem("shoppingCart", JSON.stringify(cart)); //"name", value - convert to string or number
    }

    // loadCart() - load saved cart from local storage
    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart")); //this item will be a string - need to convert
    }

    loadCart();

    //Public methods and props
    var obj = {};

    // addItemToCart(name, price, count)
    obj.addItemToCart = function (name, price, count) {
        for (var i in cart) //verify same item isnt added
        {
            if (cart[i].name === name) //if item is added increment count
            {
                cart[i].count += count;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };

    // removeItemFromCart(name) - only removes one item
    obj.removeItemFromCart = function (name) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count--;
                if (cart[i].count === 0) {
                    removeItemFromCartAll(name);//splice - remove item from array
                }
                break;
            }
        }
        saveCart();
    };

    // removeItemFromCartAll(name) - removes all item
    obj.removeItemFromCartAll = function (name) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };

    // clearCart() - clear all of cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    };

    // countCart() - return total count
    obj.countCart = function () {
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }
        return totalCount;
    };

    // totalCart() - return total cost
    obj.totalCost = function () {
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    // listCart() - array of items
    obj.listCart = function () {
        var cartCopy = [];
        for (var i in cart) {
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    return obj;
})();


