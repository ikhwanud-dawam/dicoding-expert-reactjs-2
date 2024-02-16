import React from 'react';
import { HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ChipItem from './ChipItem';

export default function ChipsList({
  chips,
  selectedCategory,
  onCategoryClick,
}) {
  const uniqueCategory = chips.filter(
    (value, index, self) => index === self.findIndex((chip) => chip.category === value.category),
  );

  return (
    <HStack mt="1rem" wrap="wrap">
      {uniqueCategory.map((chip) => (
        <ChipItem
          key={chip.id}
          isSelected={selectedCategory === chip.category}
          onCategoryClick={onCategoryClick}
          category={chip.category}
        />
      ))}
    </HStack>
  );
}

const chipShape = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

ChipsList.defaultProps = {
  selectedCategory: false,
};

ChipsList.propTypes = {
  chips: PropTypes.arrayOf(PropTypes.shape(chipShape)).isRequired,
  selectedCategory: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
};
