let ControllerMixin = {
  createAndSendRequest: function(url, method, options={ type: null, id: null, formData: null }) {
    const requestHeaderName = 'Content-Type';
    const requestHeaderValue = 'application/x-www-form-urlencoded';
    let xhr = new XMLHttpRequest();

    switch (options.type) {
      case 'getAllContacts': {
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.send();
        break;
      }
      case 'getContactById': {
        xhr.open(method, `${url}/${options.id}`);
        xhr.responseType = 'json';
        xhr.send();
        break;
      }
      case 'addContact': {
        xhr.open(method, url);
        xhr.setRequestHeader(requestHeaderName, requestHeaderValue);
        xhr.responseType = 'json';
        xhr.send(options.formData);
        break;
      }
      case 'updateContact': {
        xhr.open(method, `${url}/${options.id}`);
        xhr.setRequestHeader(requestHeaderName, requestHeaderValue);
        xhr.responseType = 'json';
        xhr.send(options.formData);
        break;
      }
      default: {
        xhr.open(method, `${url}/${options.id}`);
        xhr.send();
      }
    }
    return xhr;
  },
}

export { ControllerMixin };