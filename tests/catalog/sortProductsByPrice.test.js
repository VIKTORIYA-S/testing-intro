const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products);
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const selected = products.filter(({ id }) => [1, 3, 4].includes(id));
    const result = sortProductsByPrice(selected, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const arr = [products[2], products[0], products[3]];
    const result = sortProductsByPrice(arr, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const arr = [products[4], products[1], products[5]];
    const result = sortProductsByPrice(arr, 'desc');
    expect(result.map((product) => product.id)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const arr = products.filter(({ id }) => [1, 3, 4].includes(id));
    sortProductsByPrice(arr, 'asc');
    expect(arr.map((product) => product.id)).toEqual([1, 3, 4]);
  });

   test("'desc' не меняет исходный массив [1, 3, 4]", () => {
     const arr = products.filter(({ id }) => [1, 3, 4].includes(id));
     sortProductsByPrice(arr, 'desc');
     expect(arr.map((product) => product.id)).toEqual([1, 3, 4]);
   });

  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    sortProductsByPrice(products);
    expect(products.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
