console.log('start', ball);

// Перетаскиваемый элемент (draggable)
// ***********************************
// Цели переноса (droppable)

// потенциальная цель переноса, над которой мы пролетаем прямо сейчас
let currentDroppable = null;

ball.onmousedown = function(event) { // (1) отследить нажатие
	// Получаем координаты мыши на мяче в момент нажатяи
	let shiftX = event.clientX - ball.getBoundingClientRect().left;
	let shiftY = event.clientY - ball.getBoundingClientRect().top;

	// (2) подготовить к перемещению:
	// разместить поверх остального содержимого и в абсолютных координатах
	ball.style.position = 'absolute';
	ball.style.zIndex = 1000;
	ball.style.outline = '1px solid red';

	// Отменить конфликты с маусовер
	ball.ondragstart = function() {
		return false;
	};

	function enterDroppable(elem) {
		elem.style.background = 'pink';
	}

	function leaveDroppable(elem) {
		elem.style.background = '';
	}

	// переместим в body, чтобы мяч был точно не внутри position:relative
	document.body.append(ball);
	// и установим абсолютно спозиционированный мяч под курсор
  
	moveAt(event.pageX, event.pageY);
  
	// передвинуть мяч под координаты курсора
	// и сдвинуть на половину ширины/высоты для центрирования
	function moveAt(pageX, pageY) {
	  ball.style.left = pageX - shiftX + 'px';
	  ball.style.top = pageY - shiftY + 'px';
	}
	

	function onMouseMove(event) {
	    moveAt(event.pageX, event.pageY);

		// Вызов document.elementFromPoint(x, y) 
		// возвращает самый глубоко вложенный элемент в окне, находящийся по координатам (x, y)
		ball.hidden = true;
		let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
		ball.hidden = false;
		// console.log('elemBelow', elemBelow)

		// событие mousemove может произойти и когда указатель за пределами окна
		// (мяч перетащили за пределы экрана)

		// если clientX/clientY за пределами окна, elementFromPoint вернёт null
		if (!elemBelow) return;

		// потенциальные цели переноса помечены классом droppable (может быть и другая логика)
		let droppableBelow = elemBelow.closest('.droppable');

		if (currentDroppable != droppableBelow) {
			// мы либо залетаем на цель, либо улетаем из неё
			// внимание: оба значения могут быть null
			// currentDroppable=null,
			// если мы были не над droppable до этого события (например, над пустым пространством)
			// droppableBelow=null,
			// если мы не над droppable именно сейчас, во время этого события

			// console.log('currentDroppable', currentDroppable)

			if (currentDroppable) {
				// логика обработки процесса "вылета" из droppable (удаляем подсветку)
				leaveDroppable(currentDroppable);
			}

			currentDroppable = droppableBelow;

			if (currentDroppable) {
				// логика обработки процесса, когда мы "влетаем" в элемент droppable
				enterDroppable(currentDroppable);
			}
  		}
	}
  
	// (3) перемещать по экрану
	document.addEventListener('mousemove', onMouseMove);
  
	// (4) положить мяч, удалить более ненужные обработчики событий
	ball.onmouseup = function() {
	  document.removeEventListener('mousemove', onMouseMove);
	  ball.onmouseup = null;
	};
  
  };