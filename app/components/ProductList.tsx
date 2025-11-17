'use client';

import { useEffect, useState } from 'react';
import outputs from '@/amplify_outputs.json';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
import { Loader, Flex, Text, Collection } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import ProductCard from './ProductCard';

// Configure Amplify
Amplify.configure(outputs);
const client = generateClient<Schema>();
type Product = Schema['Product']['type'];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data: items } = await client.models.Product.list();
      setProducts(items);
    } catch (e) {
      console.error('An error occurred:', e);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        minHeight='200px'
      >
        <Loader size='large' />
        <Text>Loading Products...</Text>
      </Flex>
    );
  }

  return (
    <section id='products' className='py-20 bg-white'>
      <div className='container mx-auto px-6'>
        <h2 className='text-4xl font-bold text-center text-gray-800 mb-12'>
          ✨ Our Products ✨
        </h2>

        <Collection
          type='grid'
          items={products}
          // --- THIS IS THE FIX ---
          // We use a responsive object for the templateColumns prop
          templateColumns={{
            base: '1fr', // 1 column on small screens
            medium: '1fr 1fr', // 2 columns on medium screens
            large: '1fr 1fr 1fr', // 3 columns on large screens
          }}
          // --- END OF FIX ---

          gap='20px'
          alignItems='stretch'
        >
          {(item) => <ProductCard product={item} key={item.id} />}
        </Collection>
      </div>
    </section>
  );
}
