const loadImages = document.getElementById('load-images')
const images = document.getElementById('outschoolimages')

function getImagesList(images){
  const imagesList = document.createElement('ul')
  for (const image of images){
    const imageEl = document.createElement('li')
    imageEl.innerHTML = `
    <article class="image-item">
      <img src=${image.path} alt="missing"/>
    </article>
    `;
    imagesList.appendChild(imageEl)
  }
  return imagesList
}

async function fetchImages(){
  const outschoolId = loadImages.dataset.outschoolid
  try{
  const response = await fetch(`/outschool-projects/${outschoolId}/images`)
  
  if (!response.ok){
    console.log('Fetching images failed!')
    return
  }
  const responseData = await response.json()

  if (responseData && responseData.length > 0){
    images.innerHTML = ''
    const imagesList = getImagesList(responseData)
    images.appendChild(imagesList)
  } else {
    images.firstElementChild.textContent = 'There are no images.'
  }
} catch(error){
  console.log('Getting images failed.')
}
}
loadImages.addEventListener('click', fetchImages)
