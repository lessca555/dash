import { React, useRef, useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import SignatureCanvas from "react-signature-canvas";

const AddAbsen = () => {
    let videoRef = useRef(null);
    let photoRef = useRef(null);
    const fileInputRef = useRef(null);

    const [selectedFileName, setSelectedFileName] = useState("No file chosen");
    const [locationInfo, setLocationInfo] = useState("");

    //get access camera

    useEffect(() => {
        getUserCamera();
    }, [videoRef]);

    const getUserCamera = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                //pindahkan stream ke <video></video> tag
                let video = videoRef.current;
                video.srcObject = stream;

                video.play();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    //ambil gambar
    const takePicture = () => {
        let canvas = photoRef.current;
        let video = videoRef.current;
        const fileInput = fileInputRef.current;

        if (canvas && video) {
            // Gambar dari elemen video ke elemen canvas
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas
                .getContext("2d")
                .drawImage(video, 0, 0, canvas.width, canvas.height);

            // Dapatkan Data URL dari gambar di elemen canvas
            const imageDataUrl = canvas.toDataURL("image/jpeg"); // Anda bisa mengganti format sesuai kebutuhan

            // Setel Data URL sebagai nilai dari input file
            if (fileInput) {
                // Simpan Data URL di state dan tampilkan nama file yang dipilih
                setSelectedFileName("image.jpg");
                // Anda dapat mengganti "image.jpg" dengan nama file yang sesuai
            }
        }

        // Menonaktifkan video setelah mengambil gambar
        video.pause(); // Berhenti memainkan video
        video.srcObject = null; // Menghapus sumber video
        takePhotoButton.disabled = true; // Menonaktifkan tombol "take photo"
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Simpan nama file yang dipilih di state
            setSelectedFileName(file.name);
        }
    };

    //hapus gambar
    // const clearImg = () => {
    //     let photo = photoRef.current;
    //     let ctx = photo.getContext("2d");
    //     ctx.clearRect(0, 0, photo.width, photo.height);
    // };

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

    //lokasi
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

    //csrf
    const [formData, setFormData] = useState({
        // Inisialisasi data formulir Anda di sini
    });

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const handleSubmitCSRF = async (e) => {
        e.preventDefault();

        // Anda dapat menambahkan CSRF token ke data formulir
        formData._token = csrfToken;

        // Kemudian kirim formulir menggunakan API atau metode yang Anda pilih
        try {
            // Kirim formulir ke server
        } catch (error) {
            // Tangani kesalahan
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center h-[100%] p-3">
                <div>
                    <h1 className="text-2xl font-bold">Absen pegawai</h1>
                    <form
                        action="#"
                        className="form-group mt-10"
                        onSubmit={handleSubmitCSRF}
                    >
                        <input type="hidden" name="_token" value={csrfToken} />
                        <label>Nama</label>
                        <br />
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value="Admin"
                            disabled
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

                        <div className="photo">
                            <video className="container" ref={videoRef}></video>
                            <button
                                type="button"
                                onClick={takePicture}
                                className="btn btn-success w-full"
                            >
                                Take Photo
                            </button>
                            <canvas
                                className="container"
                                ref={photoRef}
                            ></canvas>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileInputChange}
                                    style={{ display: "none" }}
                                />
                                {/* <label className="btn btn-primary">
                                    Browse
                                    <input
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current.click()
                                        }
                                        style={{ display: "none" }}
                                    />
                                </label>
                                <div>Selected File: {selectedFileName}</div> */}
                            </div>
                            {/* <button
                                onClick={clearImg}
                                className="btn btn-error w-full text-white"
                            >
                                Clear Image
                            </button> */}
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
