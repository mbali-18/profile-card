const getPredictedAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io?name=${name}`);
  const data = await res.json();
  return data;
};
const getPredictedGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io?name=${name}`);
  const data = await res.json();
  return data;
};
const getPredictedCountry = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io?name=${name}`);
  const data = await res.json();
  return data;
};

interface Params {
  params: { name: string };
}

export default async function Page({ params }: Params) {
  const ageData = getPredictedAge(params.name);
  const genderData = getPredictedGender(params.name);
  const countryData = getPredictedCountry(params.name);

  const [age, gender, country] = await Promise.all([
    ageData,
    genderData,
    countryData,
  ]);

  const { name } = params;
  return (
    <div>
      <div>
        <div> Personal Info</div>
        <div>Name: {name}</div>
        <div>Age: {age?.age}</div>
        <div>Gender: {gender?.gender}</div>
        <div>Country: {country?.country?.[0]?.country_id}</div>
      </div>
    </div>
  );
}
