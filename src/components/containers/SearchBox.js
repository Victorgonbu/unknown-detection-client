import { useState } from 'react';
import { Link } from 'react-router-dom';
import { container, inputText, searchButton } from '../../style/SearchBox.module.css';

function SearchBox() {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={container}>
      <input
        type="text"
        className={inputText}
        placeholder="Search posts by title"
        onChange={handleInputChange}
        value={input}
      />
      <Link
        to={
        {
          pathname: 'posts',
          search: input,
        }
      }
        className={searchButton}
      >
        Search
      </Link>
    </div>
  );
}


export default SearchBox;
