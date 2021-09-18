document.addEventListener('DOMContentLoaded', function() {
	let users = []; //массив юзеров

    class User {
        constructor(name, id) {
            this.name = name;
            this.id = id;
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
		constructor(blockInsert, users) {
            this.blockInsert = blockInsert;
            this.users = users;
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
                this.createUser(input.value, this.users);
                input.value = '';
                this.show(this.users, ul);
            });

            let ul = document.createElement('ul');
            ul.classList.add('content-list');
            container.append(ul);
            this.show(this.users, ul);

        }
        createUser(name, arr) {
            let id = null;
            if (!arr.length) id = 0;
            else id = arr[arr.length-1].id + 1;
            arr.push(new User(name, arr.length));
        }
        show(arr, ul) {
            ul.innerHTML = '';
            arr.map((e) => {
                let li = document.createElement('li');
                li.classList.add('content-item');
                ul.append(li);

                let buttonShow = document.createElement('button');
                buttonShow.classList.add('content-item-name');
                buttonShow.innerHTML = e.name;
                li.append(buttonShow);
                li.addEventListener('click', (event) => {
                    this.activeElem(event.target, ul);
                })

                let buttonDelete = document.createElement('button');
                buttonDelete.classList.add('delete');
                li.append(buttonDelete);

                li.dataset.index = e.id;
                //li.dataset.index = this.index;
                //return li;
            })
        }
        activeElem(event, ul) {
            let index = event.parentNode.dataset.index;
            this.activeElement = this.users[index];
            ul.childNodes.forEach(e => {
                e.firstChild.classList.remove('content-item-name-active');
            });
            event.classList.add('content-item-name-active');
            console.log(this.activeElement);
        }
	}
	let getBlockApp = document.querySelector('.app');
	
	let menuMain = new MenuMain(getBlockApp, users);
	menuMain.createMenu();
})