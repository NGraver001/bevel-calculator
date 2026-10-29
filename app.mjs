import { calculate } from './calculator.mjs';
const form = document.querySelector('#form');
const ids = ['thickness', 'edge', 'depth', 'diameter'];
const result = document.querySelector('.result');
function update() {
  const values = Object.fromEntries(ids.map(id => [id, form.elements[id].value.trim() === '' ? NaN : Number(form.elements[id].value)]));
  const answer = calculate(values);
  result.classList.toggle('invalid', Boolean(answer.error));
  document.querySelector('#offset').textContent = answer.error ? 'Check your setup' : answer.offset.toFixed(3);
  document.querySelector('.result-unit').hidden = Boolean(answer.error);
  document.querySelector('#result-note').textContent = answer.error || 'Distance from the thin edge to the wheel centerline.';
  document.querySelector('#result-status').textContent = answer.error ? 'ADJUST YOUR INPUTS' : 'READY TO SET UP';
  document.querySelector('#wheel-summary').textContent = `Ø ${values.diameter}″ WHEEL`;
}
form.addEventListener('input', update);
form.addEventListener('submit', event => event.preventDefault());
document.querySelector('#reset').addEventListener('click', () => { HTMLFormElement.prototype.reset.call(form); update(); });
update();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
