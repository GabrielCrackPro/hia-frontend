const getData = async (url) => {
  const response = await fetch(url).then((data) => data.json());
  return response;
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "https://127.0.0.1:3001/",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  return response;
};

const putData = async (url, data) => {
  const response = await fetch(url, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "https://127.0.0.1:3001/",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  return response;
};

const deleteOne = async (type, id) => {
  await fetch(`http://127.0.0.1:3001/api/v1/${type}/${id}`, {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "https://127.0.0.1:3001/",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  location.pathname = "/";
  return response;
};

const getBarcodeInfo = async (code) => {
  // TODO: FIND another API
  const response = await fetch(`https://www.brocade.io/api/items/${code}`, {
    headers: {
      "mode": "cors",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  }).then((response) => response.json());
  console.log(response);
  return response;
};


const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export {
  getData,
  postData,
  putData,
  deleteOne,
  getBarcodeInfo,
  capitalize,
};
