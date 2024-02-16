import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function ChipItem({ category, isSelected, onCategoryClick }) {
  const [isActive, setIsActive] = useState(isSelected);

  useEffect(() => {
    setIsActive(isSelected);
  }, [isSelected]);

  const handleClick = () => {
    setIsActive(!isActive);
    onCategoryClick(category);
  };

  return (
    <Button
      size="sm"
      isActive={isActive}
      colorScheme="teal"
      variant="outline"
      borderRadius="full"
      onClick={handleClick}
    >
      {`#${category}`}
    </Button>
  );
}

ChipItem.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};
