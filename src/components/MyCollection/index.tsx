import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Collection = () => {
  const collection = useSelector(
    (state: any) => state.benchmark_data.benchmark
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
      <div className="mx-auto my-5 max-w-screen-xl flex-wrap items-center justify-between p-4">
        {collection?.length > 0 ? (
          <>
          <h3 className="my-2">My collection</h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {collection?.map((book: any) => (
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
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
          <h3 className="my-2">My collection</h3>
          <div>No data found</div>
          </>
        )}
      </div>
    </Main>
  );
};

export default Collection;
