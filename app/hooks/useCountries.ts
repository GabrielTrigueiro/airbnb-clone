import countries from "world-countries";

//listar todos os paises neste array de objetos
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}));

//hook
const useCountries = () => {

  //retorna todos os paises
  const getAll = () => formattedCountries;

  //país em especifico
  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;