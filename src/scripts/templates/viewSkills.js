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
<div ${skill.cert_link ? `data-popover-target="popover-target-${skill.id}"` : ''} class="flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300 cursor-pointer" tabindex="0" aria-label="${skill.name}">
    <i class="${skill.icon} fa-3x text-main-500"></i>${skill.name}
</div>
`;

const createPopover = (skill) => `
<div data-popover id="popover-target-${skill.id}" role="tooltip" class="absolute z-10 invisible inline-block skill-box w-3/4 sm:w-1/2 md:3/5 lg:max-w-sm p-3 md:p-4 text-sm font-medium transition-opacity duration-300 bg-white border rounded-lg shadow-sm opacity-0 dark:bg-gray-800 dark:border-gray-600 dark:hover:border-main-300 ease-in-out">
    <a ${skill.cert_link ? `href="${skill.cert_link}" target="_blank"` : ''} class="flex items-center justify-center mb-2 md:mb-3 bg-gray-300 rounded dark:bg-gray-700">
        ${skill.cert_img ? `<img class="lazyload rounded" data-src="${skill.cert_img}" alt="${skill.cert_desc}" />` : ''}
        <svg class="animate-pulse w-10 h-10 my-12 sm:my-20 md:my-24 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
        </svg>
    </a>
    <p class="font-normal text-center text-primary-desc dark:text-secondary-desc truncate ...">${skill.cert_desc}</p>
    <div data-popper-arrow></div>
</div>
`;

export {createSkeletonSkill, createSkill, createPopover};
