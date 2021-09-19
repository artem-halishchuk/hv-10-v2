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
	//test users end

    class Note {
        constructor(name, note) {
            this.name = name;
            this.note = note;
        }
    }
    let note = new Note('note-1', 'text note-1');
    let note2 = new Note('note-2', 'text note-2');
    vasia.notes.push(note);
    petia.notes.push(note2);

	class MenuMain {
		constructor(blockInsert, arrElem, removeBlock) {
            this.blockInsert = blockInsert;
            this.arrElem = arrElem;
            this.activeElement = null;
            this.ul = null;
            this.removeBlock = removeBlock;
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
                this.name = input.value;
                this.createElem();
                input.value = '';
                this.show(this.arrElem); //отображение созданого элемента
            });

            this.ul = document.createElement('ul');
            this.ul.classList.add('content-list');
            container.append(this.ul);
            this.show();
        }
        //создание элемента
        createElem() {
            this.arrElem.push(new User(this.name, this.arrElem.length));
        }
        show() {
            this.ul.innerHTML = '';
            if (!this.arrElem) return;
            this.arrElem.map((e, i) => {
                let li = document.createElement('li');
                li.classList.add('content-item');
                this.ul.append(li);

                let buttonShow = document.createElement('button');
                buttonShow.classList.add('content-item-name');
                buttonShow.innerHTML = e.name;
                li.append(buttonShow);
                li.addEventListener('click', (event) => {
                    this.activeElem(event.target, this.ul);
                    if (e === this.activeElement) buttonShow.classList.add('content-item-name-active');
                    //this.display();
                })
                if (e === this.activeElement) buttonShow.classList.add('content-item-name-active');

                let buttonDelete = document.createElement('button');
                buttonDelete.classList.add('delete');
                li.append(buttonDelete);
                buttonDelete.addEventListener('click', (event) => {
                    this.deleteElem(event);
                    this.show(this.arrElem);
                    //console.log(this.activeElement.notes);
                    console.log(this.activeElement);
                    this.display();
                })
                li.dataset.index = i;
            })
        }
        activeElem(event) {
            if(!event) return;
            let index = event.parentNode.dataset.index;
            this.activeElement = this.arrElem[index];

            this.ul.childNodes.forEach(e => {
                e.firstChild.classList.remove('content-item-name-active');
                if(e.dataset.index === index) e.firstChild.classList.add('content-item-name-active');
            });
            this.display();
        }
        deleteElem(event) {
            event.stopPropagation();
            let index = event.target.parentNode.dataset.index;
            if (this.arrElem[index] === this.activeElement) this.activeElement = null;
            this.arrElem.splice(event.target.parentNode.dataset.index, 1);
        }

        display() {
            if ((!this.activeElement) && document.querySelector(this.removeBlock)) {
                document.querySelector('.menu-notes').remove();
            }
            let menuNotes;
            if (this.activeElement) {
                if (document.querySelector(this.removeBlock)) {
                    document.querySelector(this.removeBlock).remove();
                }
                menuNotes = new MenuNotes(getBlockApp, this.activeElement.notes);
                menuNotes.createMenu();
            }

        }
	}



	let getBlockApp = document.querySelector('.app');
	
	let menuMain = new MenuMain(getBlockApp, users, '.menu-notes');
	menuMain.createMenu();



    class MenuNotes extends MenuMain {
        constructor(blockInsert, arrElem) {
            super(blockInsert, arrElem);
        }
        createMenu() {
            let container = document.createElement('div');
            container.classList.add('menu-notes');
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
                this.name = input.value;
                this.createElem();
                input.value = '';
                this.show(this.arrElem); //отображение созданого элемента
            });

            this.ul = document.createElement('ul');
            this.ul.classList.add('content-list');
            container.append(this.ul);
            this.show();
        }
        createElem() {
            this.arrElem.push(new Note(this.name));
        }
        display() {
            if (this.blockInsert.childNodes[2]) this.blockInsert.childNodes[2].remove();
        }
    }





})