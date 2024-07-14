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
<a ${skill.cert_link ? `data-tooltip-target="tooltip-target-${skill.id}" href="${skill.cert_link}"` : ''} target="_blank" class="flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300 cursor-pointer" tabindex="0" aria-label="${skill.name}">
    <i class="${skill.icon} fa-3x text-main-500"></i>${skill.name}
</a>
${skill.cert_link ? createTooltip(skill.name, skill.cert_desc, skill.cert_link, skill.id) : ''}
`;

const createTooltip = (name, desc, link, certId) => `
<div id="tooltip-target-${certId}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium transition-opacity duration-300 bg-white border rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 dark:border-gray-600">
    <div><span class="text-main-500">Certificate Name:</span> ${desc}</div>
    <div><span class="text-main-500">Detail:</span> ${link}</div>
    <div class="tooltip-arrow" data-popper-arrow></div>
</div>
`;

export {createSkeletonSkill, createSkill};
