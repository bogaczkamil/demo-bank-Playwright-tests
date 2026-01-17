import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  transferReceiverInput: Locator;
  receiverAccountInput: Locator;
  transferAmountInput: Locator;
  transferButton: Locator;
  closeButton: Locator;
  sideMenu: SideMenuComponent;
  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);

    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.receiverAccountInput = this.page.getByTestId('form_account_to');
    this.transferAmountInput = this.page.getByTestId('form_amount');
    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.closeButton = this.page.getByTestId('close-button');
  }
  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.receiverAccountInput.fill(transferAccount);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferButton.click();
    await this.closeButton.click();
  }
}
