const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  setTitleContent('666');
});

function setTitleContent(value) {
  document.querySelector('h2').innerHTML = value;
}