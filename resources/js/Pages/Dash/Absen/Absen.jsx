import React from "react";
import Layout from "../Layouts/Layout";

const Absen = () => {
    return (
        <div>
            <div className="content">
                <div className="flex">
                    <a href="/absen/get_absen" className="btn btn-neutral">Absen</a>
                </div>
                <div className="overflow-x-auto mt-6 p-10">
                    <table className="table tb-absen">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Waktu Absen</th>
                                <th>Lokasi</th>
                                <th>Photo</th>
                                <th>Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Blue</td>
                                <td>Blue.png</td>
                                <td className="flex gap-1 flex-wrap">
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-error">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

Absen.layout = (page) => <Layout children={page} />;

export default Absen;
