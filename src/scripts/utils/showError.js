const ShowError = {
  init({containerAlert, bodyAlert, messageAlert, alertPriority = 0}) {
    this._containerAlert = containerAlert;
    this._bodyAlert = bodyAlert;
    this._messageAlert = messageAlert;
    this._checkAlertPriority = containerAlert.getAttribute('alert-priority') ?? 0;
    this._alertPriority = alertPriority;

    this._eventAlertLIstener();
  },

  _eventAlertLIstener() {
    if (this._containerAlert.classList.contains('hidden')) {
      this._showAlertBody();
    }

    if (this._alertPriority > this._checkAlertPriority) {
      this._showAlertMessage();
    }
  },

  _showAlertMessage() {
    this._bodyAlert.innerHTML = this._messageAlert;
  },

  _showAlertBody() {
    this._containerAlert.classList.remove('hidden');
    this._containerAlert.classList.add('flex', 'items-center', 'masuk');
    this._containerAlert.setAttribute('alert-priority', this._alertPriority);
  },
};

export default ShowError;
