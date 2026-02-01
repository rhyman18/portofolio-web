/**
 * Lightweight alert helper to display prioritized error banners.
 */
const ShowError = {
  /**
   * Initialize the alert with DOM refs and desired priority.
   * @param {object} params
   * @param {HTMLElement} params.containerAlert Wrapper element that holds the alert.
   * @param {HTMLElement} params.bodyAlert Element where message text is injected.
   * @param {string} params.messageAlert Message to show.
   * @param {number} [params.alertPriority=0] Higher number overrides lower-priority alerts.
   * @return {void}
   */
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
