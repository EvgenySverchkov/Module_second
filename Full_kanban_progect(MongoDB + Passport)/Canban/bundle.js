/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: outputElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outputElements", function() { return outputElements; });
/* harmony import */ var _columns_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columns.js */ "./src/columns.js");
/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards.js */ "./src/cards.js");
/* harmony import */ var _dragNdrop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragNdrop.js */ "./src/dragNdrop.js");




async function outputElements(){
	let objColumn = await Object(_columns_js__WEBPACK_IMPORTED_MODULE_0__["getColumns"])();
	let objCard = await Object(_cards_js__WEBPACK_IMPORTED_MODULE_1__["getCards"])();
	//let objColumn = getColumns();//объекты из хранилища 
	//let objCard = getCards();
	let parentElement = document.querySelector('.board');//главный (родитель) элемент доски
	let fragment = document.createDocumentFragment();//содаем фрагмент

	for(let i =0; i<objColumn.length; i++)//блок добавления елементов из сервера
	{

		let colum = Object(_columns_js__WEBPACK_IMPORTED_MODULE_0__["createColumn"])(objColumn[i]);

		if(objCard)//если карточек нет, ничего не делать
		{
			for(let j =0; j<objCard.length; j++)
			{

				if(+colum.id === objCard[j].columnId){
					let card = Object(_cards_js__WEBPACK_IMPORTED_MODULE_1__["createCardElement"])(objCard[j]);

					colum.appendChild(card);
				}
			}
		}
		fragment.appendChild(colum);
	}
	parentElement.appendChild(fragment);//добавление в родительский элемент

	let mainTableElement = document.querySelector('.board');

  	mainTableElement.addEventListener('click', _cards_js__WEBPACK_IMPORTED_MODULE_1__["addCard"]);
  	mainTableElement.addEventListener('click', async event=>{
  		 if(event.target.parentNode.id == event.target.getAttribute("data-card-id"))//проверка для исключения всплытия
    	{
  			const cardId = event.target.getAttribute("data-card-id");
  			Object(_cards_js__WEBPACK_IMPORTED_MODULE_1__["removeCard"])(cardId);
  			event.target.closest(".card").remove();//удаление из доски
  		}
  	});
  	mainTableElement.addEventListener('keypress', _cards_js__WEBPACK_IMPORTED_MODULE_1__["eventPressingEnterListener"]);
  	mainTableElement.addEventListener('focusout', _cards_js__WEBPACK_IMPORTED_MODULE_1__["eventPressingEnterListener"]);

  	document.addEventListener("dragstart", _dragNdrop_js__WEBPACK_IMPORTED_MODULE_2__["dragStartListener"]);
  	document.addEventListener("dragover", _dragNdrop_js__WEBPACK_IMPORTED_MODULE_2__["dragOverListener"]);
  	document.addEventListener("drop", _dragNdrop_js__WEBPACK_IMPORTED_MODULE_2__["dropListener"]);
}


/***/ }),

/***/ "./src/cards.js":
/*!**********************!*\
  !*** ./src/cards.js ***!
  \**********************/
