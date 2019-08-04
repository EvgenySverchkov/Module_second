export async function getCards(){
  const data = await fetch('http://localhost:3000/api/card');
	return data.json();
}
//////////////////////////////создание DOM элемента/////////////////////////////////////////////////
export function createCardElement(infoOfCard){
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
export async function addCard(event){
	if(event.target.className==='addButton'){//исключение всплытия
		let text = prompt("Eneter text for new card");
		if(text === null || text===''){
			return;
		}

  		let saveToStorage = createNewArrCardObj(text, event.target.closest('.columns').id);//объект нового элемента

  		let addNewCardObj = async ()=>{
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
  	else{
  		return;
  	}
 }
//////////////////////////////функция возврата массива с новым объектом элемента/////////////////////////////////////////////////
function createNewArrCardObj(text, columnId){
  	let objForStorage = {};//обьект для данных о элементе
    objForStorage.title = text;
   	objForStorage.columnId = +columnId;
   	return objForStorage;    
}
//////////////////////////////удаление карточки/////////////////////////////////////////////////
export async function removeCard(idCard){
	fetch(`http://localhost:3000/api/card/${idCard}`, {method:'delete'});
}

export function eventPressingEnterListener(event){
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
	await fetch(`http://localhost:3000/api/card/${cardId}`,{
		method:'PATCH',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(buff)
	});
}