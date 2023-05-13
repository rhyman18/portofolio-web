const createSkeletonProject = () => `
<div class="left-bg md:border-e-2 border-main-500" role="status">
    <article data-aos="zoom-in-right" class="animate-pulse flex flex-col md:me-4 lg:me-8 xl:flex-row xl:pe-6 text-left items-stretch xl:gap-5 border dark:border-gray-600 rounded dark:shadow-main-500 bg-primary dark:bg-secondary-com">
        <div class="xl:basis-1/3 h-60 md:h-96 xl:h-60 flex justify-center items-center bg-gray-300 dark:bg-gray-700">
            <svg class="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
        </div>
        <div class="basis-2/3 flex flex-col justify-center font-medium xl:my-4 p-6 xl:p-0">
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            <div class="flex items-center w-full space-x-2 max-w-[360px] my-6">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
    </article>
</div>
<div class="right-bg md:border-s-2 border-main-500" role="status">
    <article data-aos="zoom-in-left" class="animate-pulse flex flex-col xl:flex-row-reverse md:ms-4 lg:ms-8 xl:ps-6 text-left items-stretch xl:gap-5 border dark:border-gray-600 rounded dark:shadow-main-500 bg-primary dark:bg-secondary-com">
        <div class="xl:basis-1/3 h-60 md:h-96 xl:h-60 flex justify-center items-center bg-gray-300 dark:bg-gray-700">
            <svg class="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
        </div>
        <div class="basis-2/3 flex flex-col justify-center font-medium xl:my-4 p-6 xl:p-0">
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            <div class="flex items-center w-full space-x-2 max-w-[360px] my-6">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
    </article>
</div>
`;

export {createSkeletonProject};
