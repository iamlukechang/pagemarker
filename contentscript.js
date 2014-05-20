(function () {
  var markerElem = document.getElementById("Pagemarker-Chrome");

  // If it's not existed, then generate it; otherwise show it or hide it.
  if (!markerElem) {
    // Generate the Pagemarker-Chrome element in the page
    markerElem = document.createElement('div'); 
    markerElem.id = "Pagemarker-Chrome";
    document.body.appendChild(markerElem);
  
    markerElem.style.visibility = 'visible';
  
    var marker = new Marker(markerElem);

    // Generate the save button
    marker.generateSaveButton({
      draw: [
        /*
        {method: drawShape, path: [[60, 130], [130, 60]], stroke: 5},
        {method: drawArc, path: [40, 110], stroke: 5, rad: 20, start: 0.25, end: 1.25},
        {method: drawShape, path: [[20, 90], [90, 20]], stroke: 5},
        {method: drawArc, path: [105, 35], stroke: 5, rad: 15, start: 1.25, end: 0.25},
        {method: drawShape, path: [[120, 50], [50, 120]], stroke: 5},
        {method: drawArc, path: [40, 110], stroke: 5, rad: 10, start: 0.25, end: 1.25},
        {method: drawShape, path: [[30, 100], [100, 30]], stroke: 5}
        */
        {
          method: drawShape, 
          path: [
            [55, 60], 
            [70, 45],
            [120, 45], 
            [130, 45, 130, 55], 
            [130, 75],
            [130, 85, 120, 85], 
            [120, 75], 
            [70, 75],
          ]
        },
        {
          method: drawShape, 
          path: [
            [120, 20],
            [120, 15], 
            [30, 15], 
            [30, 135], 
            [120, 135], 
            [120, 20]
          ], 
          stroke: 5
        }
      ],
      color: '#7b7b7b'
    }).className += ' saveButton';

    // Generate the default button which point to the top of the current page
    marker.generateMark(0, {
      draw: [
        {method: drawShape, path: [[25, 110], [75, 55], [125, 110]], stroke: null}, 
        {method: drawShape, path: [[25, 50], [125, 50]], stroke: 10}
      ],
      color: '#7b7b7b'
    });
  
    // Bind drag and drop event handlers
    var body = document.body;
    marker.move.setAttribute('draggable', true);
    marker.move.addEventListener('dragstart', handleDragStart, false);
    marker.move.addEventListener('dragstart', changeStyle, false);
    marker.move.addEventListener('dragend', handleDragEnd, false);
    body.addEventListener('dragover', handleDragOver, false);
    body.addEventListener('drop', handleDrop, false);

    chrome.runtime.sendMessage({OnOff: "ON"});
  
  } else {
    if(markerElem.style.visibility == 'visible') {
      markerElem.style.visibility = 'hidden';
      chrome.runtime.sendMessage({OnOff: "OFF"});
    } else if (markerElem.style.visibility == 'hidden') {
      markerElem.style.visibility = 'visible';
      chrome.runtime.sendMessage({OnOff: "ON"});
    }
  }

  // Change the Pagemarker-Chrome to floated style for only once
  function changeStyle(e) {
    // Not attached to the window's edge any more
    marker.note.style.left = '0px';
    markerElem.className += ' floating';
  
    // Remove this handler
    this.removeEventListener('dragstart', changeStyle, false);
  }

  // Handle drag start
  function handleDragStart(e) {
    // Effect while dragging
    markerElem.style.opacity = '0.5';
  
    var top = markerElem.getBoundingClientRect().top - e.clientY;
    var left = markerElem.getBoundingClientRect().left - e.clientX;
    //e.dataTransfer.setData('text', right + "-" + bottom);
    e.dataTransfer.setData('text', left + "," + top);
  } 

  // Handle drag end
  function handleDragEnd(e) {
    // Effect when dragging is end
    markerElem.style.opacity = '1.0';
  }

  // Handle drop
  function handleDrop(e) {
    var offset = e.dataTransfer.getData('text').split(',');
    var left = parseInt(offset[0]),
        top = parseInt(offset[1]);     
    markerElem.style.bottom = 'auto';
    markerElem.style.right = 'auto';
    markerElem.style.left = left + e.clientX + 'px';
    markerElem.style.top = top + e.clientY + 'px';

    event.preventDefault();
    return false;
  }

  // Handle drag over
  function handleDragOver(e) {
    e.preventDefault();
    return false;
  }
})();
