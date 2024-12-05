import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../utils/Theme';

export const HomeStyled = {
  Input: styled.TextInput`
    color: ${colors.searchAndWriting};
    background-color: transparent;
    padding-left: 5px;
    flex: 1;
  `,
  Container: styled(KeyboardAvoidingView)`
    flex: 1;
  `,
  Content: styled.View`
    background-color: ${colors.background};
    flex: 1;
    flex-direction: column;
  `,
};
