const nameInput = document.querySelector('#name-input');
const numInput = document.querySelector('#number-input');
const ul = document.querySelector('ul');
const addBtn = document.querySelector('.add-btn');
const form = document.querySelector('#form');
const totalCountSpan = document.querySelector('.total-count');

//Regex validation
const NUMBER_REGEX = /^[0-9]{6,16}$/;
const LETTERS_REGEX = /^[a-zA-Z ]{1,50}$/;

//Validations
let numberValidation = false;
let letterValidation = false;


const validation = (input, regexValidation) => {
    addBtn.disabled = numberValidation && letterValidation ? false : true;

    if (input.value === '') {
        input.classList.remove('outline-red-700', 'outline-2');
        input.classList.remove('outline-green-700', 'outline-2'); 
        input.classList.add('focus:outline-violet-700');
    } else if (regexValidation) {
        input.classList.remove('focus:outline-violet-700', 'outline-red-700');
        input.classList.add('outline-green-700', 'outline-2');  
    } else if (!regexValidation){ 
        input.classList.remove('focus:outline-violet-700', 'outline-green-700');
        input.classList.remove('outline-green-700', 'outline-2'); 
        input.classList.add('outline-red-700', 'outline-2'); 
    } 
};

//Events
nameInput.addEventListener('input', e => {
    letterValidation = LETTERS_REGEX.test(e.target.value);
    validation(nameInput, letterValidation);
});

numInput.addEventListener('input', e => {
    numberValidation = NUMBER_REGEX.test(e.target.value);
    validation(numInput, numberValidation);
});




form.addEventListener('submit', async e => {
	e.preventDefault();

	// Create list item
    const { data } = await axios.post('/api/contacts', { name: nameInput.value, number: numInput.value });
	// console.log(data);

	const newContact = document.createElement('li');
	newContact.id = data.id;
	newContact.classList.add('flex', 'flex-row', 'bg-lime-100', 'rounded-lg', 'gap-4', 'p-4');
	newContact.innerHTML = `
           
            <p class="text-zinc-900 flex justify-start items-center">${data.name}</p>
            <p class="text-zinc-900 flex justify-start items-center">${data.number}</p>

            <button class="del-btn m-2 p-2 flex justify-enditems-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>

            <button class="edit-btn m-2 p-2 flex justify-end items-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>                          
            </button>
	`;

	// Append newContact to ul
	ul.append(newContact);

	// Empty input
	nameInput.value = '';
	numInput.value = '';

    // Contador de contactos
	contactsCount();

	//disable addbtn
	addBtn.disabled = true;
});




