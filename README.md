# use-query-params

> React hook to easily read and manipulate query params

## Install

```bash
yarn add @imjakechapman/use-query-params
```

```bash
npm install @imjakechapman/use-query-params
```

## Usage (TypeScript)

```tsx
import React, { useState } from 'react';
import { useQueryParams } from 'use-query-params';

// Types of all your query parameters
type QueryParams = {
  search?: string;
  options?: string[];
  map?: {
    [key: string]: any;
  },
};

// Your default parameters
const defaultParams: QueryParams = {
  search: 'immadefaultparam',
  options: ['well', 'so', 'am', 'i', '!'],
  map: {
    dont: [
      "forget",
      "about",
      "me",
    ],
  },
};

const App: React.FC = () => {
  const { queryParams, updateQueryParams } = useQueryParams<QueryParams>(defaultParams);

  function updateSomeParam() {
    updateQueryParams({
      ...queryParams,
      search: "immaNewValue",
    });
  }

  return (
    <h1>Enjoy your params</h1>
    <pre>
      {JSON.stringify(queryParams, null, 2)}
    </pre>
  )
}

export default App;
```

## License

MIT © [imjakechapman](https://github.com/imjakechapman)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
