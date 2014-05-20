// Marker Constructor
function Marker(elem) {
  this.elem = elem;
  this.marks = [];
  this.buttons = [],
  this.currentId = 1;
  
  this.generateWidgets();
}

// Generate note block and move button
Marker.prototype.generateWidgets = function () {
  // Generate note block
  this.note = document.createElement('div');
  this.note.className = 'pagemarkerNote';
  
  var noteName = document.createElement('span');
  noteName.innerHTML = "Note: ";
  
  this.note.appendChild(noteName);
  this.note.style.display = 'none';
  
  // Generate move button
  this.move = document.createElement('div')
  this.move.className = 'pagemarkerMove';
  this.drawIcon(this.move, {
    draw: [
      /*
      {method: drawArc, path: [75, 75], stroke: 5, rad: 30, start: 0, end: 2},
      {method: drawShape, path: [[75, 10], [75, 140]], stroke: 5},
      {method: drawShape, path: [[10, 75], [140, 75]], stroke: 5}
      */
      {method: drawArc, path: [75, 75], stroke: null, rad: 8, start: 0, end: 2},
      {method: drawShape, path: [[90, 75], [100, 70], [110, 60], [145, 75], [110, 90], [100, 80]]},
      {method: drawShape, path: [[60, 75], [50, 70], [40, 60], [5, 75], [40, 90], [50, 80]]},
      {method: drawShape, path: [[75, 90], [70, 100], [60, 110], [75, 145], [90, 110], [80, 100]]},
      {method: drawShape, path: [[75, 60], [70, 50], [60, 40], [75, 5], [90, 40], [80, 50]]},
    ],
    color: '#7b7b7b'
  });
  
  // Generate a wrapper which wraps all the widgets
  var widgets = document.createElement('div');
  widgets.className = 'pagemarkerWidgets';
  widgets.appendChild(this.note);
  widgets.appendChild(this.move);
  this.elem.appendChild(widgets);
};

Marker.prototype.generateButton = function (iconObj) {
  // Create button element
  var button = document.createElement('div');
  button.className = 'pagemarkerButton';
  this.elem.appendChild(button);
  
  this.buttons.push(button);

  // If the argument is not a object, then it should be a string or number
  if (typeof iconObj == 'object') {
    this.drawIcon(button, iconObj);
  } else {
    button.innerHTML = iconObj;
    button.className += ' textIcon';
  }
  
  return button;
};

// Generate the mark object
Marker.prototype.generateMark = function (position, iconObj, noteString) {
  var button = this.generateButton(iconObj);
  var Marker = this;
  
  // Make an instance of mark
  var markObj = new Mark(button, position, noteString);
  this.marks.push(markObj);
  
  // Bind mouse over handler
  if (noteString) {
    button.onmouseover = function () {  
      Marker.showNote(markObj.generateNote());
    };
  
    button.onmouseout = function () {
      Marker.hideNote();
    };
  }
  
  // Bind click handler
  button.onclick = function () {
    markObj.jump();
  }
};

// Generate the save button
Marker.prototype.generateSaveButton = function (iconObj) {
  var button = this.generateButton(iconObj);
  var Marker = this;
   
  // Generate the note input area
  var noteInput = document.createElement('input');
  noteInput.className = 'noteInput';
  
  // Bind mouse hover handler
  button.onmouseover = function () {
    Marker.showNote(noteInput);
    noteInput.focus();
  };
  
  button.onmouseout = function () {
    Marker.hideNote();
  };
  
  //Bind click handler and on key "Enter" handler
  button.onclick = triggerGenerateMark;
  noteInput.onkeypress = function (e) {
    if (e.keyCode == 13) {
      triggerGenerateMark();
    }
  };
  
  // Trigger the generateMark function and adjust the note block position
  function triggerGenerateMark() {
    if (Marker.currentId < 5) {
      var right = - (Marker.currentId + 1) * 52;
      Marker.note.style.right = right + 'px';
    }
    
    Marker.generateMark(window.scrollY, Marker.currentId, noteInput.value); 
    noteInput.value = '';
    
    Marker.currentId++;
  }
  
  return button;
}

// Show the note message in the note block
Marker.prototype.showNote = function (note) {
  this.note.appendChild(note);
  this.note.style.display = 'block';
}; 

// Hide the note block and remove the note message
Marker.prototype.hideNote = function () {
  this.note.innerHTML = "Note: ";
  this.note.style.display = 'none';
};

// Draw an icon in a button
Marker.prototype.drawIcon = function (elem, iconObj) {
  var icon = document.createElement('canvas');
  elem.appendChild(icon);
  
  for (var i = 0; i < iconObj.draw.length; i++) {
    var drawObj = iconObj.draw[i];
    drawObj.method(icon, iconObj.color, drawObj.stroke, drawObj.path, drawObj.rad, drawObj.start, drawObj.end);
  }
};