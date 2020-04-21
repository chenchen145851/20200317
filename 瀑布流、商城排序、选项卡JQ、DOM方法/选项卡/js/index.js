// $(function () {
//     let $tabBox = $('.tabBox'),
//         $tab = $tabBox.children('.tab'),
//         $naLive = $tab.children('li'),
//         $conList = $tabBox.children('div');
//     $naLive.on('click', function () {
//         let $this = $(this),
//             index = $(this).index();
//         $naLive.removeClass('active');
//         $conList.removeClass('active');
//         $naLive.addClass('active');
//         $conList.eq(index).addClass('active');
//     });
// });

/* 获取兄弟元素 */
// $(function () {
//     let $tabBox = $('.tabBox'),
//         $tab = $tabBox.children('.tab'),
//         $naLive = $tab.children('li'),
//         $conList = $tabBox.children('div');
//     $naLive.on('click', function () {
//         let $this = $(this),
//             index = $(this).index();
//         $naLive.addClass('active').siblings().removeClass('active');
//         $conList.eq(index).addClass('active').siblings().removeClass('active');
//     });
// });



/* 让上一个没有当前有，性能高 */
$(function () {
    let $tabBox = $('.tabBox'),
        $tab = $tabBox.children('.tab'),
        $naLive = $tab.children('li'),
        $conList = $tabBox.children('div');

    let prevIndex = 0;
    $naLive.on('click', function () {
        let $this = $(this),
            index = $(this).index();
        if (index === prevIndex) return;
        $naLive.eq(prevIndex).removeClass('active');
        $conList.eq(prevIndex).removeClass('active');
        $naLive.addClass('active');
        $conList.eq(index).addClass('active');
        prevIndex = index;
    });
});