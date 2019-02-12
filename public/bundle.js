(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const addToDOM = entryAsHtml => {
  document.querySelector("#container").innerHTML += entryAsHtml;
};

var _default = addToDOM;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const clearDOM = () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

var _default = clearDOM;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const createHTML = {
  createClearButton: () => {
    const newButton = document.createElement("button");
    newButton.textContent = "Clear Entries";
    newButton.setAttribute("id", "clear_button");
    document.querySelector("#button_container").appendChild(newButton);
  },
  createJournalHTML: entry => {
    return `
<article class = "journalEntry">         
<section class = "title">
<h3>${entry.title}</h3>
</section>
<section class = "date">
<p>${entry.date}</p>
</section>
<section class = "text">
<p>${entry.text}</p>
</section>
<section class = "mood">
<p>mood: ${entry.mood}</p>
</section>
`;
  }
};
var _default = createHTML;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createObject = (text, title, emotion, objectDate) => {
  return {
    title: title,
    date: objectDate,
    mood: emotion,
    text: text
  };
};

var _default = createObject;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const entryManager = {
  getEntries: () => {
    return fetch("http://127.0.0.1:8088/entries");
  },
  postEntry: entryObject => {
    return fetch("http://127.0.0.1:8088/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryObject)
    }).then(res => res.json());
  }
};
var _default = entryManager;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createHTML = _interopRequireDefault(require("./createHTML"));

var _addToDOM = _interopRequireDefault(require("./addToDOM"));

var _entryManager = _interopRequireDefault(require("./entryManager"));

var _createObject = _interopRequireDefault(require("./createObject"));

