import { React, useRef, useEffect, useState } from "react";
import Layout from "../Layouts/UserLayout";
import SignatureCanvas from "react-signature-canvas";
import Webcam from "react-webcam";
import { Link, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const AddAbsen = () => {
    //location state
    const [locationInfo, setLocationInfo] = useState("");

    //camera states
    const webcamRef = useRef(null);
    const [judul, setJudul] = useState("");
    const [id, setId] = useState(""); // Untuk kolom id
    const [gambar, setGambar] = useState(null);
    const [isWebcamEnabled, setIsWebcamEnabled] = useState(true);

    //camera/webcam functions
    const capture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setGambar(imageSrc);

            // Matikan kamera
            setIsWebcamEnabled(false);

            // Kirim gambar dan nama ke server di sini
            sendDataToServer(imageSrc);
        }
        // console.log(imageSrc);
    };

    const dataURItoBlob = (dataURI) => {
        // Mengurai data URI menjadi tipe dan data base64
        const splitDataURI = dataURI.split(",");
        const mimeType = splitDataURI[0].match(/:(.*?);/)[1];
        const base64String = atob(splitDataURI[1]);

        // Mengonversi string base64 ke Uint8Array
        const uint8Array = new Uint8Array(base64String.length);
        for (let i = 0; i < base64String.length; i++) {
            uint8Array[i] = base64String.charCodeAt(i);
        }

        // Membuat blob dari Uint8Array
        return new Blob([uint8Array], { type: mimeType });
    };

    const sendDataToServer = (imageSrc) => {
        // Konversi base64 ke Blob
        console.log(imageSrc);
        const imageBlob = dataURItoBlob(imageSrc);

        // Membuat objek FormData dan menambahkan gambar ke dalamnya
        const formData = new FormData();
        formData.append("id", id);
        formData.append("judul", judul);
        formData.append("gambar", imageBlob, "image.jpeg"); // Ganti "image.jpeg" sesuai kebutuhan

        // Mengirim formData ke server menggunakan Inertia atau metode lain
        // Inertia.post("/post", formData).then(() => {
        //     // Handle respons dari server jika diperlukan
        // });
    };

    //end camera functions

    //tanggal functions

    //Mendapatkan tanggal terkini
    const [currentDateTime, setCurrentDateTime] = useState("");

    const updateDateTime = () => {
        const now = new Date();
        const formattedDateTime = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
        setCurrentDateTime(formattedDateTime);
    };

    // Panggil fungsi updateDateTime untuk menginisialisasi currentDateTime saat komponen pertama kali dirender
    useState(() => {
        updateDateTime();
    }, []);

    //tanda yangan
    const signatureRef = useRef();
    const [signatureData, setSignatureData] = useState(null);

    const clearSignature = () => {
        signatureRef.current.clear();
        setSignatureData(null); // Bersihkan tanda tangan dari state
    };

    const saveSignature = () => {
        const signatureDataURL = signatureRef.current.toDataURL();
        setSignatureData(signatureDataURL); // Simpan data gambar tanda tangan dalam state
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Lakukan sesuatu dengan file gambar yang diunggah
            // Misalnya, Anda bisa mengirimnya ke server atau menampilkannya di halaman.
        }
    };

    //end tanggal functions

    //lokasi functions
    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
                    setLocationInfo(location);

                    // Using Geocoding API to get the address
                    fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const address = data.display_name;
                            setLocationInfo(`Alamat: ${address}`);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                },
                (error) => {
                    setLocationInfo(
                        `Gagal mendapatkan lokasi: ${error.message}`
                    );
                }
            );
        } else {
            setLocationInfo("Geolocation tidak didukung oleh peramban ini.");
        }
    };

    //end location functions

    //csrf
    // const [formData, setFormData] = useState({
    //     // Inisialisasi data formulir Anda di sini
    // });

    // const csrfToken = document
    //     .querySelector('meta[name="csrf-token"]')
    //     .getAttribute("content");

    // const handleSubmitCSRF = async (e) => {
    //     e.preventDefault();

    //     // Anda dapat menambahkan CSRF token ke data formulir
    //     formData._token = csrfToken;

    //     // Kemudian kirim formulir menggunakan API atau metode yang Anda pilih
    //     try {
    //         // Kirim formulir ke server
    //     } catch (error) {
    //         // Tangani kesalahan
    //     }
    // };

    return (
        <div>
            <Head title="Tambah Absen" />
            <div className="flex justify-center items-center h-[100%] p-3">
                <div>
                    <h1 className="text-2xl font-bold">Absen pegawai</h1>
                    <form action="#" className="form-group mt-10">
                        {/* <input type="hidden" name="_token" value={csrfToken} /> */}
                        <label>Nama</label>
                        <br />
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value="Admin"
                            disabled
                            onChange={(e) => setJudul(e.target.value)}
                        />
                        <br />
                        <br />
                        <label>Tanggal dan Jam</label>
                        <br />
                        <input
                            type="datetime-local"
                            value={currentDateTime}
                            id="dateTimeInput"
                            className="input input-bordered w-full"
                            disabled
                        />
                        <br />
                        <br />

                        <label htmlFor="">Location</label>
                        <div className="location flex flex-col">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={locationInfo}
                                disabled
                            />
                            <button
                                id="getLocationButton"
                                onClick={getLocation}
                                className="btn btn-primary"
                            >
                                get Location
                            </button>
                        </div>
                        <br />
                        <br />

                        <div className="photo">
                            {isWebcamEnabled ? (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                />
                            ) : (
                                <div>Kamera dimatikan</div>
                            )}
                            <input
                                type="hidden" // Atribut "hidden" untuk kolom id
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                            <br /> <br />
                            <button
                                className="btn btn-success w-full"
                                onClick={capture}
                            >
                                Capture
                            </button>
                            {gambar && <img src={gambar} alt="Captured" />}
                        </div>

                        <br />
                        <br />

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                            type="button"
                            className="btn btn-info w-full"
                            onClick={() =>
                                document
                                    .getElementById("my_modal_5")
                                    .showModal()
                            }
                        >
                            Tanda tangan disini
                        </button>
                        <dialog
                            id="my_modal_5"
                            className="modal modal-bottom sm:modal-middle"
                        >
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <form method="dialog" className="flex flex-col">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>

                                    <SignatureCanvas
                                        ref={signatureRef}
                                        penColor="black"
                                        canvasProps={{
                                            width: 400,
                                            height: 200,
                                            backgroundColor: "black",
                                        }}
                                    />
                                    <div className="flex flex-col lg:flex-row gap-3">
                                        <button
                                            type="button"
                                            onClick={clearSignature}
                                            className="btn btn-error text-white"
                                        >
                                            Hapus Tanda Tangan
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={saveSignature}
                                            className="btn btn-success text-white"
                                        >
                                            Simpan Tanda Tangan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </dialog>

                        {signatureData && (
                            <div>
                                <h3>Tanda Tangan yang Disimpan</h3>
                                <img src={signatureData} alt="Tanda Tangan" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        )}

                        <br />
                        <br />

                        <button className="btn btn-neutral w-full">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

AddAbsen.layout = (page) => <Layout children={page} />;

export default AddAbsen;
