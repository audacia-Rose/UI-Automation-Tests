function getBookID(URL: string) {
    let urlArray = URL.split('/');
    let bookID: string = urlArray[4];
    console.log(bookID)
}

getBookID('https://audacia-training-automationtesting-ui.azurewebsites.net/book/322')

function changeDateFormat(dateDash: string) {
    let dateArray = dateDash.split('-');
    dateArray = dateArray.reverse();
    let dateSlash = dateArray.join('/');
    console.log(dateSlash);
}

changeDateFormat('1964-11-23')