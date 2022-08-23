const loadFacts = document.getElementById('load-facts')
const facts = document.getElementById('facts')

function getFactsList(facts){
  const factsList = document.createElement('ul')
  for (const fact of facts){
    const factEl = document.createElement('li')
    factEl.innerHTML = `
    <article class="fact-item">
      <p>${fact.text}</p>
    </article>
    `;
    factsList.appendChild(factEl)
  }
  return factsList
}

async function fetchFacts(){
  const appId = loadFacts.dataset.appid
  try{
  const response = await fetch(`/new-projects/${appId}/facts`)
  if (!response.ok){
    console.log('Fetching facts failed!')
    return
  }
  const responseData = await response.json()

  if (responseData && responseData.length > 0){
    facts.innerHTML = ''
    const factsList = getFactsList(responseData)
    facts.appendChild(factsList)
  } else {
    facts.firstElementChild.textContent = 'There are no facts.'
  }
} catch(error){
  console.log('Getting facts failed.')
}
}
loadFacts.addEventListener('click', fetchFacts)
