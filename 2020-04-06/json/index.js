let shopModule = (function () {
    let navLive = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox');
    cardBox = null;
    let queryDaTA = function queryDaTA() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cardBox = JSON.parse(xhr.responseText)
            }
        };
        xhr.send(null);
    };
    let handle = function handle() {
        let str = ``;
        cardBox.forEach(item => {
            let {
                img,
                title,
                hot,
                time,
                price
            } = item;
            str += `<div class="card">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">价格：￥${price.toFixed(2)}</p>
                <p class="card-text">销量：${hot}</p>
                <p class="card-text">时间：${time.replace(/-/g,'/')}</p>
                <a href="#" class="btn btn-primary">立即购买</a>
            </div>
        </div>`;
        });
        productBox.innerHTML = str;
    };
    let clear = function clear() {
        Array.from(navLive).forEach(item => {
            if (item !== this) {
                item.flag = -1;
            }
        });
    };
    let binDing = function binDing() {
        Array.from(navLive).forEach(item => {
            item.flag = -1;
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                let pai = this.getAttribute('data-pai');
                cardBox.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a - b) * this.flag;
                });
                handle();
            };

        });
    };










    return {
        init() {
            queryDaTA();
            handle();
            binDing();
            clear();
        }
    };
})();
shopModule.init();