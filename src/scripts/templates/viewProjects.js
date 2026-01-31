const createSkeletonProject = () => `
<div class="left-bg md:border-e-2 border-main-500" role="status" tabindex="0" aria-label="failed fetch projects">
    <article data-aos="zoom-in-right" class="animate-pulse flex flex-col md:me-4 lg:me-8 xl:flex-row xl:pe-6 text-left items-stretch xl:gap-5 border dark:border-gray-600 rounded dark:shadow-main-500 bg-primary dark:bg-secondary-com">
        <div class="xl:basis-1/3 h-60 md:h-96 xl:h-60 flex justify-center items-center bg-gray-300 dark:bg-gray-700">
            <svg class="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
        </div>
        <div class="basis-2/3 flex flex-col justify-center xl:my-4 p-6 xl:p-0">
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
        <div class="basis-2/3 flex flex-col justify-center xl:my-4 p-6 xl:p-0">
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

const createProject = (project, i) => `
<div class="${(i % 2 === 0) ? 'left-bg md:border-e-2 border-main-500' : 'right-bg md:border-s-2 border-main-500'}">
    <article data-aos="zoom-in-${(i % 2 === 0) ? 'right' : 'left'}" class="flex flex-col ${(i % 2 === 0) ? 'md:me-4 lg:me-8 xl:flex-row xl:pe-6' : 'xl:flex-row-reverse md:ms-4 lg:ms-8 xl:ps-6'} text-left items-stretch xl:gap-5 content-box border dark:border-gray-600 dark:hover:border-main-300 rounded dark:shadow-main-500 bg-primary dark:bg-secondary-com">
        <div class="overflow-hidden xl:basis-1/3 h-60 md:h-96 xl:h-auto">
            ${(project.url ?
                `<a href="${project.url}" target="_blank" tabindex="-1" class="img-project-zoom h-full flex justify-center items-center">` :
                `<div class="img-project-zoom h-full flex justify-center items-center cursor-pointer">`
  )}
                <img class="lazyload" data-src="${project.img}" id="postimg-${i}" alt="" />
                <svg class="animate-pulse w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                </svg>
                <div class="text-preview absolute inset-0 flex justify-center items-center text-white text-lg opacity-0">Preview</div>
            ${(project.url ? `</a>` : `</div>`)}
        </div>
        <div class="basis-2/3 xl:my-4 p-6 xl:p-0">
            <div class="text-lg md:text-xl font-semibold tracking-widest leading-tight">
                ${(project.url ?
                    `<a href="${project.url}" target="_blank" class="hover:text-main-500 py-2.5">${project.title}</a>` :
                    `<div class="hover:text-main-500 py-2.5 cursor-pointer">${project.title}</div>`
  )}
            </div>
            <div class="uppercase text-xs tracking-widest text-secondary-font font-normal my-4 flex flex-wrap gap-1 md:gap-3">
                ${project.repo ? `<a href="${project.repo}" class="bg-main-gray hover:bg-main-500 py-1 md:py-1.5 px-4 md:px-6" target="_blank">git</a>` : ''}
                ${(() => {
    const tags = Array.isArray(project.tags) ? project.tags : JSON.parse(project.tags || '[]');
    return tags.map((tag) => `<span class="bg-main-500 py-1 md:py-1.5 px-4 md:px-6" tabindex="0">${tag}</span>`).join('');
  })()}
            </div>
            <p class="leading-5 md:leading-7 text-primary-desc dark:text-secondary-desc text-justify font-normal mb-4 elipsis" tabindex="0">${project.desc}</p>
            <p class="text-main-gray text-xs font-normal uppercase tracking-widest" tabindex="0">${project.updated_at}</p>
        </div>
    </article>
</div>
`;

export {createSkeletonProject, createProject};
