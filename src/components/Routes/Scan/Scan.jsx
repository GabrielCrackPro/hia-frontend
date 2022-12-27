/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Quagga from "quagga";
import Navbar from "../../Navbar/Navbar";
import Titlebar from "../../Titlebar/TitleBar";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getBarcodeInfo } from "../../../utils";
import InfoIcon from "@mui/icons-material/Info";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import useScreenSize from "../../../hooks/useScreenSize";
import "./Scan.css";

const Scan = () => {
  const [isScanActive, setIsScanActive] = useState(false);
  const [barcodeDetected, setBarcodeDetected] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [barcodeFormat, setBarcodeFormat] = useState("");
  const { isPhoneScreen, isTabletScreen } = useScreenSize();
  const stopScan = () => {
    Quagga.stop();
    setIsScanActive(false);
  };
  const scan = () => {
    setIsScanActive(true);
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#scan-box"),
        constraints: {
          width: screen.width,
          height: screen.height,
          facingMode: "environment"
        },
      },
      decoder: {
        readers: [
          // "code_128_reader",
          "ean_reader",
          // "ean_8_reader",
          // "code_39_reader",
          // "code_39_vin_reader",
          // "codabar_reader",
          // "upc_reader",
          // "upc_e_reader",
          // "i2of5_reader"
        ],
      },
    }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });
    Quagga.onProcessed((result) => {
      let drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter((box) => {
            return box !== result.box;
          }).forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "#0F0", lineWidth: 2 });
          });
        }
        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }
        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, { color: "#F00", lineWidth: 3 });
        }
      }
    });
    Quagga.onDetected((result) => {
      setBarcodeDetected(true);
      setScannedBarcode(result.codeResult.code);
      setBarcodeFormat(result.codeResult.format);
      console.log(`Barcode detected and processed : ${result.codeResult.code}`);
      setIsScanActive(false);
      stopScan();
    });
  };
  const handleCodeChange = (event) => {
    setScannedBarcode(event.target.value);
  };
  return (
    <>
      <Titlebar />
      <Navbar />
      <Typography variant="h3" textAlign="center">Scan a barcode</Typography>
      <Box id="scan-box" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}></Box>
      {barcodeDetected ?
        <>
          <form>
            <TextField label="Code" variant="filled" fullWidth value={scannedBarcode} onChange={handleCodeChange} sx={{ marginBottom: "10px" }} />
            <TextField label="Format" variant="filled" fullWidth value={barcodeFormat} sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <Button variant="contained" onClick={() => getBarcodeInfo(scannedBarcode)} sx={{ marginBottom: "10px" }}><InfoIcon /> Get code details</Button>
          </form>
        </>
        :
        ""}
      <Button variant="contained" fullWidth onClick={isScanActive ? stopScan : scan}><DocumentScannerIcon /> {isScanActive ? "Stop scan" : "Scan"}</Button>
    </>
  );
};

export default Scan;
