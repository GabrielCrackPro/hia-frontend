/* eslint-disable no-unused-vars */
import { Alert, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { postData, putData } from "../../utils";
import Navbar from "../Navbar/Navbar";
import Titlebar from "../Titlebar/TitleBar";
import AddIcon from "@mui/icons-material/Add";

const CreateForm = () => {
  const { type } = useParams();
  const loggedUser = JSON.parse(localStorage.getItem("USER"));

  const [isAlertShown, setIsAlertShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const [inputError, setInputError] = useState(false);

  if (type == "item") {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemType, setItemType] = useState("item_type");
    const [itemRoom, setItemRoom] = useState("item_room");
    const handleItemNameChange = (event) => {
      setItemName(event.target.value);
    };
    const handleItemDescriptionChange = (event) => {
      setItemDescription(event.target.value);
    };
    const handleItemTypeChange = (event) => {
      setItemType(event.target.value);
    };
    const handleItemRoomChange = (event) => {
      setItemRoom(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const item = {
        name: itemName,
        description: itemDescription,
        type: itemType,
        location: itemRoom,
        // eslint-disable-next-line camelcase
        created_at: new Date(),
        // eslint-disable-next-line camelcase
        updated_at: new Date()
      };
      if (itemName == "" || itemDescription == "" || itemType == "item_type") {
        setIsAlertShown(true);
        setAlertSeverity("error");
        setAlertMessage("Fill all the gaps");
        setInputError(true);
        setTimeout(() => {
          setIsAlertShown(false);
          setInputError(false);
        }, 1500);
      } else {
        (async () => {
          const response = await postData("http://127.0.0.1:3001/api/v1/items", item);
          if (response.message == "Item created successfully") {
            setAlertSeverity("success");
            setAlertMessage(`${response.item.name} added successfully`);
            loggedUser.items.push(item);
            localStorage.setItem("USER", JSON.stringify(loggedUser));
            putData(`http://127.0.0.1:3001/api/v1/users/${loggedUser["_id"]}`, loggedUser);
            setTimeout(() => location.pathname = "/home", 1500);
          } else {
            setAlertSeverity("error");
            setAlertMessage(`${type} already exists`);
          }
        })();
        setIsAlertShown(true);
        setTimeout(() => setIsAlertShown(false), 1500);
      }
    };
    return (
      <>
        <Titlebar />
        {isAlertShown ? <Alert severity={alertSeverity} variant="filled" sx={{ marginTop: "10px" }} hidden={true}>{alertMessage}</Alert> : ""}
        <Navbar value="items" />
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h4" textAlign="center" marginTop="5px" marginBottom="5px">Create new {type}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField variant="filled" label="Item name" size="small" autoComplete="false" spellCheck="false" fullWidth error={inputError} sx={{ marginBottom: "20px" }} onChange={handleItemNameChange} />
            <TextField variant="filled" label="Item description" size="medium" autoComplete="false" spellCheck="false" multiline fullWidth error={inputError} onChange={handleItemDescriptionChange} />
            <Select value={itemRoom} variant="filled" sx={{ marginTop: "15px" }} size="small" fullWidth error={inputError} onChange={handleItemRoomChange}>
              <MenuItem value="item_room">Select Room</MenuItem>
              {
                loggedUser.locations.map((location) => {
                  return <MenuItem value={location.room}>{location.room}</MenuItem>;
                })
              }
            </Select>
            <Select value={itemType} variant="filled" sx={{ marginTop: "15px" }} size="small" fullWidth error={inputError} onChange={handleItemTypeChange}>
              <MenuItem value="item_type" disabled>Select Item Type</MenuItem>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="drink">Drink</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothes">Clothes</MenuItem>
              <MenuItem value="bags">Bags</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            <Button variant="contained" type="submit" fullWidth sx={{ marginTop: "20px" }}><AddIcon /> Create</Button>
          </form>
        </Box>
      </>
    );
  } else if (type == "shop") {
    const [shopName, setShopName] = useState("");
    const [shopDescription, setShopDescription] = useState("");
    const [shopType, setShopType] = useState("shop_type");
    const [shopAddress, setShopAddress] = useState("");
    const [shopSchedule, setShopSchedule] = useState("shop_schedule");

    const handleShopNameChange = (event) => {
      setShopName(event.target.value);
    };
    const handleShopDescriptionChange = (event) => {
      setShopDescription(event.target.value);
    };
    const handleShopTypeChange = (event) => {
      setShopType(event.target.value);
    };
    const handleShopAddressChange = (event) => {
      setShopAddress(event.target.value);
    };
    const handleShopScheduleChange = (event) => {
      setShopSchedule(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const shop = {
        name: shopName,
        description: shopDescription,
        type: shopType,
        address: shopAddress,
        schedule: shopSchedule,
        // eslint-disable-next-line camelcase
        created_at: new Date(),
        // eslint-disable-next-line camelcase
        updated_at: new Date()

      };
      if (shopName == "" || shopDescription == "" || shopType == "" || shopAddress == "" || shopSchedule == "") {
        setIsAlertShown(true);
        setAlertSeverity("error");
        setAlertMessage("Fill all the gaps");
        setInputError(true);
        setTimeout(() => {
          setIsAlertShown(false);
          setInputError(false);
        }, 1500);
      } else {
        (async () => {
          const response = await postData("http://127.0.0.1:3001/api/v1/shops", shop);
          if (response.message == "Shop created successfully") {
            setAlertSeverity("success");
            setAlertMessage(`${response.shop.name} added successfully`);
            loggedUser.shops.push(shop);
            localStorage.setItem("USER", JSON.stringify(loggedUser));
            putData(`http://127.0.0.1:3001/api/v1/users/${loggedUser["_id"]}`, loggedUser);
            setTimeout(() => location.pathname = "/home", 1500);
          } else {
            setIsAlertShown(true);
            setAlertSeverity("error");
            setAlertMessage(`${type} already exists`);
            setTimeout(() => setIsAlertShown(false), 1500);
          }
        })();
      }
    };
    return (
      <>
        <Titlebar />
        {isAlertShown ? <Alert severity={alertSeverity} variant="filled" sx={{ marginTop: "10px" }} hidden={true}>{alertMessage}</Alert> : ""}
        <Navbar value="shops" />
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h4" textAlign="center" marginTop="5px" marginBottom="5px">Create new {type}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField variant="filled" label="Shop Name" size="small" autoComplete="false" spellCheck="false" fullWidth error={inputError} sx={{ marginBottom: "20px" }} onChange={handleShopNameChange} />
            <TextField variant="filled" label="Shop Description" size="small" autoComplete="false" spellCheck="false" multiline fullWidth error={inputError} sx={{ marginBottom: "20px" }} onChange={handleShopDescriptionChange} />
            <TextField variant="filled" label="Shop Address" size="small" autoComplete="false" spellCheck="false" fullWidth error={inputError} onChange={handleShopAddressChange} />
            <Select value={shopType} variant="filled" size="small" fullWidth error={inputError} sx={{ marginTop: "20px" }} onChange={handleShopTypeChange}>
              <MenuItem value="shop_type" disabled>Select Shop Type</MenuItem>
              <MenuItem value="physical">Physical</MenuItem>
              <MenuItem value="online">Online</MenuItem>
            </Select>
            <Select value={shopSchedule} variant="filled" size="small" fullWidth error={inputError} onChange={handleShopScheduleChange}>
              <MenuItem value="shop_schedule" disabled>Select Shop Schedule</MenuItem>
              <MenuItem value="everyday">Everyday</MenuItem>
              <MenuItem value="week">Week</MenuItem>
              <MenuItem value="weekend">Weekend</MenuItem>
            </Select>
            <Button variant="contained" type="submit" fullWidth sx={{ marginTop: "20px" }}><AddIcon /> Create</Button>
          </form>
        </Box>
      </>
    );
  } else if (type == "location") {
    const [locationName, setLocationName] = useState("");
    const [locationDescription, setLocationDescription] = useState("");
    const [locationRoom, setLocationRoom] = useState("");
    const handleLocationNameChange = (event) => {
      setLocationName(event.target.value);
    };
    const handleLocationDescriptionChange = (event) => {
      setLocationDescription(event.target.value);
    };
    const handleLocationRoomChange = (event) => {
      setLocationRoom(event.target.value);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      const location = {
        name: locationName,
        description: locationDescription,
        room: locationRoom,
        // eslint-disable-next-line camelcase
        created_at: new Date(),
        // eslint-disable-next-line camelcase
        updated_at: new Date()

      };
      if (locationName == "" || locationDescription == "" || locationRoom == "") {
        setIsAlertShown(true);
        setInputError(true);
        setAlertSeverity("error");
        setAlertMessage("Fill all the gaps");
        setInputError(true);
        setTimeout(() => {
          setIsAlertShown(false);
          setInputError(false);
        }, 1500);
      } else {
        (async () => {
          const response = await postData("http://127.0.0.1:3001/api/v1/locations", location);
          if (response.message == "Location created successfully") {
            setAlertSeverity("success");
            setAlertMessage(`${response.location.name} added successfully`);
            loggedUser.locations.push(location);
            localStorage.setItem("USER", JSON.stringify(loggedUser));
            putData(`http://127.0.0.1:3001/api/v1/users/${loggedUser["_id"]}`, loggedUser);
            setTimeout(() => window.location.pathname = "/home", 1500);
          } else {
            setIsAlertShown(true);
            setAlertSeverity("error");
            setAlertMessage(`${type} already exists`);
          }
          setTimeout(() => setIsAlertShown(false), 1500);
        })();
      }
    };
    return (
      <>
        <Titlebar />
        {isAlertShown ? <Alert severity={alertSeverity} variant="filled" sx={{ marginTop: "10px" }} hidden={true}>{alertMessage}</Alert> : ""}
        <Navbar value="locations" />
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h4" textAlign="center" marginTop="5px" marginBottom="5px">Create new {type}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField variant="filled" label="Location Name" size="small" autoComplete="false" spellCheck="false" fullWidth error={inputError} sx={{ marginBottom: "20px" }} onChange={handleLocationNameChange} />
            <TextField variant="filled" label="Location Description" size="small" autoComplete="false" spellCheck="false" multiline fullWidth error={inputError} sx={{ marginBottom: "20px" }} onChange={handleLocationDescriptionChange} />
            <TextField variant="filled" label="Location Room" size="small" autoComplete="false" spellCheck="false" fullWidth error={inputError} onChange={handleLocationRoomChange} />
            <Button variant="contained" type="submit" fullWidth sx={{ marginTop: "20px" }}><AddIcon /> Create</Button>
          </form>
        </Box>
      </>
    );

  };
};
export default CreateForm;
