const Event = (function () {
  const event = {};

  function on(evt, handler) {
    event[evt] = event[evt] || [];
    event[evt].push({
      handler,
    });
  }

  function fire(evt, args) {
    if (!event[evt]) {
      return;
    }
    for (let i = 0; i < event[evt].length; i++) {
      event[evt][i].handler(args);
    }
  }

  function off(name) {
    delete event[name];
  }
  return {
    on,
    fire,
    off,
  };
}());

window.Event = Event;
module.exports = Event;
