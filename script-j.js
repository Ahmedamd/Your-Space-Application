class AppJournal {
  constructor() {
    this.n = JSON.parse(localStorage.getItem("entries")) || [];
    this.gB = JSON.parse(localStorage.getItem("entries")) || [];
    this.title = "";
    this.text = "";
    this.id = "";
    this.notetitle = document.querySelector("#title-j");
    this.notetext = document.querySelector("#text-j");
    this.formbtns = document.querySelector("#btn-cont");
    this.form = document.querySelector("#form");

    this.entries = document.querySelector("#entries-collection");

    this.placeholder = document.querySelector("#placeholder");
    this.box = document.querySelector("box-j");
    this.editicon = document.querySelector("#edit-icon");

    this.modal = document.querySelector(".modal");
    // modalsssssss add to html script later...
    this.modalTitle = document.querySelector(".modal-title");
    this.modalText = document.querySelector(".modal-text");

    this.modalCloseButton = document.querySelector(".modal-close-button");
    this.date = document.querySelector(".date-obj");

    this.render();
    this.EventL();
    this.displayDate();
  }

  EventL() {
    document.body.addEventListener("click", (event) => {
      this.selectNote(event);
      this.openModal(event);
      this.deleteNote(event);
      // this.handleFormClick(event);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.notetitle.value;
      const text = this.notetext.value;
      console.log("form is submitted values are:", title, text);
      const hasNote = title || text;
      if (hasNote) {
        console.log("is this even working");
        this.addNote({ title, text });
        console.log(" yes it is ");
      }

      // this.title.value = "";
      this.notetitle.value = "";
      this.notetext.value = "";
    });

    this.modalCloseButton.addEventListener("click", (event) => {
      this.closeModal(event);
    });

    // if form is clicked display block for title and form button
  }

  displayDate() {
    const a = new Date();
    let b = a.getDate().toString();
    let c = a.getDay().toString();
    let month = (a.getMonth() + 1).toString();
    let year = a.getFullYear().toString();

    let res = b + "/" + month + "/" + year;
    console.log(res);
    this.date.innerHTML = res;
    // return res;
  }

  openForm() {
    this.notetitle.style.display = "block";
    this.formbtns.style.display = "block";
  }

  closeForm() {
    this.notetitle.style.display = "none";
    this.formbtns.style.display = "none";
  }

  addNote({ title, text }) {
    const newNote = {
      title,
      text,
      color: "white",
      id: this.n.length > 0 ? this.n[this.n.length - 1].id + 1 : 1,
    };

    this.n = [...this.n, newNote];

    console.log("lenth of n", this.n);
    this.render();
  }

  displayNotes() {
    const hasNotes = this.n.length > 0;
    // this.placeholder.style.display = hasNotes ? "none" : "flex";
    console.log(this.entries);

    this.entries.innerHTML = this.n
      .map(
        (note) => `
      <div class="box-j" data-id=${note.id}>
      <article id="edit-icon" class="fas fa-pen"></article>

      <article id="box-title">${note.title}</article>
      <article id="box-content">${note.text}</article>
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
    const selectedNote = event.target.closest(".box-j");
    if (!selectedNote) return;
    const [icon, notetitle, notetext] = selectedNote.children;
    // console.log("note is", notetitle, notetext);
    this.title = notetitle.innerText;
    this.text = notetext.innerText;
    this.id = selectedNote.dataset.id;
  }

  openModal(event) {
    if (event.target.matches("#toolbar-delete")) return;
    if (event.target.closest(".box-j")) {
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
    localStorage.setItem("entries", JSON.stringify(this.n));
    // localStorage.setItem("entries", JSON.stringify(this.gB));
    console.log("Im saving");
  }

  deleteNote(event) {
    event.stopPropagation();
    if (!event.target.matches("#toolbar-delete")) return;
    const id = event.target.dataset.id;
    this.n = this.n.filter((note) => note.id !== Number(id));
    this.render();
  }
}

new AppJournal();
