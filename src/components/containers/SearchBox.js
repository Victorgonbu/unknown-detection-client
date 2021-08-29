import {container, inputText, searchButton} from '../../style/SearchBox.module.css';
import {useState} from 'react';

function SearchBox () {
  const [input, setInput] = useState();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    
  };

  return(
    <div className={container}>
      <input 
       type='text' 
       className={inputText} 
       placeholder="Search posts by title" 
       onChange={handleInputChange}
       value={input}
       />
      <button 
      className={searchButton}
      onClick={handleSubmit}
      >Search</button>
    </div>
  );
};



export default SearchBox;