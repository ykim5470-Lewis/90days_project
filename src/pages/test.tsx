import styled from "styled-components";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function test(sessionResponseResult) {
  console.log("Test Page sessionResponseResult", sessionResponseResult);
  return (
    <div>
      <Title>My page</Title>
    </div>
  );
}
