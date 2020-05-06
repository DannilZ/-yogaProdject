window.addEventListener("DOMContentLoaded", function() { // скрипт начнёт работу только после того как загрузится всё dom дерево

    "use stirct";

    // табы

    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent (a) {
        for(let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if ( tabContent[b].classList.contains("hide")) { // contains проверка на класс, содержит ли проверяемый элемент этот класс
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", (event) => {
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for( let i = 0; i < tab.length; i++ ) {
                if( target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // таймер


    let deadline = '2020-5-2';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else { 
                            return num;
                        }
                    }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // модальное окно

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    //форма
    
    let message = {
        loading: "загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся.",
        failure: "error"
    };

    let form = document.querySelector(".main-form"),
        input = form.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

    statusMessage.classList.add("status");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');    

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener("readystatechange", function() {
            if( request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if( request.readyState === 4 && request.status == 200 ) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

            for(let i = 0; i < input.length; i++) {
                input[i].value = "";
            }
    });

    // слайдер 

    let slideIndex = 1, // парметор текущего слайда
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");

    showSlides(slideIndex);
    function showSlides(n) {

        if(n > slides.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = "none" );
        dots.forEach((item) => item.classList.remove("dot-active"));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("dot-active");
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener("click", () => {
        plusSlides(-1);

    });

    next.addEventListener("click", () => {
        plusSlides(1);    
    });

    dotsWrap.addEventListener("click", (event) => {
        for(let i = 0; i < dots.length+1; i++) {
            if(event.target.classList.contains("dot") && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    // калькулятор 

    let persons = document.querySelectorAll(".counter-block-input")[0],
        restDays = document.querySelectorAll(".counter-block-input")[1],
        place = document.getElementById("select"),
        totalValue = document.getElementById("total"),
        personsSum = 0,
        daysSum = 0,
        total =0;

        totalValue.textContent = "0";

        persons.addEventListener("input", function() {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if(restDays.value == "") {
                totalValue.textContent = 0;
            } else {
                totalValue.textContent = total;
            }
        });

        restDays.addEventListener("input", function() {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if(persons.value == "") {
                totalValue.textContent = 0;
            } else {
                totalValue.textContent = total;
            }
        });

        place.addEventListener("input", function() {
            if(persons.value == "" || restDays.value == "") {
                totalValue.textContent = 0;
            } else {
                let a = total;
                totalValue.textContent = a * this.options[this.selectedIndex].value;
            }
        });


});