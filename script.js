let hours = 0;
let minutes = 0;
let seconds = 0;


function generateNumbers(id, max) {
    const column = document.getElementById(id);
    for (let i = 0; i <= max; i++) {
      const span = document.createElement("span");
      span.textContent = i.toString().padStart(2, "0");
      column.appendChild(span);
    }
}

generateNumbers("hours", 23);   // Часы: 0-23
generateNumbers("minutes", 59); // Минуты: 0-59
generateNumbers("seconds", 59); // Секунды: 0-59

function scrollColumn(columnId) {
    const column = document.getElementById(columnId);
    let selectedIndex = 0;

    column.addEventListener("wheel", (e) => {
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

    column.querySelectorAll("span")[0].classList.add("selected"); // Выделить первый элемент
    
}

scrollColumn("hours");
scrollColumn("minutes");
scrollColumn("seconds");


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
