const getDataPolling = async () => {
  const response = await fetch(process.env.REACT_APP_LINK_API + "poll");
  const dataJson = await response.json();

  return dataJson;
};

export default getDataPolling;
