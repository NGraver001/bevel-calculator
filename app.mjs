import { calculate } from './calculator.mjs';
const form = document.querySelector('#form');
const ids = ['thickness', 'edge', 'depth', 'diameter', 'fixtureHeight'];
const result = document.querySelector('.result');
function update() {
  const values = Object.fromEntries(ids.map(id => [id, form.elements[id].value.trim() === '' ? NaN : Number(form.elements[id].value)]));
  const answer = calculate(values);
  result.classList.toggle('invalid', Boolean(answer.error));
  document.querySelector('#offset').textContent = answer.error ? 'Check your setup' : answer.offset.toFixed(3);
  document.querySelector('.result-unit').hidden = Boolean(answer.error);
  document.querySelector('#result-note').textContent = answer.error || 'Distance from the thin edge to the wheel centerline.';
  document.querySelector('#result-status').textContent = (answer.error || answer.heightError) ? 'ADJUST YOUR INPUTS' : 'READY TO SET UP';
  document.querySelector('#wheel-summary').textContent = `Ø ${values.diameter}″ WHEEL`;
  const overallError = answer.error || answer.heightError;
  document.querySelector('#overall').textContent = overallError ? '—' : answer.overall.toFixed(3);
  document.querySelector('#overall-unit').hidden = Boolean(overallError);
  document.querySelector('#overall-note').textContent = overallError || 'Workrest tabletop to wheel centerline, including fixture height.';
  document.querySelector('.overall-output').classList.toggle('has-error', Boolean(overallError));
}
form.addEventListener('input', update);
form.addEventListener('submit', event => event.preventDefault());
document.querySelector('#reset').addEventListener('click', () => { HTMLFormElement.prototype.reset.call(form); update(); });
update();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
