// Navigation utility functions for product routing

/**
 * Generates the product detail URL for a given product ID
 * @param productId - The unique identifier for the product
 * @returns The URL path for the product detail page
 */
export const getProductDetailUrl = (productId: string): string => {
  return `/product/${productId}`;
};

/**
 * Checks if a product should navigate to a dedicated detail page
 * Currently only the Majestic Persian Masterpiece has a dedicated page
 * @param productId - The unique identifier for the product
 * @returns True if the product has a dedicated detail page
 */
export const hasDetailedPage = (productId: string): boolean => {
  const productsWithDetailPages = ['rug-001']; // Majestic Persian Masterpiece (sequential ID)
  return productsWithDetailPages.includes(productId);
};

/**
 * Gets the product name by ID for navigation purposes
 * @param productId - The unique identifier for the product
 * @returns The product name or null if not found
 */
export const getProductNameById = (productId: string): string | null => {
  const productMap: Record<string, string> = {
    'rug-001': 'Majestic Persian Masterpiece'
  };
  
  return productMap[productId] || null;
};