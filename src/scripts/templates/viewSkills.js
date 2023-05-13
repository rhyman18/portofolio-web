const createSkeletonSkill = () => `
<div role="status" class="animate-pulse flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 rounded py-8 tracking-widest dark:shadow-main-500 ease-in-out duration-300">
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
<div class="flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300 cursor-pointer">
    <i class="${skill.icon} fa-3x text-main-500"></i>${skill.name}
</div>
`;

export {createSkeletonSkill, createSkill};
