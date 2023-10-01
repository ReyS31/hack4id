const CategoryRepository = require('../CategoryRepository');

describe('CategoryRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const categoryRepository = new CategoryRepository();

    // Action & Assert
    await expect(categoryRepository.addCategory({})).rejects.toThrowError(
      'CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      categoryRepository.checkAvailabilityName(''),
    ).rejects.toThrowError('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(categoryRepository.deleteCategory('')).rejects.toThrowError(
      'CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(categoryRepository.verifyCategoryExists('')).rejects.toThrowError(
      'CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      categoryRepository.updateCategory('', {}),
    ).rejects.toThrowError('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
