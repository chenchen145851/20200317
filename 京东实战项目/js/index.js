// 轮播图
(function () {
    let section = document.querySelector('.section'),
        wrapper = document.querySelector('.wrapper'),
        sliderList = document.querySelectorAll('.slider'),
        paginationList = document.querySelectorAll('.pagination li'),
        changeLeft = document.querySelector('.changeLeft'),
        changeRight = document.querySelector('.changeRight');


    let step = 0,
        prev = 0,
        interval = 3000,
        autoTimer = null,
        len = sliderList.length;

    function change() {
        let cur = sliderList[step],
            pre = sliderList[prev];

        cur.style.zIndex = 1;
        pre.style.zIndex = 0;
        cur.style.transition = 'all 2s';
        cur.style.opacity = 1;
        cur.ontransitionend = () => {
            pre.style.transition = '0s';
            pre.style.opacity = 0;
        }
        paginationFocus();
    };

    function paginationFocus() {
        [].forEach.call(paginationList, (item, index) => {
            if (index === step) {
                item.className = 'active';
                return;
            }
            item.className = '';
        });
    };

    function autoMove() {
        prev = step;
        step++;
        step > (len - 4) ? step = 0 : null;
        change();
    };
    autoTimer = setInterval(autoMove, interval);
    section.onmouseenter = function () {
        clearInterval(autoTimer);
    };
    section.onmouseleave = function () {
        autoTimer = setInterval(autoMove, interval);
    };
    [].forEach.call(paginationList, (item, index) => {
        item.onmouseover = function () {
            prev = step;
            step = index;
            change();
        }
    });
    changeRight.onclick = autoMove;
    changeLeft.onclick = function () {
        prev = step;
        step--;
        step < 0 ? step = len - 1 : null;
        change();
    }
})();
// 登录界面
(function () {
    function xuan(li, div) {
        for (let i = 0; i < li.length; i++) {
            li[i].onmouseover = function () {
                for (let j = 0; j < li.length; j++) {
                    li[j].className = ''
                    div[j].style.display = 'none';
                }
                li[i].className = 'active'
                div[i].style.display = 'block';
            }
        }
    }

    let ul = document.getElementById('tabsList');
    let lis = ul.getElementsByTagName('li');
    let divs = document.getElementsByClassName('ycg');
    xuan(lis, divs);

    let ul1 = document.getElementById('ul1');
    let lis1 = ul1.getElementsByTagName('li');
    let divs1 = document.getElementsByClassName('smallycg1');
    xuan(lis1, divs1);

    let ul2 = document.getElementById('ul2');
    let lis2 = ul2.getElementsByTagName('li');
    let divs2 = document.getElementsByClassName('smallycg2');
    xuan(lis2, divs2);

    let ul3 = document.getElementById('ul3');
    let lis3 = ul3.getElementsByTagName('li');
    let divs3 = document.getElementsByClassName('smallycg3');
    xuan(lis3, divs3);

    //小图标选项卡移动
    let tabs = document.getElementById('tabs');
    let icon = document.getElementsByClassName('icon');
    let putAway = document.getElementsByClassName('putAway');

    for (let i = 0; i < icon.length; i++) {
        icon[i].onmouseover = function () {
            let flag = false;
            if (flag) {
                return;
            }
            flag = true;
            setTimeout(() => {
                !flag;
            }, 500);

            let top = parseInt(getComputedStyle(tabs).top);
            let timer = null;
            timer = setInterval(() => {
                top -= 10;
                if (top <= -220) {
                    clearInterval(timer);
                }
                tabs.style.top = top + 'px';
            }, 10);
        }
    }

    for (let i = 0; i < putAway.length; i++) {
        putAway[i].onclick = function () {
            let top = parseInt(getComputedStyle(tabs).top);
            let timer = null;
            timer = setInterval(() => {
                top += 10;
                if (top >= 0) {
                    clearInterval(timer);
                }
                tabs.style.top = top + 'px';
            }, 10);
        }

    }
})();
// 秒杀界面
(function () {
    let box = document.querySelector('.timeDistance'),
        content = document.querySelector('#content'),
        timer = null;

    // 获取服务器时间
    function getServerTime() {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest;
            xhr.open('head', 'js/data.json?_=' + Math.random());
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 2 && /^(2|3)\d{2}$/.test(xhr.status)) {
                    let time = xhr.getResponseHeader('date');
                    // 获取的TIME是格林尼治时间 GMT（北京时间 GMT+0800）
                    time = new Date(time);
                    resolve(time);
                }
            };
            xhr.send(null);
        });
    }

    // 根据服务器时间计算倒计时
    function computed(time) {
        // time从服务器获取的当时间
        // target是抢购的目标时间
        // spanTime两个时间的毫秒差
        let target = new Date('2020/06/18 20:20:20'),
            spanTime = target - time;
        if (spanTime <= 0) {
            // 已经到达抢购的时间节点了
            box.innerHTML = "购物狂欢开始吧！";
            clearInterval(timer);
            return;
        }
        // 计算出毫秒差中包含多少小时、多少分钟、多少秒
        let hours = Math.floor(spanTime / (60 * 60 * 1000));
        spanTime = spanTime - hours * 60 * 60 * 1000;
        let minutes = Math.floor(spanTime / (60 * 1000));
        spanTime = spanTime - minutes * 60 * 1000;
        let seconds = Math.floor(spanTime / 1000);
        hours < 10 ? hours = '0' + hours : null;
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;
        content.innerHTML = `${hours}:${minutes}:${seconds}`;
    }

    getServerTime().then(time => {
        // 获取到服务器时间后，计算倒计时
        computed(time);

        // 每间隔1秒中，让获取的时间累加1秒，在重新计算倒计时结果
        timer = setInterval(() => {
            time = new Date(time.getTime() + 1000);
            computed(time);
        }, 1000);
    });
})();

