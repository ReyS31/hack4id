const ProductRepository = require('../ProductRepository');

describe('ProductRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const productRepository = new ProductRepository();

    // Action & Assert
    await expect(productRepository.pagination({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(productRepository.getById('')).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(productRepository.addProduct({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(productRepository.updateProduct('', {})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(productRepository.deleteProduct('')).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(productRepository.verifyProductExists('')).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
