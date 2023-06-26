let button = document.querySelector(".btn"),
    check = document.querySelector(".check"),
    cross = document.querySelector(".cross"),
    input = document.querySelector("textarea"),
    second = document.querySelector(".second"),
    note_typer = document.querySelector(".note_pade"),
    icons = document.querySelectorAll(".note_pade span"),
    i = 0,
    str = "",
    stored_notes,
    stored_notes_arr;


function geting_stores_arr() {
    stored_notes = localStorage.getItem("notes");
    if (stored_notes == null || stored_notes.length === 0) {
        stored_notes = []
    } else {
        stored_notes = JSON.parse(localStorage.getItem("notes"));
    }
    stored_notes_arr = [...stored_notes];
}
geting_stores_arr();


function refresh_second() {
    str = "";
    stored_notes_arr.forEach((stored_note, i) => {

        str += `<div class="divtag note${i}" style="margin: ${randon_margin()}; background-color: ${randon_color()}; transform: ${random_rotate()};"><p class="text">${stored_note}</p><span onclick="remove_note(${i})" title="remove note" class="mdi mdi-close-octagon"></span></div>`
    });
    second.innerHTML = str
}
refresh_second()

let notes = document.querySelectorAll(".divtag");

button.addEventListener("click", () => {
    if (note_typer.style.display === "none") {
        note_typer.style.display = "block"
        button.style.display = "none"

    }
})

cross.addEventListener("click", () => {
    note_typer.style.display = "none"
})



function new_note() {
    stored_notes_arr.push(document.querySelector("textarea").value)
    localStorage.setItem("notes", JSON.stringify(stored_notes_arr))

    refresh_second()
    noteevents();
    input.value = "";
    note_typer.style.display = "none"
}
check.addEventListener("click", () => {
    if (input.value !== "") {
        new_note();
    } else {
        alert("Note pade is empty")
    }
})



function random_rotate() {
    let rotate = ["rotate(4deg)", "rotate(5deg)", "rotate(-5deg)", "rotate(-4deg)", "rotate(-6deg)", "rotate(6deg)", "rotate(8deg)", "rotate(-8deg)", "rotate(2deg)", "rotate(-3deg)"]
    return rotate[Math.floor(Math.random() * rotate.length)]
}
function randon_margin() {
    let margin = ["-5px", "5px", "-6px", "6px", "3px", "-4px", "-3px", "7px"]
    return margin[Math.floor(Math.random() * margin.length)]
}
function randon_color() {


    let color = ["pink", "yellow", "green", "blue", "purple", "grey"]
    i++
    if (i > color.length - 1) {
        i = 0;
    }
    return color[i]
}



function noteevents() {
    notes = document.querySelectorAll(".divtag")
    notes.forEach((note, i) => {
        note.addEventListener("mouseover", () => {
            note.style.transform = "scale(1.1)"
        })
        note.addEventListener("mouseleave", () => {
            note.style.transform = "scale(1)"
            note.style.transform = random_rotate()
        })
        note.addEventListener("dblclick", () => {
            note.style.display = "none"
        })
    });


}
noteevents();

function remove_note(from) {
    document.querySelector(".note" + from).remove();
    let arr = [];
    stored_notes_arr.forEach((n, j) => {
        if (j != from) {
            arr.push(n)
        }
    });
    stored_notes_arr = arr;
    localStorage.setItem("notes", JSON.stringify(stored_notes_arr))
    geting_stores_arr();
}

icons.forEach((icon) => {
    icon.onclick = () => {
        button.style.display = "block";
    }
})








