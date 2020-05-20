let newsList = []
let page = 1;
const apiKey = "9ef7cffc05ce4582aa9a3a62d60fd83e"


const loadNews = async () => {
    let url = `https://newsapi.org/v2/everything?q=macron&page=${page}&sortBy=publishedAt&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json();
    let dataList = result.articles //new
    newsList = newsList.concat(dataList) //old

    console.log(result)
    render(newsList)
}

const render = (list) => {

    let newsHtml = list.map(item =>
        `<div id="news">
     <div id="contentsArea">
        <div id="title">${item.title}</div>
        <div id="source">${item.source.name}</div>
        <div id="publishedAt">${getTime(item.publishedAt)}</div>
        <a href="${item.url}"> ==> access article</a>

        
     </div>
     <div id="imgArea">
         <img src="${item.urlToImage}" width=200/>

     </div>
  </div>`).join('')


    document.getElementById("newsArea").innerHTML = newsHtml

}

function getTime(time) {
    let newTime = time.toString().split("").splice(0, 10).join("")
    let newTime1 = newTime.replace("-", "")
    let newTime2 = newTime1.replace("-", "")
    console.log(newTime2)
    return moment(newTime2, "YYYYMMDD").fromNow()
}


let loadMore = () => {
    page++;
    loadNews();
};

loadNews();

