import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  userName: Locator;
  actionMessage: Locator;
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferButton: Locator;
  closeButton: Locator;
  topupReceiverInput: Locator;
  topupAmountInput: Locator;
  topupAgreementCheckbox: Locator;
  topupExecuteButton: Locator;
  integer: Locator;
  decimal: Locator;
  sideMenu: SideMenuComponent;
  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
    this.userName = this.page.getByTestId('user-name');
    this.actionMessage = this.page.locator('#show_messages');
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.closeButton = this.page.getByTestId('close-button');
    this.topupReceiverInput = this.page.locator('#widget_1_topup_receiver');
    this.topupAmountInput = this.page.locator('#widget_1_topup_amount');
    this.topupAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.topupExecuteButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.integer = this.page.locator('#money_value');
    this.decimal = this.page.locator('#decimal_value');
  }

  async makeQuickTransfer(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.transferButton.click();
    await this.closeButton.click();
  }

  async makeMobileTopup(
    topupReceiverNumber: string,
    topupAmount: string,
  ): Promise<void> {
    await this.topupReceiverInput.selectOption(topupReceiverNumber);
    await this.topupAmountInput.fill(topupAmount);
    await this.topupAgreementCheckbox.click();
    await this.topupExecuteButton.click();
    await this.closeButton.click();
  }
}
