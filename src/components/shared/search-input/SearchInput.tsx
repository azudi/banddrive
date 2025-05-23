import Spyglass from '@/components/icons/Spyglass';
import styles from './SearchInput.module.css';

type SearchInputProps = {
  placeholder: string,
  maxWidth?: string
};

const SearchInput = ({placeholder, maxWidth}: SearchInputProps) => {
  return (
    <div className={styles['search-bar']} style={{maxWidth: `${maxWidth}`}}>
      <input className={styles['search-input']} placeholder={placeholder} type={'text'}/>
      <button className={styles['search-button']}>
        <Spyglass />
      </button>
    </div>
  );
};

export default SearchInput;