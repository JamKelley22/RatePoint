export const GetPOIs = async() => {
  let response = await fetch(`http://proj309-tg-03.misc.iastate.edu:8080/pois/get`)
  let data = await response.json();
  return data;
}

export const GetPOI = async(id) => {
  let response = await fetch(`http://proj309-tg-03.misc.iastate.edu:8080/pois/get${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  let data = await response.json();
  return data;
}
