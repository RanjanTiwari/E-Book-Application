import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setBenchmark } from 'store/CollectionReducer';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import Icons from '../Icon';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    previewLink: any;
    imageLinks: {
      smallThumbnail: string;
    };
  };
}

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [collection, setCollection] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&filter=free-ebooks'
      );
      setBooks(response.data.items);
    };
    fetchBooks();
  }, []);

  const handleAddToCollection = (book: Book) => {
    setCollection((prevCollection) => [...prevCollection, book]);
  };

  const removeFromCollection = (id: string) => {
    const updatedCollection = collection.filter((book) => book.id !== id);
    setCollection(updatedCollection);
  };

  const dispatch = useDispatch();
  dispatch(
    setBenchmark({
      benchmark: collection,
    })
  );

  return (
    <Main
      meta={
        <Meta
          title="Book Application"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <Container className="mx-auto my-5 max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-10 text-center text-4xl font-bold">
            Free eBooks about Flowers
          </h1>
          <Link href="/mycollection" legacyBehavior>
            <a className="inline-block rounded-md bg-blue-500 p-2 text-white hover:text-white hover:no-underline">
              My Collection
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Card
              key={book.id}
              className="relative mx-4 mb-5 rounded-lg border-0 shadow-lg"
            >
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={book.volumeInfo?.imageLinks?.smallThumbnail}
                  alt=""
                  className="h-[300px] w-[100%]"
                />
              </div>
              <Card.Body className="p-2">
                <h2 className="mb-2 text-2xl font-bold">
                  {book.volumeInfo.title.split(' ').slice(0, 3).join(' ')}
                </h2>
                {/* <p className="mb-2 text-sm">
                  {book.volumeInfo.authors.join(', ')}
                </p> */}
                {/* <p className="mb-4 text-sm">{book.volumeInfo.description}</p> */}
                <Button
                  variant="primary"
                  href={book?.volumeInfo?.previewLink}
                  target="_blank"
                >
                  Read more
                </Button>
              </Card.Body>
              <Button
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-tl-lg bg-blue-500 px-2 py-1 text-sm text-white"
                onClick={() => handleAddToCollection(book)}
              >
                Add to Collection
              </Button>
            </Card>
          ))}
        </div>
        {collection.length > 0 && (
          <>
            <h1 className="my-4 text-center text-[50px] font-semibold">
              My collection
            </h1>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {collection.map((book) => (
                <Card
                  key={book.id}
                  className="relative mx-4 mb-5 rounded-lg border-0 shadow-lg"
                >
                  <div className="w-full overflow-hidden rounded-lg">
                    <img
                      src={book.volumeInfo?.imageLinks?.smallThumbnail}
                      alt=""
                      className="h-[300px] w-[100%]"
                    />
                  </div>
                  <Card.Body className="p-2">
                    <h2 className="mb-2 text-2xl font-bold">
                      {book.volumeInfo.title.split(' ').slice(0, 3).join(' ')}
                    </h2>
                    <Button
                      variant="primary"
                      href={book?.volumeInfo?.previewLink}
                      target="_blank"
                    >
                      Read more
                    </Button>
                  </Card.Body>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCollection(book.id)}
                    className=" absolute right-[-10px] top-[-10px] rounded-full bg-blue-200 p-4"
                  >
                    {Icons.CLOSE}
                  </Button>
                </Card>
              ))}
            </div>
          </>
        )}
      </Container>
    </Main>
  );
};
export default Dashboard;
