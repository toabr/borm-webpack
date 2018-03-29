const css = require('./less/styles.less');
const bootstrap = require('./js/bootstrap.js');
const books = require('./js/books.js');

console.log('###  works  ###');

(function showBooks() {
  var tmp, item, a, i;
  tmp = document.getElementsByTagName("template")[0];
  item = tmp.content.querySelector('div');
  // console.log(item);

  for (i = 0; i < books.length; i++) {
    //Create a new node, based on the template:
    a = document.importNode(item, true);
    // console.log($(a).find(".field-image")[0].innerHTML);
    $(a).find(".field-image img")[0].src = (books[i].image)? books[i].image : 'https://placehold.it/300x450?text=IMAGE';
    $(a).find(".field-title .field-item h3").html(books[i].title);
    $(a).find(".field-subtitle .field-item h5")[0].innerHTML = (books[i].subtitle)? books[i].subtitle : '';
    $(a).find(".field-isbn .field-item span").html(books[i].isbn);
    //append the new node
    document.querySelector('#suggestion-list').appendChild(a);
  }
})();
