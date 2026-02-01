import formatDate from '../utils/formatDate';

const emptyGuestbook = () => 'Belum ada pengunjung yang Nitip Pesan, Jadilah yang Pertama!';

const platformIcons = {
  github: '<svg data-icon="github" class="w-8 h-8 text-main-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1 .11-.78.42-1.32.76-1.62-2.66-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z"/></svg>',
  linkedin: '<svg data-icon="linkedin" class="w-8 h-8 text-main-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.18c0-1.24-.02-2.83-1.73-2.83-1.74 0-2.01 1.36-2.01 2.74v5.27H9.59V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.56V9h3.56v11.45Z"/></svg>',
  facebook: '<svg data-icon="facebook" class="w-8 h-8 text-main-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.57 9.88v-6.99H7.9V12h2.53V9.79c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>',
  twitter: '<svg data-icon="twitter" class="w-8 h-8 text-main-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.54 6.07a4.13 4.13 0 0 1-1.78.2 3.08 3.08 0 0 0 1.36-1.7 6.2 6.2 0 0 1-2.02.77 3.08 3.08 0 0 0-5.4 2.1c0 .24.03.48.08.7a8.72 8.72 0 0 1-6.33-3.2 3.08 3.08 0 0 0 .95 4.11 3.07 3.07 0 0 1-1.39-.39v.04a3.08 3.08 0 0 0 2.47 3.02 3.1 3.1 0 0 1-1.39.05 3.08 3.08 0 0 0 2.88 2.14A6.2 6.2 0 0 1 3 17.26a8.76 8.76 0 0 0 4.74 1.39c5.69 0 8.8-4.71 8.8-8.8l-.01-.4a6.3 6.3 0 0 0 1.54-1.6Z"/></svg>',
  instagram: '<svg data-icon="instagram" class="w-8 h-8 text-main-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm11.25 1.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-6.25 1a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/></svg>',
  tiktok: '<svg data-icon="tiktok" class="w-8 h-8 text-main-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.82 6.4a4.9 4.9 0 0 1-.38-2.18h-2.4v10.37a2.3 2.3 0 1 1-2.3-2.3c.26 0 .5.04.73.12V9.9a4.7 4.7 0 0 0-.73-.06 4.7 4.7 0 1 0 4.7 4.7V8.74a7.2 7.2 0 0 0 4.38 1.46V7.8c-.9 0-1.77-.27-2.49-.75a4.8 4.8 0 0 1-1.24-1.65Z"/></svg>',
  whatsapp: '<svg data-icon="whatsapp" class="w-8 h-8 text-main-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.47 3.53a11 11 0 0 0-17.4 12.2L2 22l6.4-1a11 11 0 0 0 5.1 1.3h.02A11 11 0 0 0 20.47 3.53ZM13.5 20a9 9 0 0 1-4.58-1.24l-.33-.19-3.8.6.62-3.7-.2-.35A9 9 0 1 1 13.5 20Zm3.05-6.45c-.17-.08-1-.5-1.15-.56-.16-.06-.27-.08-.38.08-.1.17-.44.56-.54.67-.1.12-.2.13-.37.05-.17-.08-.71-.26-1.35-.83-.5-.45-.84-.99-.94-1.16-.1-.17-.01-.26.07-.34l.2-.25c.08-.1.1-.17.15-.29.05-.12.02-.22-.03-.3-.05-.08-.38-.91-.52-1.25-.14-.34-.28-.28-.38-.29l-.32-.01c-.12 0-.32.05-.48.23-.16.17-.61.6-.61 1.47 0 .86.63 1.7.72 1.82.1.12 1.24 1.9 3.02 2.66.42.18.74.29 1 .37.43.14.82.12 1.13.07.35-.05 1-.41 1.14-.8.14-.39.14-.73.1-.8-.03-.07-.15-.12-.32-.2Z"/></svg>',
};

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
