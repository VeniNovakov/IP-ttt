const socket = io('http://localhost:3000');

document.addEventListener('DOMContentLoaded', () => {
  const id = Date.now();

  let currPlayer=''

  document.querySelectorAll('.cell').forEach((button) => {
    button.addEventListener('click', () => {
      if (currentPlayer === '') {
        console.error('Players not identified yet.');
        return;
      }

      if (button.innerHTML === '') {
        const cellId = button.id;
        const figure = currPlayer === 'u1' ? 'X' : 'O';


        socket.emit('place', { cellId, figure });
      } else {
        console.log('Cell is already occupied.');
      }
    });
  });

  socket.on('identify', (response) => {
    console.log(response.status);
    currPlayer = response.message;
  });

  socket.on('placeFigure', ({ cellId, figure }) => {
    const button = document.getElementById(cellId);
    if (button) {
      button.innerText = figure;
    }
  });

});