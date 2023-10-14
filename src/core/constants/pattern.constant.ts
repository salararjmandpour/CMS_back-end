export const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
export const persianNationalId = /^[0-9]{10}$/;
export const jalaliDatePattern = /^\d{4}\/\d{2}\/\d{2}$/;
export const mobilePattern = /^09[0-9]{9}$/;
export const telephonePattern = /^0[0-9]{10}$/;
export const rolesPattern = /(SUPERADMIN|STOREADMIN|SUPPLIER|CUSTOMER)/i;
export const objectIdPattern = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
export const postalCodePattern = /^\d{10}$/;
export const paymentStatusPattern = /(paid|unpaid)/i;
export const genderPattern = /(male|female)/i;
export const nationalityPattern = /(iranian|foreigner)/i;
export const discountDatePattern = /^(14\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
export const productUnitPattern = /(number|package|carton|meter|centimeter|kilogram|gram)/i;
export const productWeightUnit =  /(gram|kilogram)/i;
export const productDimensionsUnit =  /(centimeter|meter)/i;
// export const datePattern = /^(13\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
