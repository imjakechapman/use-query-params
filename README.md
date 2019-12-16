# use-query-params

> React hook to easily read and manipulate query params

## Install

```bash
yarn add @imjakechapman/use-query-params
```

```bash
npm install @imjakechapman/use-query-params
```

## Usage

```tsx
import React, { useState } from 'react';
import './App.scss';
import { useQueryParams } from 'use-query-params';

type platforms = 'google' | 'facebook' | 'amazon' | 'pinterest';

type QueryParams = {
  performance?: { [key: string]: [string, string | number] };
  search?: string;
  platforms?: platforms[];
}

const defaultParams: QueryParams = {
  search: 'defaultsearchterm',
  platforms: ['pinterest'],
}

const platforms: platforms[] = ['google', 'facebook', 'amazon', 'pinterest'];

const App: React.FC = () => {
  const [changecount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const { queryParams, updateQueryParams } = useQueryParams<QueryParams>(defaultParams);

  function updateSearchTermParam(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateQueryParams({
      ...queryParams,
      search
    })
    setSearch('')
  }

  function togglePlatform(e: React.FormEvent<HTMLInputElement>) {
    const p = e.currentTarget.name as platforms;
    const platformSet = new Set(queryParams.platforms);

    // Platform doesn't exist
    if (platformSet.has(p)) {
      platformSet.delete(p);
    } else {
      platformSet.add(p);
    }

    updateQueryParams({
      ...queryParams,
      platforms: Array.from(platformSet),
    })
  }

  function updateSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setSearch(e.currentTarget.value)
  }

  function setPerformanceFilters() {
    const performance: { [key: string]: [string, string | number] }  = {
      clicks: ['>', "5"],
      roas: ['<', "10"]
    }

    updateQueryParams({
      ...queryParams,
      performance: {
        ...performance
      }
    })
  }

  function removePerformancefilters() {
    updateQueryParams({
      ...queryParams,
      performance: {}
    });
  }

  function removeQueryParams() {
    updateQueryParams({})
  }

  function revertQueryParamsToDefault() {
    updateQueryParams()
  }

  function renderPlatformCheckboxes(platform: platforms, idx: number) {
    return (
      <label style={{ marginRight: 15 }} htmlFor={`${platform}-${idx}`} key={`${platform}-${idx}`}>
        <input
          type='checkbox'
          name={platform}
          id={`${platform}-${idx}`}
          onChange={togglePlatform}
          checked={queryParams.platforms && queryParams.platforms.includes(platform) ? true : false} />
        {platform}
      </label>
    )
  }

  return (
    <div className='container container-queryparams'>
      <form onSubmit={updateSearchTermParam}>
        <input className='input' placeholder='Search Term' type='text' value={search} onChange={updateSearchTerm} />
      </form>

      <div className='button-container'>
        <button className='button' type='button' onClick={setPerformanceFilters}>Set Performance Filters</button>
        <button className='button' type='button' onClick={removePerformancefilters}>Remove Performance Filters</button>
        <button className='button' type='button' onClick={revertQueryParamsToDefault}>Revert to default params</button>
        <button className='button' type='button' onClick={removeQueryParams}>Remove All Query Params</button>
      </div>
      
      <div className='platform-container'>
        {platforms.map(renderPlatformCheckboxes)}
      </div>

      <p>QueryString has changed: {changecount} {changecount === 0 || changecount > 1 ? 'times' : 'time'}</p>

      <pre>
        QueryParams:
        {JSON.stringify(queryParams, null, 2)}
      </pre>
    </div>
  );
}

export default App;
```

## License

MIT © [imjakechapman](https://github.com/imjakechapman)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