var _clearDOM = _interopRequireDefault(require("./clearDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveButton = document.querySelector("#save_button");
const showButton = document.querySelector("#show_button");
const radioButtons = document.querySelector("#radio_buttons");
const container = document.querySelector("#container");
console.log(container);
const eventListeners = {
  clearButtonListener: () => {
    const clearButton = document.querySelector("#clear_button");
    clearButton.addEventListener("click", () => {
      (0, _clearDOM.default)();
      clearButton.style.display = "none";
    });
  },
  showButtonListener: () => {
    showButton.addEventListener("click", () => {
      _entryManager.default.getEntries().then(res => res.json()).then(journalEntries => {
        (0, _clearDOM.default)();
        journalEntries.forEach(entry => {
          const html = _createHTML.default.createJournalHTML(entry);

          (0, _addToDOM.default)(html);
        });
        const clearButton = document.querySelector("#clear_button");

        if (clearButton) {
          clearButton.style.display = "initial";
        } else {
          _createHTML.default.createClearButton();

          eventListeners.clearButtonListener();
        }
      });
    });
  },
  saveButtonListener: () => {
    saveButton.addEventListener("click", () => {
      const textarea = document.querySelector("#textarea");
      const conceptsCovered = document.querySelector("#conceptsCovered");
      const emotionList = document.querySelector("#emotionList");
      const inputDate = document.querySelector("#journalDate");
      const text = textarea.value;
      const title = conceptsCovered.value;
      const mood = emotionList.value;
      const objectDate = inputDate.value;
      const newObject = (0, _createObject.default)(text, title, mood, objectDate);

      _entryManager.default.postEntry(newObject);

      const newHTML = _createHTML.default.createJournalHTML(newObject);

      (0, _addToDOM.default)(newHTML);
    });
  },
  radioButtonListener: () => {
    radioButtons.addEventListener("click", event => {
      //clear DOM
      (0, _clearDOM.default)(); //find selected mood and filter

      const mood = event.target.value;

      _entryManager.default.getEntries().then(res => res.json()).then(entries => {
        const filteredEntries = entries.filter(entry => entry.mood === mood);
        filteredEntries.forEach(entry => {
          const newHTML = _createHTML.default.createJournalHTML(entry);

          (0, _addToDOM.default)(newHTML);
          const clearButton = document.querySelector("#clear_button");

          if (clearButton) {
            clearButton.style.display = "initial";
          } else {
            _createHTML.default.createClearButton();

            eventListeners.clearButtonListener();
          }
        });
      });
    });
  }
};
var _default = eventListeners;
exports.default = _default;

},{"./addToDOM":1,"./clearDOM":2,"./createHTML":3,"./createObject":4,"./entryManager":5}],7:[function(require,module,exports){
"use strict";

var _eventListeners = _interopRequireDefault(require("./eventListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventListeners.default.showButtonListener();

_eventListeners.default.saveButtonListener();

_eventListeners.default.radioButtonListener();

},{"./eventListeners":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FkZFRvRE9NLmpzIiwiLi4vc2NyaXB0cy9jbGVhckRPTS5qcyIsIi4uL3NjcmlwdHMvY3JlYXRlSFRNTC5qcyIsIi4uL3NjcmlwdHMvY3JlYXRlT2JqZWN0LmpzIiwiLi4vc2NyaXB0cy9lbnRyeU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2V2ZW50TGlzdGVuZXJzLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBLE1BQU0sUUFBUSxHQUFJLFdBQUQsSUFBaUI7QUFDaEMsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxTQUFyQyxJQUFrRCxXQUFsRDtBQUNELENBRkQ7O2VBR2UsUTs7Ozs7Ozs7Ozs7QUNIZixNQUFNLFFBQVEsR0FBRyxNQUFNO0FBQ3JCLFNBQU8sU0FBUyxDQUFDLFVBQWpCLEVBQTZCO0FBQzNCLElBQUEsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsU0FBUyxDQUFDLFVBQWhDO0FBQ0Q7QUFDRixDQUpEOztlQUtlLFE7Ozs7Ozs7Ozs7QUNMZixNQUFNLFVBQVUsR0FBRztBQUVqQixFQUFBLGlCQUFpQixFQUFFLE1BQU07QUFDdkIsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxXQUFWLEdBQXdCLGVBQXhCO0FBQ0EsSUFBQSxTQUFTLENBQUMsWUFBVixDQUF1QixJQUF2QixFQUE2QixjQUE3QjtBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFdBQTVDLENBQXdELFNBQXhEO0FBQ0QsR0FQZ0I7QUFRakIsRUFBQSxpQkFBaUIsRUFBRyxLQUFELElBQVc7QUFDNUIsV0FBUTs7O01BR04sS0FBSyxDQUFDLEtBQU07OztLQUdiLEtBQUssQ0FBQyxJQUFLOzs7S0FH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QkFBVyxpQkFBWCxDQUE2QixLQUE3QixDQUFoQjs7QUFDQSxpQ0FBUyxPQUFUO0FBQ0EsZ0JBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLENBQXBCOztBQUNBLGNBQUksV0FBSixFQUFpQjtBQUNmLFlBQUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsT0FBbEIsR0FBNEIsU0FBNUI7QUFDRCxXQUZELE1BRU87QUFDTCxnQ0FBVyxpQkFBWDs7QUFDQSxZQUFBLGNBQWMsQ0FBQyxtQkFBZjtBQUNEO0FBQ0YsU0FWRDtBQVdELE9BZkg7QUFnQkQsS0FyQkQ7QUFzQkQ7QUFwRW9CLENBQXZCO2VBc0VlLGM7Ozs7OztBQ2xGZjs7OztBQUNBLHdCQUFlLGtCQUFmOztBQUNBLHdCQUFlLGtCQUFmOztBQUNBLHdCQUFlLG1CQUFmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYWRkVG9ET00gPSAoZW50cnlBc0h0bWwpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhaW5lclwiKS5pbm5lckhUTUwgKz0gZW50cnlBc0h0bWxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBhZGRUb0RPTSIsImNvbnN0IGNsZWFyRE9NID0gKCkgPT4ge1xyXG4gIHdoaWxlIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5maXJzdENoaWxkKVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGVhckRPTSIsImNvbnN0IGNyZWF0ZUhUTUwgPSB7XHJcblxyXG4gIGNyZWF0ZUNsZWFyQnV0dG9uOiAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBuZXdCdXR0b24udGV4dENvbnRlbnQgPSBcIkNsZWFyIEVudHJpZXNcIlxyXG4gICAgbmV3QnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2xlYXJfYnV0dG9uXCIpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J1dHRvbl9jb250YWluZXJcIikuYXBwZW5kQ2hpbGQobmV3QnV0dG9uKVxyXG4gIH0sXHJcbiAgY3JlYXRlSm91cm5hbEhUTUw6IChlbnRyeSkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuPGFydGljbGUgY2xhc3MgPSBcImpvdXJuYWxFbnRyeVwiPiAgICAgICAgIFxyXG48c2VjdGlvbiBjbGFzcyA9IFwidGl0bGVcIj5cclxuPGgzPiR7ZW50cnkudGl0bGV9PC9oMz5cclxuPC9zZWN0aW9uPlxyXG48c2VjdGlvbiBjbGFzcyA9IFwiZGF0ZVwiPlxyXG48cD4ke2VudHJ5LmRhdGV9PC9wPlxyXG48L3NlY3Rpb24+XHJcbjxzZWN0aW9uIGNsYXNzID0gXCJ0ZXh0XCI+XHJcbjxwPiR7ZW50cnkudGV4dH08L3A+XHJcbjwvc2VjdGlvbj5cclxuPHNlY3Rpb24gY2xhc3MgPSBcIm1vb2RcIj5cclxuPHA+bW9vZDogJHtlbnRyeS5tb29kfTwvcD5cclxuPC9zZWN0aW9uPlxyXG5gXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUhUTUwiLCJjb25zdCBjcmVhdGVPYmplY3QgPSAodGV4dCwgdGl0bGUsIGVtb3Rpb24sIG9iamVjdERhdGUpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgZGF0ZTogb2JqZWN0RGF0ZSxcclxuICAgIG1vb2Q6IGVtb3Rpb24sXHJcbiAgICB0ZXh0OiB0ZXh0XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVPYmplY3QiLCJjb25zdCBlbnRyeU1hbmFnZXIgPSB7XHJcbiAgICBnZXRFbnRyaWVzOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDg4L2VudHJpZXNcIilcclxuICAgIH0sXHJcblxyXG4gICAgcG9zdEVudHJ5OiAoZW50cnlPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjgwODgvZW50cmllc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVudHJ5T2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBlbnRyeU1hbmFnZXIiLCJpbXBvcnQgY3JlYXRlSFRNTCBmcm9tIFwiLi9jcmVhdGVIVE1MXCJcclxuaW1wb3J0IGFkZFRvRE9NIGZyb20gXCIuL2FkZFRvRE9NXCJcclxuaW1wb3J0IGVudHJ5TWFuYWdlciBmcm9tIFwiLi9lbnRyeU1hbmFnZXJcIlxyXG5pbXBvcnQgY3JlYXRlT2JqZWN0IGZyb20gXCIuL2NyZWF0ZU9iamVjdFwiXHJcbmltcG9ydCBjbGVhckRPTSBmcm9tIFwiLi9jbGVhckRPTVwiXHJcblxyXG5jb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlX2J1dHRvblwiKVxyXG5jb25zdCBzaG93QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaG93X2J1dHRvblwiKVxyXG5jb25zdCByYWRpb0J1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JhZGlvX2J1dHRvbnNcIilcclxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIilcclxuY29uc29sZS5sb2coY29udGFpbmVyKVxyXG5cclxuY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB7XHJcbiAgY2xlYXJCdXR0b25MaXN0ZW5lcjogKCkgPT4ge1xyXG4gICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsZWFyX2J1dHRvblwiKVxyXG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgY2xlYXJET00oKVxyXG4gICAgICBjbGVhckJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93QnV0dG9uTGlzdGVuZXI6ICgpID0+IHtcclxuICAgIHNob3dCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgZW50cnlNYW5hZ2VyLmdldEVudHJpZXMoKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGpvdXJuYWxFbnRyaWVzID0+IHtcclxuICAgICAgICAgIGNsZWFyRE9NKClcclxuICAgICAgICAgIGpvdXJuYWxFbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBodG1sID0gY3JlYXRlSFRNTC5jcmVhdGVKb3VybmFsSFRNTChlbnRyeSlcclxuICAgICAgICAgICAgYWRkVG9ET00oaHRtbClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xlYXJfYnV0dG9uXCIpXHJcbiAgICAgICAgICBpZiAoY2xlYXJCdXR0b24pIHtcclxuICAgICAgICAgICAgY2xlYXJCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiaW5pdGlhbFwiXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjcmVhdGVIVE1MLmNyZWF0ZUNsZWFyQnV0dG9uKClcclxuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcnMuY2xlYXJCdXR0b25MaXN0ZW5lcigpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIClcclxuICB9LFxyXG4gIHNhdmVCdXR0b25MaXN0ZW5lcjogKCkgPT4ge1xyXG4gICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGV4dGFyZWFcIilcclxuICAgICAgY29uc3QgY29uY2VwdHNDb3ZlcmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIilcclxuICAgICAgY29uc3QgZW1vdGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Vtb3Rpb25MaXN0XCIpXHJcbiAgICAgIGNvbnN0IGlucHV0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIilcclxuICAgICAgY29uc3QgdGV4dCA9IHRleHRhcmVhLnZhbHVlXHJcbiAgICAgIGNvbnN0IHRpdGxlID0gY29uY2VwdHNDb3ZlcmVkLnZhbHVlXHJcbiAgICAgIGNvbnN0IG1vb2QgPSBlbW90aW9uTGlzdC52YWx1ZVxyXG4gICAgICBjb25zdCBvYmplY3REYXRlID0gaW5wdXREYXRlLnZhbHVlXHJcbiAgICAgIGNvbnN0IG5ld09iamVjdCA9IGNyZWF0ZU9iamVjdCh0ZXh0LCB0aXRsZSwgbW9vZCwgb2JqZWN0RGF0ZSlcclxuICAgICAgZW50cnlNYW5hZ2VyLnBvc3RFbnRyeShuZXdPYmplY3QpXHJcbiAgICAgIGNvbnN0IG5ld0hUTUwgPSBjcmVhdGVIVE1MLmNyZWF0ZUpvdXJuYWxIVE1MKG5ld09iamVjdClcclxuICAgICAgYWRkVG9ET00obmV3SFRNTClcclxuICAgIH0pXHJcbiAgfSxcclxuICByYWRpb0J1dHRvbkxpc3RlbmVyOiAoKSA9PiB7XHJcbiAgICByYWRpb0J1dHRvbnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAvL2NsZWFyIERPTVxyXG4gICAgICBjbGVhckRPTSgpXHJcbiAgICAgIC8vZmluZCBzZWxlY3RlZCBtb29kIGFuZCBmaWx0ZXJcclxuICAgICAgY29uc3QgbW9vZCA9IGV2ZW50LnRhcmdldC52YWx1ZVxyXG4gICAgICBlbnRyeU1hbmFnZXIuZ2V0RW50cmllcygpXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZW50cmllcyA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZEVudHJpZXMgPSBlbnRyaWVzLmZpbHRlcihlbnRyeSA9PiBlbnRyeS5tb29kID09PSBtb29kKVxyXG4gICAgICAgICAgZmlsdGVyZWRFbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0hUTUwgPSBjcmVhdGVIVE1MLmNyZWF0ZUpvdXJuYWxIVE1MKGVudHJ5KVxyXG4gICAgICAgICAgICBhZGRUb0RPTShuZXdIVE1MKVxyXG4gICAgICAgICAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xlYXJfYnV0dG9uXCIpXHJcbiAgICAgICAgICAgIGlmIChjbGVhckJ1dHRvbikge1xyXG4gICAgICAgICAgICAgIGNsZWFyQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImluaXRpYWxcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNyZWF0ZUhUTUwuY3JlYXRlQ2xlYXJCdXR0b24oKVxyXG4gICAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLmNsZWFyQnV0dG9uTGlzdGVuZXIoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBldmVudExpc3RlbmVyc1xyXG4iLCJpbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnNcIlxyXG5ldmVudExpc3RlbmVycy5zaG93QnV0dG9uTGlzdGVuZXIoKVxyXG5ldmVudExpc3RlbmVycy5zYXZlQnV0dG9uTGlzdGVuZXIoKVxyXG5ldmVudExpc3RlbmVycy5yYWRpb0J1dHRvbkxpc3RlbmVyKClcclxuIl19
