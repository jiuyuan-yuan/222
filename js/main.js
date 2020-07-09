

/* 思路 一共五张图 
   复制：第一张、最后一张
   f,1,2,3,4,5,l
	5 -> l hide l -> 1 
*/

let $slides =  $('.wrapper >.slides')
let $images = $slides.children('img')

autoCreateButtons()   //创建按钮
let $buttons =  $('.wrapper > .buttons > button')
let current = 0;      //当前图片

makeFakePicture()
bindEvents()

//自动轮播
 var timerId = setInterval(()=>{
 	goToPicture(current+1)
 },2000)

//进出切换
$('.wrapper').eq(0).on('mouseover',()=>{
	clearInterval(timerId)
})
$('.wrapper').eq(0).on('mouseleave',()=>{
	timerId = setInterval(()=>{
 	goToPicture(current+1)
 },2000)
})

//切屏暂停计时器
document.addEventListener("visibilitychange", function(){
    document.hidden ? clearInterval(timerId) : timerId = setInterval(()=>{goToPicture(current+1)},2000);
})

	function makeFakePicture(){
		$slides.prepend($images.last().clone(true))
		$slides.append($images.first().clone(true))
	}
	/******跳转到指定图片********/
	function goToPicture(index){ //需要跳转的图片
	 	if(index > $images.length - 1){
				index = 0
			}else if(index <  0){
	 		index = $images.length -1
	 	}
			if(current === $images.length - 1&& index === 0){
				$slides.css({
		 		transform:`translate(${($images.length + 1)*-190}px)`
		 	}).one('transitionend',()=>{
		 		$slides.hide().offset()   //offset()使hide()生效
		 		$slides.css({transform:`translate(${1*-190}px)`})
		 		.show()
		 	})
			}
			else if(current === 0&& index ===$images.length - 1){
				$slides.css({
		 		transform:`translate(${0}px)`
		 	}).one('transitionend',()=>{
		 		$slides.hide().offset()
		 		$slides.css({transform:`translate(${$images.length*-190}px)`})
		 		.show()
		 	})
			}
			else{
				$slides.css({
		 		transform:`translate(${(index + 1)*-190}px)`
		 	})
			}
			current = index
	}

	/*****绑定事件****/
	function bindEvents(){
		$('.wrapper > .buttons').on('click','button',(e)=>{
			let $button = $(e.currentTarget)
			let index = $button.index()
			goToPicture(index)
		})
		$('#nextAndpre > .pre').on('click',()=>{ //index 0,1,2,3,4
			goToPicture(current-1)
		})
		$('#nextAndpre > .next').on('click',()=>{
			goToPicture(current+1)	
		})
	}
	/****根据图片创建按钮****/
	function autoCreateButtons(){
		for(let i = 0;i < $images.length;i++){
			let bt = $('<button>')
				bt.html(i + 1)
			$('.wrapper > .buttons').append(bt)
		}
	}