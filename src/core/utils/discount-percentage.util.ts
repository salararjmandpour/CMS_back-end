//  Calculate discount percentage
export const calculateDiscountPercentage = (
  regularPrice: number,
  discountedPrice: number,
): number => {
  const discountAmount = regularPrice - discountedPrice;
  return Math.round((discountAmount / regularPrice) * 100);
};
