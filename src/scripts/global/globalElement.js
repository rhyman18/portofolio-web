/**
 * Centralized DOM lookups used across modules to avoid repeated selectors.
 */
const GLOBAL_ELEMENT = {
  MyBar: document.querySelector('#myBar'),

  Headline: document.querySelector('#headline-pesan'),
  Profile: document.querySelector('#profile-pesan'),

  SkillBasic: document.querySelector('#skill-dasar'),
  SkillFrontend: document.querySelector('#skill-frontend'),
  SkillBackend: document.querySelector('#skill-backend'),
  SkillPopover: document.querySelector('#popover-container'),

  Projects: document.querySelector('#post'),
  ProjectsPagination: document.querySelector('#post-pagination'),

  GuestbookContainer: document.querySelector('#guestbook'),
  GuestbookPagination: document.querySelector('#guestbook-pagination'),
  GuestbookForm: document.querySelector('#inputGuest'),
  InputName: document.querySelector('#name'),
  InputUsername: document.querySelector('#username'),
  InputPlatform: document.querySelector('#platform'),
  InputMessage: document.querySelector('#message'),
  InputButton: document.querySelector('#send'),
  InputNameAlert: document.querySelector('#name-alert'),
  InputUsernameAlert: document.querySelector('#username-alert'),
  InputMessageAlert: document.querySelector('#message-alert'),
  ToastSuccess: document.querySelector('#toast-success'),
  ToastFailed: document.querySelector('#toast-danger'),

  AlertBody: document.querySelector('#alert-body'),
  AlertMessage: document.querySelector('#alert-msg'),

  ToggleDarkIcon: document.querySelector('#theme-toggle-dark-icon'),
  ToggleLightIcon: document.querySelector('#theme-toggle-light-icon'),
  DividerLight: document.querySelector('#shape-divider-light'),
  DividerDark: document.querySelector('#shape-divider-dark'),
  ThemeToggle: document.querySelector('#theme-toggle'),
};

export default GLOBAL_ELEMENT;
