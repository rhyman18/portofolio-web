import {project} from '/src/assets/data/project';

// Post Project
const containerProject = document.getElementById('post');
let j = 1;

const dataProject = await project();

if (dataProject.data.length > 0) {
  document.getElementById('skeleton-project').style.display = 'none';
}

dataProject.data.forEach(function(project, i) {
  const createProject = document.createElement('a');
  let tags = '';

  for (const item of JSON.parse(project.tags)) {
    tags += `<span class="bg-main-500 py-1 md:py-1.5 px-4 md:px-6">${item}</span>`;
  };

  createProject.href = project.url;
  createProject.target = '_blank';
  createProject.classList = (i % 2 === 0) ? 'left-bg md:border-e-2 border-main-500' : 'right-bg md:border-s-2 border-main-500';
  createProject.innerHTML = `
  <article data-aos="zoom-in-${(i % 2 === 0) ? 'right' : 'left'}" data-aos-delay="${j * 100}" class="flex flex-col ${(i % 2 === 0) ? 'md:me-4 lg:me-8 xl:flex-row xl:pe-6' : 'xl:flex-row-reverse md:ms-4 lg:ms-8 xl:ps-6'} text-left items-stretch xl:gap-5 content-box border dark:border-gray-600 dark:hover:border-main-300 rounded dark:shadow-main-500 bg-primary dark:bg-secondary-com">
    <div class="overflow-hidden xl:basis-1/3 h-60 md:h-96 xl:h-auto">
      <div class="img-project-zoom slide-img w-full h-full flex justify-center items-center" id="postimg${i}">
        <a href="${project.url}" target="_blank">Live demo</a>
      </div>
    </div>
    <div class="basis-2/3 font-medium xl:my-4 p-6 xl:p-0">
      <div class="text-lg md:text-xl font-semibold tracking-widest leading-tight">${project.title}</div>
      <div class="uppercase text-xs tracking-widest text-secondary-font my-4 flex flex-wrap gap-1 md:gap-3"><a href="${project.repo}" class="bg-main-gray hover:bg-main-500 py-1 md:py-1.5 px-4 md:px-6" target="_blank">REPO (GITHUB)</a>${tags}</div>
      <p class="leading-5 md:leading-7 text-primary-desc dark:text-secondary-desc text-justify mb-4 elipsis">${project.desc}</p>
      <p class="text-main-gray text-xs uppercase tracking-widest">${project.updated_at}</p>
    </div>
  </article>
  `;

  j = j + 2;

  containerProject.appendChild(createProject);

  const img = document.getElementById(`postimg${i}`);
  img.style = `background: url('${project.img}') no-repeat center; background-size: cover;`;

  img.addEventListener('mouseover', function() {
    img.style = `background: url('${project.img_hover}') no-repeat center; background-size: cover;`;
  });

  img.addEventListener('mouseout', function() {
    img.style = `background: url('${project.img}') no-repeat center; background-size: cover;`;
  });
});
