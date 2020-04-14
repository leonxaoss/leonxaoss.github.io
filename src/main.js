"use strict";
(function() {
    var arr = [window.Element, window.CharacterData, window.DocumentType];
    var args = [];

    arr.forEach(function (item) {
        if (item) {
            args.push(item.prototype);
        }
    });

    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('remove')) {
                return;
            }
            Object.defineProperty(item, 'remove', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                    this.parentNode.removeChild(this);
                }
            });
        });
    })(args);
})();

(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
    };
}(Element.prototype));

if(!String.prototype.includes){
    console.log(document.body.classList.add('i-explorer'));
}

if(!Array.prototype.forEach){
    Array.prototype.forEach = function (cb) {
        for(let i = 0; i < this.length; i++){
            cb(this[i], i, this);
        }
    }
}

if(!NodeList.prototype.forEach){
    NodeList.prototype.forEach = function (cb) {
        for(let i = 0; i < this.length; i++){
            cb(this[i], i, this);
        }
    }
}

if(!NodeList.prototype.reduce){
    NodeList.prototype.reduce = function (cb, init) {
        let result = init || 0;
        for(let i = 0; i < this.length; i++){
            result = cb(result, this[i], i);
        }
        return result;
    };
}

if(!HTMLCollection.prototype.forEach){
    HTMLCollection.prototype.forEach = function (cb) {
        for(let i = 0; i < this.length; i++){
            cb(this[i], i, this);
        }
    }
}

// const $sideBar = document.querySelector('.site_bar');
const $body = document.querySelector('body');

document.querySelector('.nav_open').addEventListener('click', function (e) {
    e.preventDefault();

    $body.classList.toggle('site_bar--open');
});


function tabs(btnsSelector, tabsSelector, btnActive, contentActive){

    const tabBtns = document.querySelectorAll(btnsSelector);
    const tabCont = document.querySelectorAll(tabsSelector);

    for (var i = 0; i < tabBtns.length; i++) {

        // console.log(tabBtns[i])

        tabBtns[i].addEventListener('click', function (e) {
            e.preventDefault();

            for (var i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove(btnActive)
            }
            this.classList.add(btnActive);
            var btnAtr = +this.dataset.tab;
            for(var j = 0; j < tabCont.length; j++){
                tabCont[j].classList.remove(contentActive);
                var contAtr = +tabCont[j].dataset.content;
                if(btnAtr === contAtr){
                    tabCont[j].classList.add(contentActive);
                }
            }
        })
    }

}

tabs('a[data-tab]', '.content', 'active', 'active');

document.querySelectorAll('.st_input').forEach(function (item) {
    item.addEventListener('blur', function () {
        if(this.value === ''){
            this.classList.remove('st_input--val')
        } else {
            this.classList.add('st_input--val')
        }
    });
});

$( ".sort" ).dropkick({
    mobile: true
});

// https://longbill.github.io/jquery-date-range-picker/

$('#two-inputs').dateRangePicker({
    separator : ' по ',
    format: 'DD.MM.YYYY',
    language: 'uk',
    startOfWeek: 'monday',
    getValue: function()
    {
        if ($('#date-range200').val() && $('#date-range201').val() )
            return $('#date-range200').val() + ' по ' + $('#date-range201').val();
        else
            return '';
    },
    setValue: function(s,s1,s2)
    {
        $('#date-range200').val(s1);
        $('#date-range201').val(s2);
    }
}
);


document.querySelectorAll('.base_label').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(item);
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand('copy');
            selection.removeAllRanges();

            const div = document.createElement('div');
            div.classList.add('copy_text');
            div.textContent = 'Текст скопійовано';
            document.body.appendChild(div);

            setTimeout(function () {
                div.remove();
            }, 1500)

        } catch(e) {
            const errorMsg = document.querySelector('.error-msg');
            console.log(errorMsg);
        }


    })
});


function tabs2(btnsSelector, tabsSelector, btnActive, contentActive){

    const tabBtns = document.querySelectorAll(btnsSelector);
    const tabCont = document.querySelectorAll(tabsSelector);

    for (var i = 0; i < tabBtns.length; i++) {

        // console.log(tabBtns[i])

        tabBtns[i].addEventListener('click', function (e) {
            e.preventDefault();

            for (var i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove(btnActive)
            }
            this.classList.add(btnActive);
            var btnAtr = +this.dataset.tab2;
            for(var j = 0; j < tabCont.length; j++){
                tabCont[j].classList.remove(contentActive);
                var contAtr = +tabCont[j].dataset.content;
                if(btnAtr === contAtr){
                    tabCont[j].classList.add(contentActive);
                }
            }
        })
    }

}

tabs2('.list_tab', '.series_box', 'active', 'active');

const $pop = document.querySelector('.pop_up');

$pop.addEventListener('click', function (event) {
    event.preventDefault();
    const target = event.target;

    if(target.closest('.close')){
        this.classList.remove('active');
    } else if(target.closest('.pop_box')){
        event.stopPropagation();
    } else {
        this.classList.remove('active');
    }
});

document.querySelectorAll('.base_episodes a').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        $pop.classList.add('active');
    })
});
