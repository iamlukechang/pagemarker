// Draw a shape with lineTo() and quadraticCurveTo() 
function drawShape(element, color, stroke, path) {
  var ctx = element.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(path[0][0], path[0][1]);
  for (var i = 1; i < path.length; i++) {
    if (path[i].length == 2) {
      ctx.lineTo(path[i][0], path[i][1]);
    } else if (path[i].length == 4) {
      ctx.quadraticCurveTo(path[i][0], path[i][1], path[i][2], path[i][3]);
    }
  }
  if (stroke) {
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.stroke();
  } else {
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
}

// Draw an arc shape with Arc()
function drawArc(element, color, stroke, center, rad, start, end) {
  var ctx = element.getContext('2d');
  ctx.arc(center[0], center[1], rad * Math.SQRT2, start * Math.PI, end * Math.PI, false);
  if (stroke) {
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.stroke();
  } else {
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
}