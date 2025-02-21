import { Link } from "react-router";

function Header() {
  return (
    <div className="bg-[#F2F0F1]">
       <div className=" container  pt-10 md:pt-24 overflow-hidden">
    <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>

      <h1 className="font-bold text-3xl sm:text-6xl mb-10 max-w-[550px]">
        <span>FIND CLOTHES</span><br /> <span>THAT MATCHES</span> <br /><span>YOUR STYLE</span>
      </h1>
      
      <div>
        <p className="text-black/60 text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px]">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>
      </div>
      
      <div className='mt-10'></div>
      <div className='w-full flex '>
        <Link className="w-full md:w-58 mb-15 md:mb-12 inline-block text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse" to='Shop'>Shop Now</Link>
      </div>
      
      <div className='mb-10'></div>
      <div className="flex mb-10 flex-wrap justify-start items-center gap-10">
        <div className="flex-grow flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl tracking-wide">200+</h1>
          <p>International Brands</p>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl tracking-wide">2,000+</h1>
          <p>High-Quality Products</p>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl tracking-wide">30,000+</h1>
          <p>Happy Customers</p>
        </div>
      </div>
    </div>
    <div className="flex justify-end flex-grow relative">
      <img
        className="w-32 absolute right-0 hidden xsm:block z-10" 
        src="src\assets\hero_image.webp" alt="" 
      />
      <img
  
        className="w-[500px] h-[500px]" 
        src="src\assets\Main.png" alt="main"  
      />
      <img
     
       
        className="w-12 absolute left-0 top-44 hidden xsm:block z-10" 
        src="./Vector.png" alt="" 
      />
    </div>

        </div>

  </div>
    </div>
   
  );
}

export default Header;
