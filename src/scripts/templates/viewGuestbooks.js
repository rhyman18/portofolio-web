import formatDate from '../utils/formatDate';
import platformIcons from '../global/platformIcons';

/**
 * Template for the empty state when no guestbook entries exist.
 * @return {string} HTML string
 */
const emptyGuestbook = () => 'Belum ada pengunjung yang Nitip Pesan, Jadilah yang Pertama!';

/**
 * Render a single guestbook entry as HTML.
 * Falls back to initials badge when platform icon is unavailable.
 * @param {object} guest Guestbook payload
 * @param {string} guest.platform Platform key for icon lookup
 * @param {string} guest.name Display name
 * @param {string} guest.message Guest message content
 * @param {string} guest.username Platform username
 * @param {string|Date} guest.updated_at Timestamp for display
 * @param {string} link Base URL prefix to the user profile (e.g., https://github.com/)
 * @return {string} HTML string for the guest card
 */
const createGuestbook = (guest, link) => `
<div class="max-w-md text-start flex flex-col justify-between skill-box bg-primary dark:bg-secondary-nav text-primary-font dark:text-secondary-font rounded-lg cursor-pointer guest-box p-5">
    <div>
        <div class="flex items-center">
            ${(platformIcons[guest.platform] || `<div data-icon="fallback" class="w-8 h-8 rounded-full bg-main-100 text-main-500 flex items-center justify-center uppercase font-semibold">${(guest.platform || '?').slice(0, 2)}</div>`)}
            <div class="text-lg font-semibold uppercase ps-2.5" tabindex="0">${guest.name}</div>
        </div>
        <div class="pt-2.5 ps-5"><q class="elipsis font-normal" tabindex="0">${guest.message}</q></div>
    </div>
    <div>
        <div class="text-main-500 font-normal guest-link my-2.5">
            <a href="${link + guest.username}" target="_blank" class="py-3">@${guest.username}</a>
        </div>
        <div class="text-main-gray uppercase tracking-widest text-xs">${formatDate(guest.updated_at)}</div>
    </div>
</div>
`;
export {emptyGuestbook, createGuestbook};
