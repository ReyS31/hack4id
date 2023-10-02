/* eslint-disable no-unused-vars */
class ProductRepository {
  async pagination(productQuery) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getById(id) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addProduct(addProduct) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateProduct(id, data) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteProduct(id) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyProductExists(id) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ProductRepository;
