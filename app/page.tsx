// This is your main homepage file: app/page.tsx

import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import ProductList from '@/app/components/ProductList'; // Our updated list
import About from '@/app/components/About';
import Footer from '@/app/components/Footer';
import { AuthGetCurrentUserServer } from '@/utils/amplify-utils';
import { getStorageFileLinkServerSide } from '@/utils/amplify-utils';

export default async function Home() {
  const currentUser = await AuthGetCurrentUserServer();

  if (!currentUser) {
    console.log(currentUser);
  }

  const storageFileLink = await getStorageFileLinkServerSide();
  console.log({ storageFileLink });

  return (
    <div className='flex flex-col min-h-screen'>
      {/* The Header component is outside of the 'main' tag 
        because it's a persistent UI element.
      */}
      <Header />

      {/* The 'main' tag holds all the unique content 
        for this specific page.
      */}
      <main className='grow'>
        <Hero />
        <ProductList />
        <About />
      </main>

      {/* The Footer is also a persistent UI element */}
      <Footer />
    </div>
  );
}
