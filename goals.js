class goals {
  constructor() {
    this.n = JSON.parse(localStorage.getItem("goals")) || [];
    // this.newAcc = JSON.parse(localStorage.getItem("accounts")) || [];
    this.title = "";
    this.text = "";
    this.deadline = "";
    this.id = "";

    this.name;

    this.notetitle = document.querySelector("#goal-title");
    this.notetext = document.querySelector("#s-goal");
    this.listgoals = document.querySelector(".list-goals");
    this.listitems = document.querySelector(".list-item");
    this.oneItem = document.querySelectorAll("mark");

    this.targetdate = document.querySelector("#s-target");
    this.addicon = document.querySelector(".add");
    this.refinedList = document.querySelector("#s-text");

    this.formbtns = document.querySelector("#formbtns");

    this.form = document.querySelector("#form");

    this.notes = document.querySelector("#goals-collection");

    this.placeholder = document.querySelector("#placeholder");
    this.box = document.querySelector("box");
    this.editicon = document.querySelector("#edit-icon");

    this.modal = document.querySelector(".modal");
    this.modalTitle = document.querySelector(".modal-title");
    this.modalText = document.querySelector(".modal-text-a");
    this.bulletlist = document.createElement("ul");
    this.modalCloseButton = document.querySelector(".modal-close-button");

    this.render();
    this.EventL();
  }

  EventL() {
    document.body.addEventListener("click", (event) => {
      this.selectNote(event);
      this.openModal(event);
      this.deleteNote(event);
      this.handleFormClick(event);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.notetitle.value;

      // console.log("refined list is", this.refinedList);

      const text = this.refinedList.value;

      const deadline = this.targetdate.value;

      const hasNote = title || text;
      if (hasNote) {
        this.addNote({ title, text, deadline });
      }
      console.log(title, text, deadline);
      // this.title.value = "";
      this.notetitle.value = "";
      this.notetext.value = "";
      this.targetdate.value = "";
    });

    this.modalCloseButton.addEventListener("click", (event) => {
      this.closeModal(event);
    });

    this.addicon.addEventListener("click", () => {
      if (this.notetext.value === "") {
        alert("Please enter a valid value");
      } else {
        let x = document.createElement("LI");
        x.setAttribute("class", "mark");

        this.bulletlist.setAttribute("class", "jackson");
        let itemText = document.createTextNode(this.notetext.value);
        x.appendChild(itemText);
        this.bulletlist.appendChild(x);

        console.log(this.bulletlist.childNodes[1].textContent);

        this.refinedList.innerHTML = this.bulletlist.innerHTML;
        this.notetext.value = "";
      }
    });

    // if form is clicked display block for title and form button
  }
  //end of EventL

  handleFormClick(event) {
    const isClicked = this.form.contains(event.target);

    if (isClicked) {
      this.openForm();
    } else {
      this.closeForm();
    }
  }

  openForm() {
    this.listgoals.style.display = "block";
    this.formbtns.style.display = "block";
  }

  closeForm() {
    this.listgoals.style.display = "none";
    this.formbtns.style.display = "none";
  }

  addNote({ title, text, deadline }) {
    const newNote = {
      title,
      text,
      deadline,
      color: "white",
      id: this.n.length > 0 ? this.n[this.n.length - 1].id + 1 : 1,
    };

    this.n = [...this.n, newNote];

    console.log(this.n);
    this.render();
  }

  displayNotes() {
    const hasNotes = this.n.length > 0;
    this.placeholder.style.display = hasNotes ? "none" : "flex";

    this.notes.innerHTML = this.n
      .map(
        (note) => `
    
         <div class="box" data-id= ${note.id}>
         
      
         <article id="edit-icon" class="fas fa-pen"></article>
        
          <article id="box-title">${note.title}</article>
        
          <article id="box-content">${note.text}</article>

           <article id="box-content">${note.deadline}</article>
          <div class="toolbar-container">
                  <div class="toolbar">


                    <i data-id="${note.id}" class="fas fa-trash" id="toolbar-delete"></i>
                  </div>
                </div>
        
        </div>
    `
      )
      .join("");
  }

  editNote() {
    const title = this.modalTitle.value;
    const text = this.modalText.value;
    this.n = this.n.map((note) =>
      note.id === Number(this.id) ? { ...note, title, text } : note
    );
    this.render();
  }

  selectNote(event) {
    const selectedNote = event.target.closest(".box");
    console.log("selected note", selectedNote);
    // const b = this.editicon.parentElement;
    if (!selectedNote) return;
    const [icon, notetitle, notetext] = selectedNote.children;
    // console.log("note is", notetitle, notetext);
    this.title = notetitle.innerText;
    this.text = notetext.innerText;
    this.id = selectedNote.dataset.id;
  }

  openModal(event) {
    if (event.target.matches("#toolbar-delete")) return;

    if (event.target.closest(".box")) {
      this.modal.classList.toggle("open-modal");
      this.modalTitle.value = this.title;
      this.modalText.value = this.text;
    }
  }
  closeModal(event) {
    this.editNote();
    this.modal.classList.toggle("open-modal");
  }

  render() {
    this.saveNotes();
    this.displayNotes();
  }

  saveNotes() {
    localStorage.setItem("goals", JSON.stringify(this.n));
  }

  deleteNote(event) {
    event.stopPropagation();
    if (!event.target.matches("#toolbar-delete")) return;
    const id = event.target.dataset.id;
    this.n = this.n.filter((note) => note.id !== Number(id));
    this.render();
  }
}

new goals();
