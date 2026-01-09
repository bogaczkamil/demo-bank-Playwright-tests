import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  transferReceiverInput: Locator;
  receiverAccountInput: Locator;
  transferAmountInput: Locator;
  transferButton: Locator;
  closeButton: Locator;

  constructor(private page: Page) {
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.receiverAccountInput = this.page.getByTestId('form_account_to');
    this.transferAmountInput = this.page.getByTestId('form_amount');
    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.closeButton = this.page.getByTestId('close-button');
  }
}
