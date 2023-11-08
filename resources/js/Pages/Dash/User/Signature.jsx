import React from "react";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const Signature = () => {
    
    return (
        <div>

            <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{
                    width: 400,
                    height: 200,
                    backgroundColor: "black"
                }}
            />
            <div className="flex flex-col lg:flex-row gap-3">
                <button
                    onClick={clearSignature}
                    className="btn btn-error text-white"
                >
                    Hapus Tanda Tangan
                </button>
                <button
                    onClick={saveSignature}
                    className="btn btn-success text-white"
                >
                    Simpan Tanda Tangan
                </button>
            </div>
        </div>
    );
};

export default Signature;
