const emptyGuestbook = () => 'Belum ada pengunjung yang Nitip Pesan, Jadilah yang Pertama!';

const createGuestbook = (guest, link) => `
<div class="max-w-md text-start flex flex-col justify-between skill-box bg-primary dark:bg-secondary-nav text-primary-font dark:text-secondary-font rounded-lg cursor-pointer guest-box p-5">
    <div>
        <div class="flex items-center">
            <i class="fa-brands fa-${guest.platform} fa-3x text-main-500"></i>
            <h5 class="text-lg font-semibold uppercase ps-2.5" tabindex="0">${guest.name}</h5>
        </div>
        <div class="pt-2.5 ps-5"><q class="elipsis font-normal" tabindex="0">${guest.message}</q></div>
    </div>
    <div>
        <div class="text-main-500 font-normal guest-link my-2.5">
            <a href="${link + guest.username}" target="_blank" class="py-3">@${guest.username}</a>
        </div>
        <div class="text-main-gray uppercase tracking-widest text-xs">${new Date(guest.updated_at).toGMTString('id-ID')}</div>
    </div>
</div>
`;
export {emptyGuestbook, createGuestbook};
