const mousemove = document.querySelector('.mousemove');

window.addEventListener('mousemove', (event) => {
  mousemove.style.left = event.pageX + 'px';
  mousemove.style.top = event.pageY + 'px';
});

window.addEventListener('mousedown', () => {
  mousemove.style.transform = "translate(-50%, -50%) scale(0.2)";
  mousemove.style.border = "2px solid blue";
});

window.addEventListener('mouseup', () => {
  mousemove.style.transform = "translate(-50%, -50%) scale(1)";
  mousemove.style.border = "2px solid #1CE";
});