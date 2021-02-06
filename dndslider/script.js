console.log('start');
const thumb = slider.querySelector('.thumb');
console.log('thumb', thumb);

thumb.onmousedown = function(event) {
	// предотвратить запуск выделения (действие браузера)
	event.preventDefault();
	// shiftY здесь не нужен, слайдер двигается только по горизонтали
	// event.clientX - это область окна браузера
	// getBoundingClientRect возвращает размер элемента и его позицию относительно viewport
	let shiftX = event.clientX - thumb.getBoundingClientRect().left;

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);

	// console.log('slider.getBoundingClientRect()', slider.getBoundingClientRect());

	function onMouseMove(event){
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

		console.log('shiftX', event.clientX);

        // курсор вышел из слайдера => оставить бегунок в его границах.
        if (newLeft < 0) {
          newLeft = 0;
        }

        let rightEdge = slider.offsetWidth - thumb.offsetWidth;
		
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        thumb.style.left = newLeft + 'px';
	}

	function onMouseUp(){
		document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
	}
}

thumb.ondragstart = function() {
	return false;
};