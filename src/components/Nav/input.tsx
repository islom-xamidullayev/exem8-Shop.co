import { InputHTMLAttributes } from "react";
import Stech from "../../assets/stech.svg"

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <div className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10 items-center px-2 rounded-[14px]">
      <img
        src={Stech}
        height={20}
        width={20}
        alt="search"
        className="min-w-5 min-h-5"
      />
      <input
        type="search"
        name="search"
        placeholder="Search for products..."
        className="bg-transparent placeholder:text-black/40 outline-none ml-2  xl:w-[400px] py-[12px] px-[15px"
        {...props}
      />

      {/*             <input  type="text"  
          placeholder='Search for products...' 
      className='border bg-[#F0F0F0] rounded-[9px] w-[400px] py-[12px] px-[15px]'/>
       */}
    </div>
  );
};

export default SearchInput;
