import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../utils/Theme';

export const SearchStyled = {
  Input: styled.TextInput`
    color: ${colors.searchAndWriting};
    background-color: transparent;
    padding-left: 5px;
    flex: 1;
    height: 30px;
  `,
  Container: styled(KeyboardAvoidingView)`
    flex: 1;
  `,
  Content: styled.View`
    background-color: ${colors.background};
    flex: 1;
    flex-direction: column;
  `,
  MoviesContainer: styled.ScrollView`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-basis: 0;
    gap: 10px;
    margin: 10px;
  `,
};
