const crazyButton = document.querySelector('.btn-crazy')

const goAway = () => {
  // random number for left offset
  const offsetLeft = Math.random() * (window.innerWidth - crazyButton.clientWidth);
  //random num for top offset
  // const offsetTop = Math.random() * (window.innerHeight - crazyButton.clienteight);
  // apply to the btn
  // crazyButton.style.top = offsetTop + 'px'
  crazyButton.style.left = offsetLeft + 'px'
};

crazyButton.addEventListener('mouseenter', goAway);
crazyButton.addEventListener('click', function() { alert("Nice, you win!"); });

export { goAway }