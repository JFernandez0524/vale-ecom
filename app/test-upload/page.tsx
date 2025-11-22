'use client';

import React from 'react';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

export default function page() {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      path='products/'
      maxFileCount={1}
      isResumable
    />
  );
}
