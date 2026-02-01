const createSkeletonSkill = () => `
<div role="status" class="animate-pulse flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 rounded py-8 tracking-widest dark:shadow-main-500 ease-in-out duration-300" tabindex="0" aria-label="failed fetch skills">
    <div class="w-12 h-12 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    <span class="h-3 mx-12 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
</div>
<div role="status" class="animate-pulse flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 rounded py-8 tracking-widest dark:shadow-main-500 ease-in-out duration-300">
    <div class="w-12 h-12 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    <span class="h-3 mx-12 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
</div>
<div role="status" class="animate-pulse flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 rounded py-8 tracking-widest dark:shadow-main-500 ease-in-out duration-300">
    <div class="w-12 h-12 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    <span class="h-3 mx-12 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
</div>
`;

const FALLBACK_SVG = '<svg aria-hidden="true" class="w-12 h-12 text-main-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 240C302.3 240 288 254.3 288 272C288 285.3 277.3 296 264 296C250.7 296 240 285.3 240 272C240 227.8 275.8 192 320 192C364.2 192 400 227.8 400 272C400 319.2 364 339.2 344 346.5L344 350.3C344 363.6 333.3 374.3 320 374.3C306.7 374.3 296 363.6 296 350.3L296 342.2C296 321.7 310.8 307 326.1 302C332.5 299.9 339.3 296.5 344.3 291.7C348.6 287.5 352 281.7 352 272.1C352 254.4 337.7 240.1 320 240.1zM288 432C288 414.3 302.3 400 320 400C337.7 400 352 414.3 352 432C352 449.7 337.7 464 320 464C302.3 464 288 449.7 288 432z"/></svg>';

const createSkill = (skill) => `
<div ${skill.cert_link ? `data-popover-target="popover-target-${skill.id}"` : ''} class="flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover-border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300 cursor-pointer" tabindex="0" aria-label="${skill.name}">
    <div class="skill-icon w-14 h-14 mx-auto flex items-center justify-center text-main-500">
        ${skill.icon || FALLBACK_SVG}
    </div>${skill.name}
</div>
`;

const createPopover = (skill) => `
<div data-popover id="popover-target-${skill.id}" role="tooltip" class="absolute z-10 invisible inline-block skill-box w-3/4 sm:w-1/2 md:3/5 lg:max-w-sm p-3 md:p-4 text-sm font-medium transition-opacity duration-300 bg-white border rounded-lg shadow-sm opacity-0 dark:bg-gray-800 dark:border-gray-600 dark:hover:border-main-300 ease-in-out">
    <a ${skill.cert_link ? `href="${skill.cert_link}" target="_blank"` : ''} class="flex items-center justify-center mb-2 md:mb-3 bg-gray-300 rounded dark:bg-gray-700">
        ${skill.cert_img ? `<img class="lazyload rounded" data-src="${skill.cert_img}" alt="" />` : ''}
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
