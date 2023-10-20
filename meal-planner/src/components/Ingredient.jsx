import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Checkbox, Text, SimpleGrid } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import Navigation from "./NavBar";

function Ingredient({ ingredient }) {
  const [ingredientData, setIngredientData] = useState(ingredient);

  useEffect(() => {
    setIngredientData(ingredient);
  }, [ingredient]);

  const markAsShopped = async (ingredientId, isShopped) => {
    await axios.put(
      `http://localhost:3000/ingredients/markShopped/${ingredientId}`,
      {
        isShopped: !isShopped,
      }
    );

    const updatedData = ingredientData.map((item) =>
      item._id === ingredientId ? { ...item, isShopped: !item.isShopped } : item
    );

    setIngredientData(updatedData);
  };

  return (
    <>
      <Navigation isIngredientPage={true} />
      <Box
        padding="2"
        background="white"
        borderRadius="lg"
        boxShadow="lg"
        maxW={"xl"}
        mx="auto"
        mt="10"
      >
        <AnimatePresence>
          <SimpleGrid columns={1} spacing={4}>
            {ingredientData.map((ingredientItem, index) => (
              <motion.div
                key={ingredientItem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Box display="flex" alignItems="center">
                  <Checkbox
                    colorScheme="green"
                    size="md"
                    marginRight={2}
                    isChecked={ingredientItem.isShopped}
                    isDisabled={ingredientItem.isShopped}
                    onChange={() =>
                      markAsShopped(
                        ingredientItem._id,
                        ingredientItem.isShopped
                      )
                    }
                  >
                    <Text
                      fontSize="md"
                      textDecoration={
                        ingredientItem.isShopped ? "line-through" : "none"
                      }
                    >
                      {index + 1}. {ingredientItem.ingredientName}
                    </Text>
                  </Checkbox>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </AnimatePresence>
      </Box>
    </>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.array.isRequired,
};

export default Ingredient;
