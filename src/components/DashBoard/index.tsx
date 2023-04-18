import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setBenchmark } from 'store/CollectionReducer';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import Icons from '../Icon';
import BookCard from './BookCard';

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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}+terms`
      );
      setBooks(response.data.items);
    };
    fetchBooks();
  }, [searchTerm]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

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
          description="An add book application is a software tool designed to allow users to easily add and manage books in their personal collection. The application typically allows users to input information such as the book title, author, genre, and ISBN number, as well as add a cover image and any personal notes or comments."
        />
      }
    >
      <Container className="mx-auto my-5 max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-10 text-center text-4xl font-bold">Free EBooks</h1>
          <input
            type="text"
            className="rounded-lg border-[1px] border-solid border-blue-300 p-1"
            placeholder="Search for books"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <Link href="/mycollection" legacyBehavior>
            <a className="inline-block rounded-md bg-blue-500 p-2 text-white hover:text-white hover:no-underline">
              My Collection
            </a>
          </Link>
        </div>
        <BookCard books={books} handleAddToCollection={handleAddToCollection} />
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
                      src={book?.volumeInfo?.imageLinks?.smallThumbnail}
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
