import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getTypeValue('income');
    const outcome = this.getTypeValue('outcome');

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  private getTypeValue(type: 'income' | 'outcome'): number {
    return this.transactions.reduce(
      (total, transaction) => this.getTypeSum(total, transaction, type),
      0,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private getTypeSum(
    total: number,
    transaction: Transaction,
    type: 'income' | 'outcome',
  ): number {
    return type === transaction.type ? total + transaction.value : total;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}
export default TransactionsRepository;
