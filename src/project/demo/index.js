import './style/index.less';
import './index.html';
import $ from 'zepto';
import demo from './demo';
import list from './list.html';

$('.list').html(list);
$('.img').attr('src', require('./img/activity-bg.png'));
$('.img').attr('width', '100px');
console.log(123);
