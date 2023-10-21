import { React, usePage } from "react";
import Layout from "../Layouts/Layout";

const Home = () => {
    return (
        <div>
            <div className="content flex flex-wrap gap-5">
                {/* <h1 className="font-bold text-5xl">Selamat Datang Sigma</h1> */}
                <div className="card lg:w-96 w-full bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card lg:w-96 w-full bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Home.layout = (page) => <Layout children={page} title="Welcome" />;

export default Home;
