'use client';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

import React from 'react';

export default function AwsImage() {
  return (
    <StorageImage
      alt='test image'
      path='products/69c1cbf26fe43644bfc4899d55f7aa3c657d43aa-14.jpg'
      onGetUrlError={(error: any) =>
        console.log(`There was an error getting the image: ${error.message}`)
      }
    />
  );
}