/*! exports provided: getCards, createCardElement, addCard, removeCard, eventPressingEnterListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCards", function() { return getCards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCardElement", function() { return createCardElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCard", function() { return addCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCard", function() { return removeCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventPressingEnterListener", function() { return eventPressingEnterListener; });
async function getCards(){
  const data = await fetch('http://localhost:3000/api/card');
	return data.json();
}
//////////////////////////////создание DOM элемента/////////////////////////////////////////////////
function createCardElement(infoOfCard){

	let newCard = document.createElement('div');//создаем элемент карточки
	newCard.id = infoOfCard.id;//добавляем id карточки

	newCard.className = 'card';//добаляем класс (для css) карточки

	let contentNode = document.createElement('p');
	contentNode.className = 'card-content';
	contentNode.contentEditable = 'true';
	contentNode.textContent = infoOfCard.title;
	contentNode.setAttribute("draggable", false);

	let removeButton = document.createElement('button');//кнопка удаления карточки
	removeButton.className = 'removeButton';
  
	newCard.setAttribute("data-column", infoOfCard.columnId);//добавляем атрибут для поиска соотвецтвующей коллонки
	removeButton.setAttribute("data-card-id", infoOfCard.id);//атрибут для обнаружения в какой карточке находится кнопка
	newCard.setAttribute("draggable", true);

	newCard.appendChild(removeButton);
	newCard.appendChild(contentNode);

	return newCard;
}
//////////////////////////////Обработчик добавления карточки по нажатию на кнопку, в колонку/////////////////////////////////////////////////
async function addCard(event){
	if(event.target.className==='addButton'){//исключение всплытия
  		let text = prompt("Eneter text for new card");
  		if(text === null || text===''){
  			return;
  		}

  		
  		let saveToStorage = createNewArrCardObj(text, event.target.closest('.columns').id);//объект нового элемента

  		let addNewCardObj = async()=> {
        let response = await fetch('http://localhost:3000/api/card', 
  			{
  				method:'post',
  				headers: { 'Content-Type': 'application/json' },
  				body: JSON.stringify(saveToStorage)
  			});
        return response.json();
    }

      let newElem = createCardElement(await addNewCardObj());//создаем новый элемент DOM по новому объекту
      event.target.parentNode.appendChild(newElem);//добавляем элемент DOM в колонку
    }
    else
    	return;
}
//////////////////////////////функция возврата массива с новым объектом элемента/////////////////////////////////////////////////
function createNewArrCardObj(text, columnId){
  	let objForStorage = {};//обьект для данных о элементе
    objForStorage.title = text;
   	objForStorage.columnId = +columnId;
   	return objForStorage;    
}
//////////////////////////////удаление карточки/////////////////////////////////////////////////
async function removeCard(idCard){
      fetch(`http://localhost:3000/api/card/${idCard}`, {method:'delete'});
}

function eventPressingEnterListener(event){
	if(event.target.className == 'card-content'){
		let idCard = +event.target.closest(".card").id;
		let text = event.target.textContent;
		if(event.keyCode === 13 || event.type === 'focusout'){
			event.preventDefault();
			updateCard(idCard, text);
		}
	}
}


async function updateCard(cardId, text){
	let buff = {title: text};

	await fetch(`http://localhost:3000/api/card/${cardId}`, {
		method:'PATCH', 
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(buff)
	});
}

/***/ }),

/***/ "./src/columns.js":
/*!************************!*\
  !*** ./src/columns.js ***!
  \************************/
/*! exports provided: getColumns, createColumn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getColumns", function() { return getColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createColumn", function() { return createColumn; });
function getColumns(){
	const url = 'http://localhost:3000/api/column';
	return fetch(url).then(data=>data.json());
}

function createColumn(InfoOfColumn){
	let newCol = document.createElement('div');//создаем елемнт колонки
	newCol.className = 'columns';//добавляем имя класса (для css)
	newCol.id = InfoOfColumn.id;//добаляем id (для добавления соотвецвующих карточек)

	let headline = document.createElement('p');//создаем елемент в котором будет заголовок
	headline.className = 'headline';
	headline.textContent = InfoOfColumn.title;//добавляем текст в узел заголовка
		
	let buttonAdd = document.createElement('button');//кнопка для добавление карточек
	buttonAdd.className = 'addButton';
	buttonAdd.textContent = 'Add';

	newCol.appendChild(headline);//добавляем в каждую колонку заголовок
	newCol.appendChild(buttonAdd);//добавляем кнопку добавления карточек

	return newCol;//вернули массив с созданными колонками
}

/***/ }),

/***/ "./src/dragNdrop.js":
/*!**************************!*\
  !*** ./src/dragNdrop.js ***!
  \**************************/
/*! exports provided: dragStartListener, dragOverListener, dropListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragStartListener", function() { return dragStartListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragOverListener", function() { return dragOverListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dropListener", function() { return dropListener; });
var dragged;

function dragStartListener(event){
	if(event.target.className === 'card-content'){
		dragged = event.target.closest(".card");
	}
	else if(event.target.parentNode.className === 'card-content'){
		dragged = event.target.parentNode.closest(".card");
	}
	else{
		dragged = event.target;
	}
};

 function dragOverListener(event){
	event.preventDefault();
};

function dropListener(event){
	if(event.target.className === 'columns'){
		dragged.parentNode.removeChild(dragged);
		event.target.appendChild(dragged);
	}
	updateCardColumnId(dragged.id, event.target.id);
};

async function updateCardColumnId(cardId, idColumn){
	let buff = {columnId: idColumn};

	await fetch(`http://localhost:3000/api/card/${cardId}`, {
		method:'PATCH', 
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(buff)
	});
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.js */ "./src/board.js");


Object(_board_js__WEBPACK_IMPORTED_MODULE_0__["outputElements"])();

/***/ })

/******/ });