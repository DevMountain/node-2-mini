let books = [];
let id = 0;

module.exports = {
  read: ( req, res ) => {
    res.status(200).send( books );
  },
  create: ( req, res ) => {
    const { title, author } = req.body;
    let book = {
      id: id,
      title: title,
      author: author
    }
    books.push( book );
    id++;
    res.status(200).send( books );
  },
  update: ( req, res ) => {
    let index = null;
    books.forEach((book, i) => {
      if(book.id === Number(req.params.id)) index = i;
    })
    books[ index ] = {
      id: books[ index ].id,
      title: req.body.title || books[ index ].title,
      author: req.body.author || books[ index ].author
    };
    res.status(200).send( books );
  },
  delete: ( req, res ) => {
    let index = null;
    books.forEach((book, i) => {
      if(book.id === Number(req.params.id)) index = i;
    })
    books.splice(index, 1)
    res.status(200).send( books );
  }
};