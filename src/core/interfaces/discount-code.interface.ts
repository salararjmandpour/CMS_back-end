import { DiscountTypeEnum } from 'src/modules/discount-code/schemas/discount-code.schema';

export interface CreateDiscountCodeInput {
  discountCode: string;
  description?: string;
  generateDiscountCode: boolean;
  type: DiscountTypeEnum;
  discountPercentage?: number;
  expireDate: Date;
  minCost?: number;
  maxCost?: number;
  individualUse?: boolean;
  exceptBestsellerProduct?: boolean;
  products?: string[];
  exceptProducts?: string[];
  categories?: string[];
  exceptCategirues?: string[];
  maxUse?: number;
  XItemUseLimit?: number;
  userConsumptionLimit?: number;
}

export interface UpdateDiscountCodeInput
  extends Omit<CreateDiscountCodeInput, 'generateDiscountCode'> {}
