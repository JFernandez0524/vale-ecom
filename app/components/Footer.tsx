export default function Footer() {
  return (
    <footer className='bg-gray-800 text-gray-300 py-8'>
      <div className='container mx-auto px-6 text-center'>
        <p>
          &copy; {new Date().getFullYear()} Made by Valentina. All rights
          reserved.
        </p>
        <p>
          site created by &copy;
          <a href='https://JoseTheRealtor.com' target='_blank'>
            JoseTheRealtor
          </a>
        </p>
      </div>
    </footer>
  );
}
