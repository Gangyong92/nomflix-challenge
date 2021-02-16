import styled from "styled-components";
import Message from "Components/Message";

const Container = styled.div`
  display: flex;
`;
const Grid = styled.div`
  width: 65%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max-content, 100px));
  gap: 20px;
`;

const Flag = styled.div`
  background-image: url(${(props) => props.flatFlag});
  background-size: cover;
  border-radius: 4px;
  background-position: center;
  height: 64px;
  width: 64px;
  transition: background-image 0.3s ease-in-out;
  &:hover {
    background-image: url(${(props) => props.shinyFlag});
  }
`;

const Countries = (props) => {
  const countries = props.countries;

  return (
    <Container>
      {countries && countries.length > 0 ? (
        <Grid>
          {countries.map((country, index) => (
            <Flag
              key={index}
              flatFlag={`https://www.countryflags.io/${country.iso_3166_1}/flat/64.png`}
              shinyFlag={`https://www.countryflags.io/${country.iso_3166_1}/shiny/64.png`}
            />
          ))}
        </Grid>
      ) : (
        <Message color="#e74c3c" text="Countries do not exist" />
      )}
    </Container>
  );
};

export default Countries;
