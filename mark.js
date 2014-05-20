// Mark constructor
function Mark(elem, position, note) {
  this.elem = elem;
  this.position = position;
  this.note = note;
}

// Jump to the page position saved in the Mark
Mark.prototype.jump = function () {
  window.scrollTo(0, this.position);
};

// Generate the note message element
Mark.prototype.generateNote = function () {
  var note = document.createElement('span');
  note.innerHTML = this.note;
  
  return note;
}
