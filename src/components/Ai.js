import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";

const Ai = () => {
  const [receiptFile, setReceiptFile] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => setReceiptFile(acceptedFiles[0]),
  });

  const handleFileUpload = async () => {
    if (!receiptFile) {
      alert("Please upload a receipt file.");
      return;
    }

    try {
      const { data: { text } } = await Tesseract.recognize(receiptFile, "eng", {
        logger: (info) => console.log(info)
      });

      const extractedNumber = extractInvoiceNumber(text);
      setInvoiceNumber(extractedNumber || "Invoice number not found.");
    } catch (error) {
      console.error("Error during text recognition:", error);
      setInvoiceNumber("Failed to retrieve invoice number. Please try again.");
    }
  };

  const extractInvoiceNumber = (text) => {
    const lines = text.split("\n");
    let invoiceNumber = "";

    for (let line of lines) {
      if (line.toLowerCase().includes("invoice number") || line.toLowerCase().includes("shipment number")) {
        invoiceNumber = line.split(":")[1]?.trim() || "";
        if (invoiceNumber) break;
      }
    }

    if (!invoiceNumber) {
      const match = text.match(/\d+/);
      invoiceNumber = match ? match[0] : "No number found";
    }

    return invoiceNumber;
  };

  return (
    <div style={{ padding: "10px", textAlign: "center", fontSize: "0.9rem" }}>
      <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Upload Shipment Receipt</h3>
      <div {...getRootProps({ className: "dropzone" })} style={{ border: "1px dashed #8c52ff", padding: "15px", borderRadius: "8px", fontSize: "0.8rem", maxWidth: "800px", margin: "0 auto" }}>
        <input {...getInputProps()} />
        {receiptFile ? <p3>{receiptFile.name}</p3> : <p2>Drag and drop your receipt image here, or click to select a file</p2>}
      </div>
      <button onClick={handleFileUpload} style={{ marginTop: "0px", backgroundColor: "#8c52ff", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "0.8rem" }}>
        Retrieve Invoice Number
      </button>
      {invoiceNumber && (
        <div style={{ marginTop: "0px", color: "green", fontSize: "0.85rem" }}>
          <p>{`Invoice Number: ${invoiceNumber}`}</p>
        </div>
      )}
    </div>
  );
};

export default Ai;
