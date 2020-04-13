import styled from "styled-components";
import { Button } from "@material-ui/core";


export const MeetingActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MeetingActionButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`;

export const MeetingActionButton = styled(Button)`
  width: 100%;
`
