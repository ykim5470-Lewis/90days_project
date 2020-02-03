import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function test() {
  return (
    <div>
      <Title>My page</Title>
    </div>
  );
}
