'use client';

import { useState } from 'react';
import { type Schema } from '@/amplify/data/resource';
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Rating,
  StepperField,
  Text,
  View,
} from '@aws-amplify/ui-react';

// Get the 'Product' type from our backend schema
type Product = Schema['Product']['type'];

// This component expects a single 'product' object as a prop
export default function ProductCard({ product }: { product: Product }) {
  // This state is now managed *inside* each card
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`Added to cart!\n${quantity} "${product.name}"`);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <Card variation='elevated' style={{ height: '100%' }}>
      <Flex direction='column' justifyContent='space-between' height='100%'>
        {/* Product Image */}
        {product.image && (
          <View height='16rem' width='100%'>
            <Image
              src={product.image}
              alt={product.name}
              width='100%'
              height='100%'
              objectFit='cover'
            />
          </View>
        )}

        {/* Product Details */}
        <Flex direction='column' padding='1rem' flex='1'>
          {/* Badges */}
          <Flex height='1.8rem' gap='0.5rem' marginBottom='0.5rem'>
            {product.bestSeller ? (
              <Badge variation='success'>Bestseller</Badge>
            ) : null}
            {product.isNew ? <Badge variation='info'>New</Badge> : null}
          </Flex>

          {/* Title */}
          <Heading level={4}>{product.name}</Heading>

          {/* Rating */}
          {product.avgRating && product.avgRating > 0 && (
            <Flex>
              <Rating value={product.avgRating} fillColor='#f4a41d' />
              <Text fontSize='small'>{product.avgRating}</Text>
            </Flex>
          )}

          {/* Price */}
          <Flex alignItems='baseline' gap='0.25rem'>
            <Text fontSize='large' color='#B12704' fontWeight='bold'>
              ${product.price.toFixed(2)}
            </Text>
          </Flex>

          {/* Stock Level */}
          <Text
            fontSize='small'
            color={isOutOfStock ? 'error.80' : 'font.secondary'}
          >
            {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
          </Text>
        </Flex>

        {/* Actions (at the bottom) */}
        <Flex direction='column' padding='1rem'>
          <StepperField
            label='Quantity'
            value={quantity}
            onStepChange={setQuantity}
            min={1}
            max={10} // You could set this to product.stock
            step={1}
            labelHidden
            width='100%'
            isDisabled={isOutOfStock}
          />
          <Button
            variation='primary'
            onClick={handleAddToCart}
            disabled={isOutOfStock || !quantity}
            marginTop='0.5rem'
          >
            Add to Cart
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
