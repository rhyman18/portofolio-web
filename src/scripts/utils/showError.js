const ShowError = {
  init({containerAlert, bodyAlert, messageAlert}) {
    this._containerAlert = containerAlert;
    this._bodyAlert = bodyAlert;
    this._messageAlert = messageAlert;

    if (!containerAlert.classList.contains('hidden')) {
      return;
    }

    this._showAlertMessage();
    this._showAlertListeners();
  },

  _showAlertMessage() {
    this._bodyAlert.innerHTML = this._messageAlert;
  },

  _showAlertListeners() {
    this._containerAlert.classList.remove('hidden');
    this._containerAlert.classList.add('flex');
    this._containerAlert.classList.add('items-center');
  },
};

export default ShowError;
