// Custom-element type declaration for the <image-slot> web component
// loaded from /public/image-slot.js. Tells TypeScript and React's JSX
// type-checker that <image-slot> is a valid intrinsic element.

import type React from 'react';

declare module 'react' {
  // React 19 JSX namespace
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        id?: string;
        shape?: 'rect' | 'rounded' | 'circle' | 'pill';
        radius?: string | number;
        fit?: 'cover' | 'contain' | 'fill';
        position?: string;
        placeholder?: string;
        src?: string;
        mask?: string;
        class?: string;
      };
    }
  }
}

// Fallback for projects on the older global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        id?: string;
        shape?: 'rect' | 'rounded' | 'circle' | 'pill';
        radius?: string | number;
        fit?: 'cover' | 'contain' | 'fill';
        position?: string;
        placeholder?: string;
        src?: string;
        mask?: string;
        class?: string;
      };
    }
  }
}

export {};
