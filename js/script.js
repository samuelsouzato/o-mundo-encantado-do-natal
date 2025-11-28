const buttons = document.querySelectorAll(".btn-toggle");

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        // Impede que "Inscreva-se" abra o card
        if (btn.classList.contains("btn-inscrever")) return;

        const card = btn.parentElement;
        const info = card.querySelector(".card-info");

        card.classList.toggle("open");

        if (card.classList.contains("open")) {
            info.style.maxHeight = info.scrollHeight + "px";
            btn.textContent = "Ver menos";
        } else {
            info.style.maxHeight = "0px";
            btn.textContent = "Ver mais";
        }
    });
});

