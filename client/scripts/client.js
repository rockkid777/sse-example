function onMessage(list, e) {
  var payLoad = JSON.parse(e.data);
  if (payLoad.type === "message") {
    displayMessage(list, payLoad.message);
  }
}

function displayMessage(list, message) {
  var msgItem = document.createElement('div');
  var contentItem = document.createElement('div');
  var authorItem = document.createElement('div');
  var textItem = document.createElement('div');

  msgItem.classList.add('comment');
  contentItem.classList.add('contet');
  authorItem.classList.add('author');
  textItem.classList.add('text');

  authorItem.innerHTML = message.author;
  textItem.innerHTML = message.text;

  contentItem.appendChild(authorItem);
  contentItem.appendChild(textItem);
  msgItem.appendChild(contentItem);
  list.appendChild(msgItem);
}

function sendMessage(url, authorItem, textItem) {
  var author = authorItem.value.trim();
  var text = textItem.value.trim();
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', url);
  xhttp.setRequestHeader('content-type', 'application/json;charset=UTF-8');
  xhttp.send(JSON.stringify({'author': author, 'text': text}));
}

function init() {
  const evtSource = new EventSource("http://localhost:8081/events")
  var list = document.getElementById('messages');

  var sendBtn = document.getElementById('send');
  var textItem = document.getElementById('message');
  var authorItem = document.getElementById('name');
  var url = 'http://localhost:8080/msgRequest';

  evtSource.onmessage = onMessage.bind(this, list);
  sendBtn.addEventListener(
    'click'
    , sendMessage.bind(this, url, authorItem, textItem)
  );
}

window.addEventListener('load', init);
