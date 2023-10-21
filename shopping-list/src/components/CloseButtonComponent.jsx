// CloseButtonComponent.jsx
import { CloseButton } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CloseButtonComponent = ({ recipeId, handleRecipeDeletion }) => {
  return (
    <CloseButton
      onClick={() => {
        handleRecipeDeletion(recipeId);
      }}
      zIndex={2}
      position="absolute"
      top={2}
      right={2}
      size="lg"
      background={"#D9CDC7"}
      fontWeight={"bold"}
    />
  );
};

CloseButtonComponent.propTypes = {
  recipeId: PropTypes.string,
  handleRecipeDeletion: PropTypes.func,
};

export default CloseButtonComponent;
