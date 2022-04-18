/**
 * @openapi
 * components:
 *  schemas:
 *    Payment:
 *      type: object
 *      properties:
 *        payments_id:
 *          type: number
 *        payments_ammountPaid:
 *          type: number
 *        payments_status:
 *          type: string
 *        payments_studentId:
 *          type: number
 *        payments_discountId:
 *          type: number
 *        payments_invoiceId:
 *          type: number
 *        payments_courseId:
 *          type: number
 *        invoices_id:
 *          type: number
 *        invoices_series:
 *          type: string
 *        invoices_number:
 *          type: number
 *        invoices_date:
 *          type: string
 *          format: date-time
 *        invoices_type:
 *          type: string
 *        invoices_currencyType:
 *          type: string
 *        courses_name:
 *          type: string
 *
 *    Discount:
 *      type: object
 *      properties:
 *        discounts_id:
 *          type: number
 *        discounts_date:
 *          type: string
 *          format: date-time
 *        discounts_taxType:
 *          type: string
 *        discounts_discountAmmount:
 *          type: number
 *        discounts_details:
 *          type: string
 *        discounts_status:
 *          type: string
 */
