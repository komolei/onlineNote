require('../../less/note.less');

const Toast = require('./toast');
const Event = require('./event');
const waterFall = require('../mod/waterFall');

// Event.on('delete', (targetEl) => {
//   document.querySelector('.waterfall.ct').removeChild(document.querySelector('${#targetEl}'));
// });
class Note {
  constructor(options) {
    this.options = options;
    Note.id += 1;
    this.id = Note.id;
    this.creatNote();
    this.bindEvent();
    this.moveEvent();
    this.edit();
  }

  init() {
    if (Number.isNaN(this.options.id)) {
      console.log('this.options.id:first:', this.options.id);
      return {
        id: this.id,
        container: this.options.containers,
        inputVale: this.options.content,
      };
    }

    console.log('this.options.id:second:', this.options.id);
    return {
      id: this.options.id,
      container: this.options.containers,
      inputVale: this.options.content,
    };
  }
  creatNote() {
    const note = this.init();
    // const fragment  = document.createDocumentFragment();
    console.log('note params:', note, '\n');
    const noteTemplate = `
                <header class="noteHeader">
                    <p class="pos"></p>
                    <span class="noteDel" id="${note.id}">X</span>
                </header>
                <div class="noteCt">
                <span>
                    ${typeof note.inputVale === null ? '' : note.inputVale}
                 </span>
                </div>
            <footer>
                <input type="text" id="inputValue" placeholder="input text">
            </footer>
        `;
    const div = document.createElement('div');
    div.classList.add('note');
    // div.id = this.id;
    div.id = note.id;
    div.innerHTML = noteTemplate;
    document.querySelector('.waterfall.ct').appendChild(div);
    new Toast('please input text');
    waterFall();
  }
  bindEvent() {
    const note = this.init();
    // console.log('bindef', note.id);
    // console.log('bindEvent', this.id);
    const noteId = document.getElementById(note.id);
    Event.on('delete', (val) => {
      console.log('val:', val);
      if (val === noteId.id) {
        document.querySelector('.waterfall.ct').removeChild(document.getElementById(noteId.id));
        waterFall();
        new Toast('delete successfully');
      }
    });
  }
  getMousePos(event) {
    const e = event || window.event;
    const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    const x = e.pageX || e.clientX + scrollX;
    const y = e.pageY || e.clientY + scrollY;
    // alert('x: ' + x + '\ny: ' + y);
    return { x, y };
  }
  moveEvent() {
    const note = this.init();
    const noteCt1 = document.getElementById(note.id);
    const noteCt = document.getElementsByClassName('pos')[this.id - 1];
    console.log('noteCt', noteCt1, noteCt, '\n');
    noteCt.onmousedown = () => {
      // noteCt1.style.transition = 'none';
      noteCt1.classList.remove('noteT');
      noteCt.style.cursor = 'move';
      const result = this.getMousePos(event);
      console.log('onmousedown', result, this);
      noteCt.onmousemove = () => {
        const result = this.getMousePos(event);
        // const oW = parseInt(noteCt.offsetWidth);
        // const oH = parseInt(noteCt.offsetHeight);
        const oW1 = parseInt(noteCt1.offsetWidth);
        // const oH1 = parseInt(noteCt1.offsetHeight);
        // const oL = noteCt.offsetLeft;
        // const oT = noteCt.offsetTop;
        // console.log('ow,oh', oW, oH, 'oL', 'oT', oL, oT);
        // console.log('result is ', result);
        noteCt1.style.left = `${result.x - oW1 + 100}px`;
        noteCt1.style.top = `${result.y}px`;
        // console.log(noteCt.style.left, noteCt.style.top);
      };
    };


    noteCt.onmouseup = () => {
      const noteCt1 = document.getElementById(note.id);
      const result = this.getMousePos(event);
      // const oW = parseInt(noteCt.offsetWidth);
      // const oH = parseInt(noteCt.offsetHeight);
      const oW1 = parseInt(noteCt1.offsetWidth);
      // const oH1 = parseInt(noteCt1.offsetHeight);
      // const oL = noteCt.offsetLeft;
      // const oT = noteCt.offsetTop;
      // console.log('ow,oh', oW, oH, 'oL', 'oT', oL, oT);
      // console.log('result is ', result);
      // noteCt1.style.left = `${result.x - oW1}px`;
      // noteCt1.style.top = `${result.y}px`;
      noteCt1.style.left = `${result.x - oW1 + 100}px`;
      noteCt1.style.top = `${result.y}px`;
      // console.log(noteCt.style.left, noteCt.style.top);
    };
  }
  edit() {
    console.log('this.id', this.id);
    const note = this.init();
    const spanCt = document.querySelectorAll('.noteCt>span')[this.id - 1];
    const inputValue = document.querySelectorAll('input')[this.id - 1];
    inputValue.addEventListener('change', () => {
      spanCt.innerText += inputValue.value;
      const data = JSON.stringify({
        note: spanCt.innerText,
        id: note.id,
      });
      waterFall();
      // console.log('data:', data, '\n');
      fetch('/api/notes/edit', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: data,
      }).then(response => response.json()).then((json) => {
        console.log('this is response:', json);
        Number(json.status) === 0 ? new Toast('update successfully') : new Toast(json.msg);
      }).catch(error => console.log(error));
    });
  }
}
Note.id = 0;
window.Note = Note;
module.exports = Note;


