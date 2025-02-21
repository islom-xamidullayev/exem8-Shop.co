import { Link } from "react-router";

function Browse() {
    return (
        <div className="bg-[#F0F0F0]">
             <div className="container bg-[#F0F0F0] py-[70px] ">
            <h2 className="text-center text-5xl mb-9 font-black">BROWSE BY DRESS STYLE</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 m-auto gap-y-5 ">

                <Link to={"shop?dressStyle=Casual"}>   
                 <div className="browse-Casual m-auto rounded-3xl">
                     <p className="py-6 ml-10 text-4xl font-semibold">Casual</p>
                </div>
                </Link>
             
                <Link to={"shop?dressStyle=Formal"}> 
                <div className="browse-Formal lg:col-span-2  m-auto  rounded-3xl ">
                     <p className="py-6 ml-10 text-4xl font-semibold ">Formal</p>
                </div>
                </Link>

                <Link to={"shop?dressStyle=Party"} className="lg:col-span-2 "> 
                <div className="browse-Party m-auto rounded-3xl">
                     <p className="py-6 ml-10 text-4xl font-semibold ">Party</p>
                </div>
                </Link>

                <Link to={"shop?dressStyle=Gym"}> 
                <div className="browse-Gym m-auto rounded-3xl">
                     <p className="py-6 ml-10 text-4xl font-semibold ">Gym</p>
                </div>
                </Link>
            </div>
        </div>
        </div>
       
    );
}

export default Browse;