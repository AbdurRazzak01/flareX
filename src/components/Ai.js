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

    // First, try to find a line containing 'invoice number' or 'shipment number'
    for (let line of lines) {
      if (line.toLowerCase().includes("invoice number") || line.toLowerCase().includes("shipment number")) {
        invoiceNumber = line.split(":")[1]?.trim() || "";
        if (invoiceNumber) break;
      }
    }

    // If not found, extract any number as a fallback
    if (!invoiceNumber) {
      const match = text.match(/\d+/); // Find any number in the text
      invoiceNumber = match ? match[0] : "No number found";
    }

    return invoiceNumber;
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Upload Shipment Receipt</h3>
      <div {...getRootProps({ className: "dropzone" })} style={{ border: "2px dashed #8c52ff", padding: "20px", borderRadius: "10px" }}>
        <input {...getInputProps()} />
        {receiptFile ? <p>{receiptFile.name}</p> : <p>Drag and drop your receipt image here, or click to select a file</p>}
      </div>
      <button onClick={handleFileUpload} style={{ marginTop: "15px", backgroundColor: "#8c52ff", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Retrieve Invoice Number
      </button>
      {invoiceNumber && (
        <div style={{ marginTop: "15px", color: "green" }}>
          <p>{`Invoice Number: ${invoiceNumber}`}</p>
        </div>
      )}
    </div>
  );
};

export default Ai;
