var selected = document.getElementsByClassName("ui-search-selected")[0];
var list = document.getElementsByClassName("ui-search-select-list")[0];
var oSpan = list.getElementsByTagName("span");
selected.onclick = function(eve)
{
	var oEvent = window.event || eve;
	list.style.display = "block";
	oEvent.cancelBubble=true;
}
document.onclick = function()
{
	list.style.display = "none";
}
for(var i=0;i<oSpan.length;i++)
{
	oSpan[i].onmouseover = function()
	{
		for(var j=0;j<oSpan.length;j++)
		{
			oSpan[j].style.backgroundColor = "white"
		}
		this.style.backgroundColor = "#ebeef5";
	}
	oSpan[i].onclick = function()
	{
		selected.innerHTML = this.innerHTML;
	}
}

//选项卡
var content = document.getElementById("content");
var caption = content.getElementsByClassName("caption")[0];
var oA = caption.getElementsByTagName("a");
var oWrap= content.getElementsByClassName("block-wrap");
var oItem = content.getElementsByClassName("block")[0];
var oBlock= content.getElementsByClassName("block")[0];
var oCaptionItem = oBlock.getElementsByClassName("block-caption-item");

for(var i=0;i<oA.length;i++)
{
	oA[i].index = i;
	oA[i].onclick = function()
	{
		//console.log(oWrap[this.index]);
		for(var j=0;j<oItem.children.length;j++)
		{
			oItem.children[j].style.display = "none";
			oA[j].className = "item";
		}
		oItem.children[this.index].style.display = "block";
		this.className = "item show";
	}
}
for(var i=0;i<oCaptionItem.length;i++)
{
	oCaptionItem[i].index = i;
	oCaptionItem[i].onclick = function()
	{
		for(var j=0;j<oWrap.length;j++)
		{
			oWrap[j].style.display = "none";
			oCaptionItem[j].className = "block-caption-item";
		}
		oWrap[this.index].style.display = "block";
		this.className = "block-caption-item show";
	}
}
//回到顶部
window.onscroll = function()
{
	var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
	var backTop = document.getElementsByClassName("ui-backtop")[0];
	if(scrolltop>window.innerHeight)
	{
		backTop.style.display = "block";
	}else
	{
		backTop.style.display = "none";
	}
}
//幻灯片
var oArrow = document.getElementsByClassName("ui-slider-arrow")[0];
var oArrow_a_left = oArrow.getElementsByClassName("left")[0];
var oArrow_a_right = oArrow.getElementsByClassName("right")[0];
var oSlider = document.getElementsByClassName("ui-slider-wrap")[0];
var oSlider_a = oSlider.getElementsByTagName("a");
var index = 0;

//获取进度点
var oProcess = document.getElementsByClassName('ui-slider-process')[0];
var oProcess_a = oProcess.getElementsByTagName('a');

//向右滚动
function move_right(){
	index = index+1;
	if(index>2)
	{
		index = 0;
		oSlider.style.left = '544px';
	}
	oSlider.style.left = parseInt(oSlider.style.left)-544+'px';
	//进度点实时更新
	for(var i=0;i<oProcess_a.length;i++){
		oProcess_a[i].className = 'item';
	}
	oProcess_a[index].className = 'item item-focus';
}

//向左滚动
function move_left(){
	index = index-1;
	if(index<0)
	{
		index = 2;
		oSlider.style.left = '0px';
	}
	oSlider.style.left =0-544*index+'px';
	//进度点实时更新
	for(var i=0;i<oProcess_a.length;i++){
		oProcess_a[i].className = 'item';
	}
	oProcess_a[index].className = 'item item-focus';
}

oArrow_a_right.onclick = function()
{
	move_right();
}
oArrow_a_left.onclick = function()
{
	move_left();
}

//定时器，2s自动滚动
var time = setInterval(function(){
	move_right();
},2000)

//点击进度点可跳转到当前幻灯片
for(var i=0;i<oProcess_a.length;i++){
	oProcess_a[i].index = i;
	oProcess_a[i].onclick = function(){
		//将全局的index变量标记为当前处于几个幻灯片
		index = this.index;
		oSlider.style.left = (-544*this.index) + 'px';
		for(var j=0;j<oProcess_a.length;j++){
			oProcess_a[j].className = 'item';
		}
		this.className = 'item item-focus';
		
	}
}

var oUiSlider= document.getElementsByClassName('ui-slider')[0];
//鼠标移入取消定时器
oUiSlider.onmouseover = function(){
	clearInterval(time);
}
//鼠标移出再次开启定时器
oUiSlider.onmouseout = function(){
	time = setInterval(function(){
		move_right();
		},2000);
}