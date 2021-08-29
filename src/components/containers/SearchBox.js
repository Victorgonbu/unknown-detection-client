import {container, input, searchButton} from '../../style/SearchBox.module.css';

function SearchBox () {
  return(
    <div className={container}>
      <input type='text' className={input} placeholder="Search posts by title" />
      <button className={searchButton}>Search</button>
    </div>
  );
};

export default SearchBox;