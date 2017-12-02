require('../../less/index.less');
const Toast = require('../mod/toast');
const Event = require('../mod/event');
const Note = require('../mod/note');
const waterFall = require('../mod/waterFall');
const $ = require('JQ');

const opts = (i, f, c) => ({ id: i, containers: f, content: c });
waterFall();
$(window).resize(() => {
  waterFall();
});
Event.on('add', (val) => {
  // console.log(`change...  now val is ${val}`);
  const i = Array.from(document.querySelectorAll('div.note')).pop().id;
  // console.log('fadfadfadgnvarpqgrf', i + 1, 1 + Number(i));
  const sum = 1 + Number(i);
  const options = opts(sum, '', val);
  // console.log('options', options);
  new Note(options);
});
// Event.fire('add', 'komolei');
//
// Event.off('add');

// Note click event

const addNote = document.querySelector('.addNote');
addNote.addEventListener('click', (e) => {
  const data = JSON.stringify({
    note: '',
  });
  fetch('/api/notes/add', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: data,
  }).then(response => response.json()).then((json) => {
    console.log('this is response:', json);
    Number(json.status) === 0 ? Event.fire('add', '') : new Toast(json.msg);
  }).catch((error) => { console.log(error); return error; });
});

const ct = document.querySelector('.waterfall.ct');
ct.addEventListener('click', (e) => {
  console.log('className', e.target.className.toLowerCase(), e.target.id);
  if (e.target.tagName.toLowerCase() === 'span') {
    const data = JSON.stringify({
      id: e.target.id,
    });
    fetch('/api/notes/delete', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: data,
    }).then((response) => {
      console.log('response:', response);
      return response.json();
    }).then((json) => {
      console.log('this is response:', json);
      Number(json.status) === 0 ? Event.fire('delete', e.target.id) : new Toast(json.msg);
    }).catch(error => console.log(error));
  }
});

// init first load
// window.onload = () => {
fetch('/api/notes', {
  method: 'Get',
  mode: 'cors',
  credentials: 'include',
})
  .then(r => r.json())
  .then(r => r.notes.forEach(item => new Note({ id: item.id, container: '', content: item.context })));
// };

