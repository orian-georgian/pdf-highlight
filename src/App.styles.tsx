import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  align-self: flex-start;
  height: 100vh;
  overflow-y: auto;
  padding: 1rem 0.5rem;
  max-width: 420px;
  flex: 1;
  overflow-x: hidden;
`;

export const ContentContainer = styled.div`
  padding: 1rem 0;
`;