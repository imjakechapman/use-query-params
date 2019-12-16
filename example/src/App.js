import React, { useState } from 'react';
import { useQueryParams } from 'use-query-params';

const defaultParams = {
  search: 'defaultsearchterm',
  platforms: ['pinterest'],
}

const platforms = ['google', 'facebook', 'amazon', 'pinterest'];

const App = () => {
  const [changecount] = useState(0);
  const [search, setSearch] = useState('');
  const { queryParams, updateQueryParams } = useQueryParams(defaultParams);

  function updateSearchTerm(e) {
    e.preventDefault()
    updateQueryParams({
      ...queryParams,
      search
    })
    setSearch('')
  }

  function togglePlatform(e) {
    const p = e.currentTarget.name;
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

  function handleSearchTerm(e) {
    e.preventDefault()
    setSearch(e.currentTarget.value)
  }

  function setPerformanceFilters() {
    const performance = {
      clicks: ['>', 5 ],
      roas: ['<', 10]
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

  function renderPlatformCheckboxes(platform, idx) {
    return (
      <label style={{ marginRight: 15 }} htmlFor={`${platform}-${idx}`} key={`${platform}-${idx}`}>
        <input
            type='checkbox'
            name={platform}
            id={`${platform}-${idx}`}
            onChange={togglePlatform}
            checked={queryParams.platforms && queryParams.platforms.includes(platform) ? true : false}
          />
          {platform}
      </label>
    )
  }

  return (
    <div className='container container-queryparams'>
      <form onSubmit={updateSearchTerm}>
        <input className='input' placeholder='Search Term' type='text' value={search} onChange={handleSearchTerm} />
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

      <p>QueryString has changed: {changecount} {changecount === 1 || changecount > 1 ? 'times' : 'time'}</p>

      <pre>
        QueryParams:
        {JSON.stringify(queryParams, null, 2)}
      </pre>
    </div>
  );
}

export default App;
