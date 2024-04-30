const API_KEY="d67fcef2a159487d9ba7da4b9655b000";
const url="https://newsapi.org/v2/everything?q=";

//when window loaded, news fetched through this function
window.addEventListener('load', ()=>{
  fetchNews('India');
});

function reload(){
  window.location.reload(); // this reloads page on clicking the news icon
}
async function fetchNews(query){
  //fetch library that returns a promise, on which await is used to wait for the promise to resolve
  const res=await fetch(`${url}${query}&apiKey=${API_KEY}`); //fetching news from the url and api key provided by newsapi.org. Fetch is an asynchronous operation.
  const data=await res.json(); //converting the response to json format
  console.log(data);//printing the data in console
  bindData(data.articles);//binding the data (in articles) to the function bindData() 
}
// as no. of articles present in the data (api), so no. of template clone make and put in div(cards-container container flex) in html file.
function bindData(articles){
  const cardsContainer=document.querySelector('.cards-container');
  const newsCardTemplate=document.getElementById('template-news-card');
  cardsContainer.innerHTML='';//clearing the previous data, else whenever new data is fetched, it will be appended to the previous data, so 100 articles + 100 articles will be shown, on calling the function fetchNews() again and again.

  articles.forEach(article => {
    if(!article.urlToImage) return; //if no image is present, then return from the function, that is not showing that news.

    const cardClone=newsCardTemplate.content.cloneNode(true);//cloning the template, that is each article will be shown in a card, and all divs will be cloned from the template.

    fillDataInCard(cardClone, article);//calling the function fillDataInCard() to fill the data in the cloned divs. data addition before appending cards to the cards container.
    cardsContainer.appendChild(cardClone);//appending the cloned divs to the cards container, and it is shown.
  });
}
function fillDataInCard(cardClone, article){
  const newsImg=cardClone.querySelector('#news-img');
  const newsTitle=cardClone.querySelector('#news-title');
  const newsSource=cardClone.querySelector('#news-source');
  const newsDesc=cardClone.querySelector('#news-desc');
  newsImg.src=article.urlToImage;//adding the image to the card, where src is the attribute of img tag, and urlToImage is the attribute of the article.
  newsTitle.innerHTML=article.title;//adding the title to the card and title is the attribute of the article.
  newsDesc.innerHTML=article.description;//adding the description to the card and description is the attribute of the article.

  // also showing the date, which is in T&Z format in the object, so converting it to local date and time.
  const date=new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta", //specifying the time zone, and localestring is used to convert the date to local date and time.
  });//converting the date to local date and time.

  newsSource.innerHTML=`${article.source.name} • ${date}`;//adding the source and date to the card.
  // on clicking the news, it reaches the respective news page, through url of the object.
  cardClone.firstElementChild.addEventListener('click', ()=>{
    window.open(article.url, "_blank");//opening the url of the article in a new tab.
  });
}
// for distinguished news, nav items are used, and on clicking the nav items, news is fetched through this function.

// selecting the three distinguished sources
let curSelectedNav=null; //initially no nav item is selected and curSelectedNav is null.



function onNavItemClick(id){
  fetchNews(id);//fetching the news on clicking the nav items, and will also bind data items.
  const navItem=document.getElementById(id);//getting the nav item by id and storing it in navItem.
  curSelectedNav?.classList.remove('active'); //if any nav item is selected, that is not null, then remove the active class from old nav selected.
  curSelectedNav=navItem; //storing the current nav item in curSelectedNav.
  curSelectedNav.classList.add('active'); //adding the active class to the current nav selected.
  //styling the active classes in CSS.



} //id or search query is taken same here, but can also take JSON object as search query, and then fetch the news accordingly.

// for search bar, on clicking the search button, news is fetched through this function.
const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');
searchButton.addEventListener('click', ()=>{
  const query=searchText.value; //extracting the value from the search bar and storing it in query.
  if(!query) return; //if no query is present by the user and search button hit, then return from the function.
  fetchNews(query);//fetching the news on clicking the search button, and will also bind data items.
  // also the nav items should be made null as no nav item is selected, then.
  curSelectedNav?.classList.remove('active');
  curSelectedNav=null;
});//fetching the news on clicking the search button, and will also bind data items.
