import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const List = styled.ul`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li<{ $selected: boolean }>`
  background-color: var(--color-white);
  padding: 1rem;
  cursor: pointer;
  font-size: .8rem;
  line-height: 1.3;
  color: var(--color-dark-gray);
  transition: background-color 0.2s;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  ${({ $selected }) => $selected && `
    background-color: var(--color-light-yellow);
    outline: 3px solid var(--color-dark-blue);
  `}
  &:hover {
    background-color: var(--color-light-yellow);
  }
`;