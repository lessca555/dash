import React from "react";

const Navbar = () => {
    return (
        <div className="dash">
            <div className="navbar bg-base-100">
                <div className="flex">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-full md:w-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