ul.addEventListener('click', async e => {

	// Select delete-icon

		try {

			if (e.target.closest('.del-btn')) {
				const li = e.target.closest('.del-btn').parentElement;
				await axios.delete(`/api/contacts/${li.id}`);
				li.remove();
				contactsCount();
			}
			
		} catch (error) {
			console.log(error);
		}

	// Select edit-icon

		try {

			if (e.target.closest('.edit-btn')) {
				const name = e.target.closest('.edit-btn').parentElement.children[0].textContent;
				const number = e.target.closest('.edit-btn').parentElement.children[1].textContent;
				const editInput = e.target.closest('.edit-btn').parentElement;
				editInput.classList.add('flex', 'flex-row', 'bg-lime-100', 'rounded-lg', 'gap-4', 'p-4');
				editInput.innerHTML = `
						<input 
						type="text"
						id="name-input" 
						name="name-input" 
						autocomplete="off"
						class="rounded-lg p-2 bg-white focus:outline-violet-700"
						placeholder="${name}"
						>

						<input 
						type="text"
						id="name-input" 
						name="number-input" 
						autocomplete="off"
						class="rounded-lg p-2 bg-white focus:outline-violet-700"
						placeholder="${number}"
						>


						<button class="cancel-btn m-2 p-2 flex justify-enditems-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
							</svg>
							
						</button>

						<button class="save-btn m-2 p-2 flex justify-end items-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
							</svg>
													
						</button>
				`}

				// const nameInputEdit = e.target.closest('.edit-btn').parentElement.children[0];
				// const numberInputEdit = e.target.closest('.edit-btn').parentElement.children[1];
				// const cancelBtn = e.target.closest('.edit-btn').parentElement.children[2];
				// const saveBtn = e.target.closest('.edit-btn').parentElement.children[3];
				// const validation = (input, regexValidation) => {
				// 	saveBtn.disabled = numberValidation && letterValidation ? false : true;
				
				// 	if (nameInputEdit.value === '' || numberInputEdit.value === '') {
				// 		nameInputEdit.classList.remove('outline-red-700', 'outline-2');
				// 		nameInputEdit.classList.remove('outline-green-700', 'outline-2'); 
				// 		nameInputEdit.classList.add('focus:outline-violet-700');

				// 		numberInputEdit.classList.remove('outline-red-700', 'outline-2');
				// 		numberInputEdit.classList.remove('outline-green-700', 'outline-2'); 
				// 		numberInputEdit.classList.add('focus:outline-violet-700');
				// 	} else if (regexValidation) {
				// 		nameInputEdit.classList.remove('focus:outline-violet-700', 'outline-red-700');
				// 		nameInputEdit.classList.add('outline-green-700', 'outline-2'); 
						
						
				// 		numberInputEdit.classList.remove('focus:outline-violet-700', 'outline-red-700');
				// 		numberInputEdit.classList.add('outline-green-700', 'outline-2'); 
				// 	} else if (!regexValidation){ 
				// 		nameInputEdit.classList.remove('focus:outline-violet-700', 'outline-green-700');
				// 		nameInputEdit.classList.remove('outline-green-700', 'outline-2'); 
				// 		nameInputEdit.classList.add('outline-red-700', 'outline-2'); 

				// 		numberInputEdit.classList.remove('focus:outline-violet-700', 'outline-green-700');
				// 		numberInputEdit.classList.remove('outline-green-700', 'outline-2'); 
				// 		numberInputEdit.classList.add('outline-red-700', 'outline-2'); 
				// 	} 
				// };
				
				// //Events
				// nameInputEdit.addEventListener('input', e => {
				// 	letterValidation = LETTERS_REGEX.test(e.target.value);
				// 	validation(nameInputEdit, letterValidation);
				// });
				
				// numberInputEdit.addEventListener('input', e => {
				// 	numberValidation = NUMBER_REGEX.test(e.target.value);
				// 	validation(numberInputEdit, numberValidation);
				// });
				
				


				// const li = e.target.closest('.edit-btn').parentElement;
				// await axios.delete(`/api/contacts/${li.id}`);
				// // e.target.closest('.delete-icon').parentElement.parentElement.remove();
				// li.remove();
				// contactsCount();
			
		} catch (error) {
			console.log(error);
		}



	// Select cancel-icon

		try {
			
			if (e.target.closest('.cancel-btn')) {
			
				const name = e.target.closest('.cancel-btn').parentElement.children[0].placeholder;
				const number = e.target.closest('.cancel-btn').parentElement.children[1].placeholder;
				const editInput = e.target.closest('.cancel-btn').parentElement;
				editInput.classList.add('flex', 'flex-row', 'bg-lime-100', 'rounded-lg', 'gap-4', 'p-4');
				editInput.innerHTML = `
					
						<p class="text-zinc-900 flex justify-start items-center">${name}</p>
						<p class="text-zinc-900 flex justify-start items-center">${number}</p>
			
						<button class="del-btn m-2 p-2 flex justify-enditems-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
						</button>
			
						<button class="edit-btn m-2 p-2 flex justify-end items-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
						</svg>                          
						</button>
						`
				}
		
			} catch (error) {
				console.log('Error 1');
				console.log(error);
			}
		
	// Select save-btn
		try {

			if (e.target.closest('.save-btn')) {
				const editInput = e.target.closest('.save-btn').parentElement;
				const name = e.target.closest('.save-btn').parentElement.children[0].value;
				const number = e.target.closest('.save-btn').parentElement.children[1].value;
				editInput.classList.add('flex', 'flex-row', 'bg-lime-100', 'rounded-lg', 'gap-4', 'p-4');

				if (e.target.closest('.save-btn').parentElement.children[0].value === '' && e.target.closest('.save-btn').parentElement.children[1].value === '') {
				
					editInput.innerHTML = `
				
					<p  id="name-edit" class="text-zinc-900 flex justify-start items-center">${e.target.closest('.save-btn').parentElement.children[0].placeholder}</p>
					<p  id="number-edit"  class="text-zinc-900 flex justify-start items-center">${e.target.closest('.save-btn').parentElement.children[1].placeholder}</p>
		
					<button class="del-btn m-2 p-2 flex justify-enditems-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
					</button>
		
					<button class="edit-btn m-2 p-2 flex justify-end items-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
					</svg>                          
					</button>
			
				`
				const nameEdit = document.querySelector('#name-edit');
				const numberEdit = document.querySelector('#number-edit');
				console.log('amen 1');
				await axios.patch(`/api/contacts/${editInput.id}`, { name: nameEdit.textContent, number: numberEdit.textContent });
				console.log('amen 1.1');
					
				} else if (e.target.closest('.save-btn').parentElement.children[0].value === '') {

					editInput.innerHTML = `
				
					<p id="name-edit" class="text-zinc-900 flex justify-start items-center">${e.target.closest('.save-btn').parentElement.children[0].placeholder}</p>
					<p id="number-edit" class="text-zinc-900 flex justify-start items-center">${number}</p>
		
					<button class="del-btn m-2 p-2 flex justify-enditems-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
					</button>
		
					<button class="edit-btn m-2 p-2 flex justify-end items-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
					</svg>                          
					</button>
			
				`
				const nameEdit = document.querySelector('#name-edit');
				const numberEdit = document.querySelector('#number-edit');
				console.log('amen 2');
				await axios.patch(`/api/contacts/${editInput.id}`, { name: nameEdit.textContent, number: numberEdit.textContent });
				console.log('amen 2.1');
					
				} else if (e.target.closest('.save-btn').parentElement.children[1].value === '') {

					editInput.innerHTML = `
				
					<p id="name-edit" class="text-zinc-900 flex justify-start items-center">${name}</p>
					<p id="number-edit" class="text-zinc-900 flex justify-start items-center">${e.target.closest('.save-btn').parentElement.children[1].placeholder}</p>
		
					<button class="del-btn m-2 p-2 flex justify-enditems-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
					</button>
		
					<button class="edit-btn m-2 p-2 flex justify-end items-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
					</svg>                          
					</button>
			
				`
				const nameEdit = document.querySelector('#name-edit');
				const numberEdit = document.querySelector('#number-edit');
				console.log('amen 3');
				await axios.patch(`/api/contacts/${editInput.id}`, { name: nameEdit.textContent, number: numberEdit.textContent });
				console.log('amen 3.1');
					
				}else {

					editInput.innerHTML = `
				
					<p id="name-edit" class="text-zinc-900 flex justify-start items-center">${name}</p>
					<p id="number-edit" class="text-zinc-900 flex justify-start items-center">${number}</p>
		
					<button class="del-btn m-2 p-2 flex justify-enditems-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
					</button>
		
					<button class="edit-btn m-2 p-2 flex justify-end items-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
					</svg>                          
					</button>
			
				`
				const nameEdit = document.querySelector('#name-edit');
				const numberEdit = document.querySelector('#number-edit');
				// console.log(nameEdit);
				// console.log(numberEdit);
				// console.log(nameEdit.textContent);
				// console.log(numberEdit.textContent);
				console.log('amen 4');
				await axios.patch(`/api/contacts/${editInput.id}`, { name: nameEdit.textContent, number: numberEdit.textContent });
				console.log('amen 4.1');
				};


			}


		} catch (error) {
			console.log('error 2');
			console.log(error);
		}



		const { data } = await axios.get('/api/contacts', {
			withCredentials: true,
		});

		console.log(data);

});





