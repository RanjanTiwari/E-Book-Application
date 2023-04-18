import React from 'react';
import { Button, Card } from 'react-bootstrap';

const BookCard: React.FC<{
  books: any;
  handleAddToCollection: (id: any) => any;
}> = ({ books, handleAddToCollection }: any) => {
  return (
    <div>
      {' '}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {books?.map((book: any) => (
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
              <h2 className="mb-2 text-sm font-bold">
                {book?.volumeInfo?.title}
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
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-tl-lg bg-blue-500 px-2 py-1 text-sm text-white"
              onClick={() => handleAddToCollection(book)}
            >
              Add to Collection
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookCard;
