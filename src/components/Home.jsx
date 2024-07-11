const Home = () => {

  return (
    <div className="bg-background text-text font-sans min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-3xl text-primary mb-4">Hello World</h1>
        <p className="text-secondary mb-4">This is a paragraph with secondary text color.</p>
        <button className="bg-primary text-secondary p-2 rounded hover:bg-accent">
          Click Me
        </button>
      </div>
    </div>
  );
};

export default Home;
