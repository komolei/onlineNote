import $ from 'JQ';
// const $ = require('JQ');
require('../../less/waterFall.less');


function waterFall() {
  const $img = $('span');
  // console.log('span22', $img);
  const $item = $('.note');
  $item.addClass('noteT');
  const arrimg = []; // 存放元素的高度
  const colsum = parseInt($('.waterfall.ct').outerWidth() / $item.outerWidth(true));
  // 重新分配大小
  const area = parseInt($('.waterfall.ct').outerWidth() / colsum);
  const marginL = parseInt($('.waterfall.ct').outerWidth() - ($item.outerWidth() * colsum));
  const m = parseInt(marginL / 12);

  console.log('area', area,m);
  // $item.each((index, element) => {
  //   $(element).css('width', area);
  // });
  console.log('colsum', colsum);
  for (let i = 0; i < colsum; i++) {
    arrimg[i] = 0;
  }
  $item.each(function () {
    // $item.css('width', area - 25);
    $item.css({ marginLeft: m, marginRight: m });
    const img = $(this).children().find('span');
    img.css({
      height: $(this).height(),
    });
    const min = Math.min.apply(null, arrimg);
    const minIndex = arrimg.indexOf(min);
    $(this).css({
      top: arrimg[minIndex] + $('.addNote').outerHeight(), // 这些要用在定位的元素上的。妈蛋，现在才想起来。
      // left: minIndex * $item.outerWidth(true),
      left: minIndex * area,
    });
    arrimg[minIndex] += $(this).outerHeight(true); // 给添加好的元素记录高度，为下次的比较而准备。
  });
}
window.waterFall = waterFall;

module.exports = waterFall;
