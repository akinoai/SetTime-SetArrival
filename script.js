const button = document.getElementById("btn")

let hours = 0;
let minutes = 0;
let seconds = 0;
let canScroll = true;

function generateNumbers(id, max) {
    const column = document.getElementById(id);
    for (let i = 0; i <= max; i++) {
      const span = document.createElement("span");
      span.textContent = i.toString().padStart(2, "0");
      column.appendChild(span);
    }
}

function scrollColumn(columnId) {
    if(canScroll == true){
        const column = document.getElementById(columnId);
        let selectedIndex = 0;

    
        column.addEventListener("wheel", (e) => {
            if(canScroll == false) return;
            e.preventDefault();
            const spans = column.querySelectorAll("span");
            spans[selectedIndex].classList.remove("selected");

            if (e.deltaY > 0) {
                selectedIndex = (selectedIndex + 1) % spans.length; // Вниз
            } else {
                selectedIndex = (selectedIndex - 1 + spans.length) % spans.length; // Вверх
            }



            spans[selectedIndex].classList.add("selected");

                // Скролл к выделенному элементу
            column.scrollTo({
            top: spans[selectedIndex].offsetTop - column.clientHeight / 2 + spans[selectedIndex].clientHeight / 2,
            behavior: "smooth",
            });

            TimeDetection(columnId, selectedIndex)
        });
    
        column.querySelectorAll("span")[0].classList.add("selected");
    }
}

function TimeDetection(columnId, selectedIndex){
    if(columnId=="hours") {
        hours = selectedIndex;
    } else if(columnId=="minutes"){
        minutes = selectedIndex;
    } else if(columnId=="seconds"){
        seconds = selectedIndex;
    }

    console.log(`hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}`)
}

function autoDecrement(columnId, max, callback) {
    const column = document.getElementById(columnId);
    let selectedIndex = max;

    const intervalId = setInterval(() => {
        if (selectedIndex > 0) {
            const spans = column.querySelectorAll("span");
            spans[selectedIndex].classList.remove("selected");

            selectedIndex--;

            spans[selectedIndex].classList.add("selected");

            column.scrollTo({
                top: spans[selectedIndex].offsetTop - column.clientHeight / 2 + spans[selectedIndex].clientHeight / 2,
                behavior: "smooth",
            });
        } else {
            clearInterval(intervalId); // Останавливаем таймер
            if (callback) callback(); // Запускаем следующий таймер
        }
    }, 1000);
}

function activateUI(){
    button.style.pointerEvents = "auto";
    canScroll = true;
}

function deactivateUI(){
    button.style.pointerEvents = "none";
    canScroll = false;
}

document.addEventListener("DOMContentLoaded", () => {
    generateNumbers("hours", 23);
    generateNumbers("minutes", 59);
    generateNumbers("seconds", 59);
  
    scrollColumn("hours");
    scrollColumn("minutes");
    scrollColumn("seconds");
});

button.addEventListener("click", () => {
    deactivateUI();

    autoDecrement("seconds", seconds, () => {  // Отсчёт секунд (до 0)
        autoDecrement("minutes", minutes, () => { // После секунд - минуты
            autoDecrement("hours", 23, () => { // После минут - часы
                activateUI(); // Когда все таймеры закончатся, снова активируем UI
            });
        });
    });
});