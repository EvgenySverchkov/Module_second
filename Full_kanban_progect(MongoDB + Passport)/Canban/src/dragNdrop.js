var dragged;

export function dragStartListener(event){
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

export function dragOverListener(event){
	event.preventDefault();
};

export function dropListener(event){
	if(event.target.className === 'columns'){
		dragged.parentNode.removeChild(dragged);
		event.target.appendChild(dragged);
	}
	updateCardColumnId(dragged.id, event.target.id);
};

async function updateCardColumnId(cardId, idColumn){
	let buff = {columnId: idColumn};

	await fetch(`http://localhost:3000/api/card/${cardId}`,{
		method:'PATCH', 
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(buff)
	});
}