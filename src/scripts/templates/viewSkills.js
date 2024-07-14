import CONFIG from '../global/config';

const createSkeletonSkill = () => `
<div role="status" class="animate-pulse flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 rounded py-8 tracking-widest dark:shadow-main-500 ease-in-out duration-300" tabindex="0" aria-label="failed fetch skills">
    <i class="fa-solid fa-square fa-3x text-gray-200 dark:text-gray-700 animate-pulse"></i>
    <span class="h-3 mx-12 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
</div>
<div role="status" class="animate-pulse flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 rounded py-8 tracking-widest dark:shadow-main-500 ease-in-out duration-300">
    <i class="fa-solid fa-square fa-3x text-gray-200 dark:text-gray-700 animate-pulse"></i>
    <span class="h-3 mx-12 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
</div>
<div role="status" class="animate-pulse flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 rounded py-8 tracking-widest dark:shadow-main-500 ease-in-out duration-300">
    <i class="fa-solid fa-square fa-3x text-gray-200 dark:text-gray-700 animate-pulse"></i>
    <span class="h-3 mx-12 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
</div>
`;

const createSkill = (skill) => `
<a
  ${skill.cert_link ? `data-tooltip-target="tooltip-target-${skill.id}" href="${skill.cert_link}"` : ''}
  target="_blank" class="flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300 cursor-pointer" tabindex="0" aria-label="${skill.name}"
>
    <i class="${skill.icon} fa-3x text-main-500"></i>${skill.name}
</a>
${skill.cert_link ? createTooltip(skill.cert_img, skill.cert_desc, skill.id) : ''}
`;

const createTooltip = (img, desc, certId) => `
<div id="tooltip-target-${certId}" role="tooltip" class="tooltip max-w-sm p-3 md:p-4 text-sm font-medium transition-opacity duration-300 bg-white border rounded-lg shadow-sm opacity-0 dark:bg-gray-800 dark:border-gray-600">
${
  img ?
    `<div class="flex items-center justify-center w-full mb-2 md:mb-3">
        <img class="lazyload rounded" data-src="${CONFIG.BASE_IMG_URL + img}" />
    </div>` :
    `<div class="flex items-center animate-pulse justify-center h-48 mb-2 md:mb-3 bg-gray-300 rounded dark:bg-gray-700">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
        </svg>
    </div>`
}
    <p class="font-normal text-primary-desc dark:text-secondary-desc truncate ...">${desc}</p>
    <div class="tooltip-arrow" data-popper-arrow></div>
</div>
`;

export {createSkeletonSkill, createSkill};
