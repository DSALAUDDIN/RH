/* eslint-disable @typescript-eslint/no-explicit-any */
// Static image module declarations for Next.js image imports
declare module '*.png' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.jpg' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.webp' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.avif' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.ico' {
  const content: import('next/image').StaticImageData;
  export default content;
}