//Cuenta total de contactos
const totalCount = () => {
	const howMany = document.querySelector('ul').children.length; 
	totalCountSpan.innerHTML = howMany;
};

const contactsCount = () => {
	totalCount();
};





//Contactos Guardados  (para que salgan mis contactos ya guardados al volver a iniciar sesion)
(async() => {
	try {
		const { data } = await axios.get('/api/contacts', {
			withCredentials: true,
		});
        
        console.log(data);
	
	data.forEach(contact => {
        const newContact = document.createElement('li');
        newContact.id = contact.id;
        newContact.classList.add('flex', 'flex-row', 'bg-lime-100', 'rounded-lg', 'gap-4', 'p-4');
        newContact.innerHTML = `
               
                <p class="text-zinc-900 flex justify-start items-center">${contact.name} </p>
                <p class="text-zinc-900 flex justify-start items-center"> ${contact.number}</p>
    
                <button class="del-btn m-2 p-2 flex justify-enditems-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
    
                <button class="edit-btn m-2 p-2 flex justify-end items-center bg-lime-300 rounded-full cursor-pointer scale-100 hover:scale-110 transition duration-300 easy-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>                          
                </button>
    
        `;
    
		ul.append(newContact);
		
	});

	contactsCount();

	} catch (error) {

		//AQUI HAY UN ERROR, CUANDO REINICIO LA PAG SE ME CAE EL TERMINAL, ENTONCES TENGO QUE REINICIAR LA TERMINAR Y LA PAG PARA QUE ME DIRIGA AL LOGIN
	    window.location.pathname = '/login';
	}

})();


