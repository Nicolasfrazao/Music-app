import React, { useState } from 'react';
import { useRouter } from 'next/compat/router';

import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query) return;
    router.push(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="relative">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        <input
          name="search"
          autoComplete="off"
          id="search"
          className="flex-1 bg-transparent border-none placeholder-gray-300 outline-none text-base p-4"
          placeholder="Search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
