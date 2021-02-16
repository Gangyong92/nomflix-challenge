import styled from "styled-components";
import Message from "Components/Message";

const Container = styled.div`
  display: flex;
  padding-bottom: 30px;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max-content, 350px));
  gap: 30px;
`;
const PosterArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  height: 90%;
  opacity: 0.6;
  transition: opacity 0.2s ease-in-out;
`;
const CompanyName = styled.h3`
  text-align: center;
  font-size: 16px;
  transition: font-size 0.2s ease-in-out;
`;
const Cell = styled.div`
  width: 100%;
  height: 100%;
  &:hover {
    height: 102%;
    ${PosterArea} {
      opacity: 1;
    }
    ${CompanyName} {
      font-size: 20px;
      color: rgba(0, 255, 255, 1);
      font-weight: 600;
    }
  }
`;

const Poster = styled.img``;

const Companies = (props) => {
  const companies = props.companies;

  return (
    <Container>
      {companies && companies.length > 0 ? (
        <Grid>
          {companies.map((company, index) => (
            <Cell key={index}>
              <PosterArea>
                <Poster
                  src={
                    company.logo_path
                      ? `https://image.tmdb.org/t/p/w300${company.logo_path}`
                      : require("../assets/noPosterSmall.png").default
                  }
                />
              </PosterArea>
              <CompanyName>{company.name}</CompanyName>
            </Cell>
          ))}
        </Grid>
      ) : (
        <Message color="#e74c3c" text="Companies do not exist" />
      )}
    </Container>
  );
};

export default Companies;
