
let list = [];
let count = 1;

if (localStorage.getItem('listStorage') != undefined) {
    list = JSON.parse(localStorage.getItem('listStorage'));
    showItem();
}

function createItem() {
    const input = document.querySelector('#myInput').value;
    if (input === '') {
        alert('Введите текст')
    } else {
        let output = document.querySelector('ul');
        let item = document.createElement('li');
        item.classList.add('common');
        item.id = `item_${count}`;
        let editSpan = document.createElement('span');
        let delSpan = document.createElement('span');
        let txt = document.createTextNode(input);
        let editBtn = document.createTextNode('\u270e');
        let closeBtn = document.createTextNode('\u2716');
        item.appendChild(txt);
        editSpan.appendChild(editBtn);
        delSpan.appendChild(closeBtn);
        editSpan.classList.add('edit');
        delSpan.classList.add('close');
        item.appendChild(editSpan);
        item.appendChild(delSpan);
        output.appendChild(item);
        document.querySelector('#myInput').value = '';
        let temp = item.outerHTML;
        storObj(temp, input, item.id)
        count++;
    }
}

function storObj(elem, inp, idStr) {
    let itemList = {
        val: inp,
        checkList: false,
        show: elem,
        elemId: idStr
    };

    list.push(itemList);
    localStorage.setItem('listStorage', JSON.stringify(list));
}

function showItem() {
    list.forEach((item, index, array) => {
        let b = JSON.parse(localStorage.getItem('listStorage'));
        let c = b[index].show;
        let e = document.querySelector('ul');
        e.innerHTML += c;
        document.querySelector('.wrapper').appendChild(e);
    });
}

document.querySelector('.wrapper').addEventListener('click', function editItem(event) {
    if (event.target.tagName === 'LI') {

        let eventItem_1 = event.target.firstChild.textContent;
        list.forEach((item, index, arr) => {
            if (eventItem_1 === item.val && event.target.classList.contains('checked') && item.elemId === event.target.id) {
                event.target.classList.remove('checked');
                item.checkList = false;
                let str = item.show;
                let re = 'checked';
                let newStr = str.replace(re, 'common');
                item.show = newStr;
                localStorage.setItem('listStorage', JSON.stringify(arr))
            }
            else if (eventItem_1 === item.val && !event.target.classList.contains('checked') && item.elemId === event.target.id) {
                event.target.classList.add('checked');
                item.checkList = true;
                let str2 = item.show;
                let re2 = 'common';
                let newStr2 = str2.replace(re2, 'checked');
                item.show = newStr2;
                localStorage.setItem('listStorage', JSON.stringify(arr))
            }
        });


    }
    if (event.target.classList == 'close') {
        event.target.parentNode.remove();

        let eventItem_2 = event.target.parentNode.firstChild.textContent;
        list.forEach((item, index, arr) => {
            if (eventItem_2 === item.val) {
                arr.splice(index, 1)
                localStorage.setItem('listStorage', JSON.stringify(arr));
            }
        })
    }
    if (event.target.classList == 'edit') {
        let temp1 = event.target.parentNode.firstChild.textContent;
        let editInput = document.createElement('input');
        let yesSpan = document.createElement('span');
        editInput.setAttribute('type', 'text');
        editInput.setAttribute('autofocus', 'autofocus');
        editInput.classList.add('editInp');
        yesSpan.classList.add('yes');
        let yesBtn = document.createTextNode('\u2714');
        yesSpan.appendChild(yesBtn);
        event.target.parentNode.appendChild(editInput);
        event.target.parentNode.appendChild(yesSpan);
        let txt = event.target.parentNode.firstChild.textContent;
        editInput.value = txt;
        list.forEach((item, index, array) => {
            if (item.elemId === event.target.parentNode.id) {

                item.val = event.target.parentNode.firstChild.textContent;
                let str3 = item.show;
                let re3 = temp1;
                let newStr3 = str3.replace(re3, `${event.target.parentNode.firstChild.textContent}`);
                item.show = newStr3;
                localStorage.setItem('listStorage', JSON.stringify(array))
            }
        });
    }
    if (event.target.classList == 'yes') {
        let temp2 = event.target.parentNode.firstChild.textContent;
        event.target.parentNode.firstChild.textContent = event.target.parentNode.children[2].value;
        list.forEach((item, index, array) => {
            if (item.elemId === event.target.parentNode.id) {

                let str4 = item.show;
                let re4 = temp2;
                let newStr4 = str4.replace(re4, `${event.target.parentNode.firstChild.textContent}`)
                item.val = event.target.parentNode.firstChild.textContent;
                item.show = newStr4;
                localStorage.setItem('listStorage', JSON.stringify(array))
            }
        });
        event.target.previousElementSibling.remove();
        event.target.remove();
    }
});