// 选项卡/图片滚动
(function () {
    function xuan(li, div) {
        for (let i = 0; i < li.length; i++) {
            li[i].onmouseover = function () {
                for (let j = 0; j < li.length; j++) {
                    li[j].className = ''
                    div[j].style.display = 'none';
                }
                li[i].className = 'active'
                div[i].style.display = 'block';
            }
        }
    }

    function rankingList() {
        let btRight = document.getElementById('bt-right');
        let lis = btRight.children;
        let rank = document.getElementsByClassName('rank');
        xuan(lis, rank)
    }
    rankingList();
    // 图片滚动
    function PictureScroll() {
        let rollMain = document.getElementsByClassName('roll-main')[0],
            PictureScroll = document.getElementsByClassName('PictureScroll-main')[0];

        function dong() {
            let left = parseInt(rollMain.style.left);
            left -= 2;
            rollMain.style.left = left + 'px';

            if (left <= -1200) {
                clearInterval(timer);
                rollMain.style.left = "0px";
                timer = setInterval(dong, 20);
            }
        }
        let timer = setInterval(dong, 20);

        PictureScroll.onmouseover = function () {
            clearInterval(timer);
        }

        PictureScroll.onmouseout = function () {
            timer = setInterval(dong, 20);
        }
    }
    PictureScroll();
})();

// 延迟加载
let cascadeFlowModule = (function () {
    let columns = Array.from(document.querySelectorAll('.column')),
        _data = [];

    // 从服务器获取数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'js/data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    // 实现数据绑定
    let bindHTML = function bindHTML() {
        _data = _data.map(item => {
            item.width = 130;
            item.height = 150;
            return item;
        });
        for (let i = 0; i < _data.length; i += 5) {
            let group = _data.slice(i, i + 5);
            group.forEach((item, index) => {
                let {
                    pic,
                    link,
                    title,
                    height,
                    price
                } = item;
                let card = document.createElement('div');
                card.className = "card";
                card.innerHTML = `<a href="${link}">
					<div class="lazyImageBox" style="height:${height}px">
						<img src="" alt="" data-image="${pic}">
					</div>
                    <p>${title}</p>
                    <span>
                    ￥${price}
                </span>
				</a>`;
                columns[index].appendChild(card);
            });
        }
    };

    // 延迟加载
    let lazyFunc = function lazyFunc() {
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        [].forEach.call(lazyImageBoxs, lazyImageBox => {
            let isLoad = lazyImageBox.getAttribute('isLoad');
            if (isLoad === "true") return;
            let B = utils.offset(lazyImageBox).top +
                lazyImageBox.offsetHeight / 2;
            let A = document.documentElement.clientHeight +
                document.documentElement.scrollTop;
            if (B <= A) {
                lazyImg(lazyImageBox);
            }
        });
    };
    let lazyImg = function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            dataImage = img.getAttribute('data-image'),
            tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = () => {
            img.src = dataImage;
            utils.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
        tempImage = null;
        lazyImageBox.setAttribute('isLoad', 'true');
    }
    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = function () {
                lazyFunc();
            };
        }
    }
})();
cascadeFlowModule.init();