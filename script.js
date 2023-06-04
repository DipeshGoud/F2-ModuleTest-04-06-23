let menuData;
let orderStatus = {};

async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        menuData = await response.json();

        console.log("Menu:");
        const menuList = document.getElementById('menu-list');
        menuData.forEach(item => {
            console.log(`${item.name} - ${item.price}`);
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                                <img src="${item.imgSrc}">
                                <div class="info">${item.name} - ${item.price}</div>`;
            menuList.appendChild(listItem);
        });
    } catch (error) {
        console.log('Error:', error);
    }
}

function takeOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const order = {
                burgers: menuData.sort(() => 0.5 - Math.random()).slice(0, 3)
            };
            const orderList = document.getElementById('order-list');
            order.burgers.forEach(ele => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
            <img src="${ele.imgSrc}">
            <div class="info">${ele.name} - ${ele.price}</div>`;
                orderList.appendChild(listItem);
            });
            resolve(order.burgers);
        }, 2500);
    });
}

function prepareOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            orderStatus = {
                order_status: true,
                paid: false
            };
            const orderEle1 = document.getElementById('order-status');
            orderEle1.textContent = `Order Status: ${orderStatus.order_status}`;

            resolve(orderStatus);
        }, 1500);
    });
}

function makePayment() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            orderStatus = {
                order_status: true,
                paid: true
            };
            const orderEle1 = document.getElementById('order-status');
            orderEle1.textContent = 'Payment Status: Paid';

            resolve(orderStatus);
        }, 1000);
    });
}

function thankyou() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderStatusEl = document.getElementById('order-status');
            orderStatusEl.textContent = 'Thank you for dining with us today!';
            resolve();
        }, 1000);
    });

}

async function processOrder() {
    try {
        await getMenu();

        console.log('Order:', await takeOrder());

        console.log('Order Status:', await prepareOrder());

        console.log('Payment Status:', await makePayment());

        await thankyou();
        console.log('Thank you for dining with us today!');

    } catch (error) {
        console.log('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', processOrder);