// <script type="text/javascript">
// MOUSETRACKRECORD = {
//     oSlippage: null, //小方块
//     X: [], //X坐标
//     Y: [], //Y坐标
//     clickX: 0, //鼠标点击时的X坐标
//     clickY: 0, //鼠标点击时的Y坐标
//     relativeX: 0, //鼠标相对方块的X坐标
//     relativeY: 0, //鼠标相对方块的Y坐标
//     isCanMove: false, //是否可以移动
//     iNum: 0, //坐标XY数组的下标
//     timeID: null,  //回放定时器
//     //鼠标按下的时候
//     mouseDown: function() {
//       //鼠标点击时
//       this.clickX = event.clientX;
//       this.clickY = event.clientY;
//       //获取小方块
//       var oSlippage = document.getElementById("slippage");
//       //获取div当前坐标(左边界和上边界)
//       var divX = parseInt(oSlippage.style.left) || 0;
//       var divY = parseInt(oSlippage.style.top) || 0;
//       //获取鼠标相对div的坐标
//       this.relativeX = this.clickX - divX;
//       this.relativeY = this.clickY - divY;
//       //设置可以移动
//       this.isCanMove = true;
//     },
//     //鼠标移动的时候
//     mouseMove: function() {
//       if (this.isCanMove) {
//         var oSlippage = document.getElementById("slippage");
//         oSlippage.style.left = event.clientX - this.relativeX;
//         oSlippage.style.top = event.clientY - this.relativeY;
//         //移动就记录下鼠标的轨迹
//         MOUSETRACKRECORD.startRecord(event.clientX, event.clientY);
//       }
//     },
//     //鼠标松开的时候
//     mouseUp: function() {
//       //取消小方块的mousemove事件
//       var oSlippage = document.getElementById("slippage");
//       oSlippage.onmousemove = null;
//       this.isCanMove = false;
//       //停止记录
//       clearInterval(this.timeID);
//     },
//     //开始记录鼠标移动过的坐标
//     startRecord: function(x, y) {
//       this.X.push(x);
//       this.Y.push(y);
//     },
//     //点击停止按钮，回到初始状态
//     overTrack: function() {
//       var oSlippage = document.getElementById("slippage");
//       oSlippage.style.left = 50;
//       oSlippage.style.top = 50;
//     },
//     //延迟方法
//     sleep: function(n) {
//       //var start = new Date().getTime();
//       //while (true)
//       // if (new Date().getTime() - start > n)
//       // break;
//       var oSlippage = document.getElementById("slippage");
//       oSlippage.style.left = this.X[this.iNum] - this.relativeX;
//       oSlippage.style.top = this.Y[this.iNum] - this.relativeY;
//       MOUSETRACKRECORD.iNum++;
//       //如果下标大于了他的长度就停止回放
//       if (this.iNum > this.X.length - 1) {
//         clearInterval(this.timeID);
//       }
//     },
//     //回看轨迹记录
//     backTrack: function() {
//       //var oSlippage = document.getElementById("slippage");
//       //var len = this.X.length;
//       //for (var i = 0; i < len; i++) {
//       // oSlippage.style.left = this.X[i] - this.relativeX;
//       // oSlippage.style.top = this.Y[i] - this.relativeY;
//       // //延迟循环方法
//       // this.sleep(10);
//       //}
//       this.timeID = setInterval("MOUSETRACKRECORD.sleep()", 10);
//     },
//     //初始化
//     init: function() {
//       location.reload();
//     }
//   }
//   </script>

