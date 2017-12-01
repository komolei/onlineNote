require('../../less/toast.less');

class Toast {
  constructor(message, time) {
    this.message = message;
    this.time = time || 200;
    this.use();
  }
  create() {
    const container = `<span>${this.message}</span>`;
    const div = document.createElement('div');
    div.classList.add('toast');
    div.innerHTML = container;
    document.querySelector('body').appendChild(div);
    this.del();
  }
  use() {
    setTimeout(this.create.bind(this), this.time);
  }
  del() {
    setTimeout(() => {
      document.querySelector('body').removeChild(document.querySelector('.toast'));
    }, 1000);
  }
}

window.Toast = Toast;
module.exports = Toast;
