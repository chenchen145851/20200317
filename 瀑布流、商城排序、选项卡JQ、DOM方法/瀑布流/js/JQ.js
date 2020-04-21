let imageModule = (function () {
    let $columns = $('.column'),
        $lazyBoxs = null,
        _data = [];
    let queryData = function queryData() {
        $.ajax({
            url: 'json/data.json',
            method: 'get',
            dataType: 'json',
            async: false,
            success: result => {
                _data = result;
            }
        });

    };
    let binHTML = function binHTML() {
        _data = _data.map(item => {
            let {
                width,
                height
            } = item;
            let n = width / 230;
            height = height / n;
            item.width = 230;
            item.height = height;
            return item;
        });
        for (let i = 0; i < _data.length; i += 3) {
            let group = _data.slice(i, i + 3);
            if (i !== 0) {
                group.sort((a, b) => a.height - b.height);
                $columns.sort((a, b) => b.offsetHeight - a.offsetHeight)
            };
            $.each(group, (index, item) => {
                let {
                    link,
                    pic,
                    title,
                    height
                } = item;
                $(`<div class="card">
				<a href="${link}>
					<div class="lazyImageBox" style="height:${height}px">
						<img src="" alt="" data-image="${pic}">
					</div>
					<p>${title}</p>
				</a>
			</div>`).appendTo($columns.eq(index));
            });

        }
    };
    let lazyFunc = function lazyFunc() {
        $lazyBoxs = $('.lazyImageBox').filter((index, item) => {
            return $(item).find('img').attr('data-image');
        });  

    };




   
    return {
        init() {
            queryData();
            binHTML();
            lazyFunc();
        }
    };
})();
imageModule.init();