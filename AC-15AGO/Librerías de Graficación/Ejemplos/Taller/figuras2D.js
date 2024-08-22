let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function drawShape() {
  let shape = document.getElementById('shape').value;
  let x = parseInt(document.getElementById('x').value);
  let y = parseInt(document.getElementById('y').value);
  let radius = parseInt(document.getElementById('radius').value);
  let sides = parseInt(document.getElementById('sides').value);
  let fillColor = document.getElementById('fillColor').value;
  let borderColor = document.getElementById('borderColor').value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (shape) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.stroke();
      break;
    case 'square':
      ctx.beginPath();
      ctx.rect(x, y, radius * 2, radius * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.stroke();
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + radius, y);
      ctx.lineTo(x + radius / 2, y + radius * Math.sqrt(3) / 2);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.stroke();
      break;
    case 'polygon':
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        let angle = i * 2 * Math.PI / sides;
        let px = x + radius * Math.cos(angle);
        let py = y + radius * Math.sin(angle);
        ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.stroke();
      break;
  }
}