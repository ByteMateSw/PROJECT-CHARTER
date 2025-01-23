
export default function page() {

  const user = {
    posts: [
      {
        title: "hola",
        user: { firstName: 'Pedro', lastName: 'Fernadnez' },
        price: 30
      },
      {
        title: "hola",
        user: { firstName: 'Pedro', lastName: 'Fernadnez' },
        price: 30
      },
      {
        title: "hola",
        user: { firstName: 'Pedro', lastName: 'Fernadnez' },
        price: 30
      },
      {
        title: "hola",
        user: { firstName: 'Pedro', lastName: 'Fernadnez' },
        price: 30
      }
    ]
  }

  return (
    <section className=" justify-center items-start p-4 md:h-full min-h-72 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
    {user?.posts.map((post: any, index: number) => {
    //const date = dateDifference(post.creationDate)
    return (
      <div className="flex flex-col justify-between shadow-md h-60 rounded-2xl overflow-hidden" key={index}>
        <div className="bg-gray-200 w-full h-full">
          <img src="" alt="" />
        </div>
        <div className="flex justify-center w-full h-14 p-4 min-[1620px]:items-center items-start flex-col-reverse min-[1620px]:flex-row">
          <h2 className="flex-start text-lg text-primary-blue font-bold">
            {post.title}
          </h2>
        </div>
      </div>
    );
  })}
    </section >
  );
}
