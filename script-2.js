document.addEventListener('DOMContentLoaded', function() {
	let users = []; //массив юзеров

    class User {
        constructor(name) {
            this.name = name;
            this.notes = [];
        }
    }
    
    //test users start
    let vasia = new User('vasia', 0);
	let petia = new User('petia', 1);
	users.push(vasia);
	users.push(petia);
	console.log(users);
	//test users end

    class Note {
        constructor(name, note) {
            this.name = name;
            this.note = note;
        }
    }

	class MenuMain {
		constructor(blockInsert, arrElem) {
            this.blockInsert = blockInsert;
            this.arrElem = arrElem;
            this.activeElement = null;
        };
        createMenu() {
        	let container = document.createElement('div');
            container.classList.add('menu-main');
            this.blockInsert.append(container);
            
            let formWrapper = document.createElement('div');
            formWrapper.classList.add('form');
            container.append(formWrapper);
            
            let input = document.createElement('input');
            input.classList.add('input', 'form-name');
            formWrapper.append(input);
        
            let buttonAdd = document.createElement('button');
            buttonAdd.classList.add('button', 'form-add');
            buttonAdd.innerHTML = 'add';
            formWrapper.append(buttonAdd);
            buttonAdd.addEventListener('click', () => {
                this.createElem(input.value, this.arrElem);
                input.value = '';
                this.show(this.arrElem, ul); //отображение созданого элемента
            });

            let ul = document.createElement('ul');
            ul.classList.add('content-list');
            container.append(ul);
            this.show(this.arrElem, ul);
        }
        //создание элемента
        createElem(name, arr) {
            arr.push(new User(name, arr.length));
        }
        show(arr, ul) {
            ul.innerHTML = '';
            arr.map((e, i) => {
                let li = document.createElement('li');
                li.classList.add('content-item');
                ul.append(li);

                let buttonShow = document.createElement('button');
                buttonShow.classList.add('content-item-name');
                buttonShow.innerHTML = e.name;
                li.append(buttonShow);
                li.addEventListener('click', (event) => {
                    this.activeElem(event.target, ul);
                    if (e === this.activeElement) buttonShow.classList.add('content-item-name-active');
                })
                if (e === this.activeElement) buttonShow.classList.add('content-item-name-active');

                let buttonDelete = document.createElement('button');
                buttonDelete.classList.add('delete');
                li.append(buttonDelete);
                buttonDelete.addEventListener('click', (event) => {
                    this.deleteElem(event);
                    this.show(arr, ul);
                    console.log(this.activeElement);
                })
                li.dataset.index = i;
            })
        }
        activeElem(event, ul) {
            if(!event) return;
            let index = event.parentNode.dataset.index;
            this.activeElement = this.arrElem[index];

            ul.childNodes.forEach(e => {
                e.firstChild.classList.remove('content-item-name-active');
                if(e.dataset.index === index) e.firstChild.classList.add('content-item-name-active');
            });
        }
        deleteElem(event) {
            event.stopPropagation();
            console.log(event.target.parentNode.dataset.index);
            this.arrElem.splice(event.target.parentNode.dataset.index, 1);
        }
	}

	let getBlockApp = document.querySelector('.app');
	
	let menuMain = new MenuMain(getBlockApp, users);
	menuMain.createMenu();
    //let menuNotes = new NotesMenu(getBlockApp, users.notes);
    //menuNotes.createMenu();
})