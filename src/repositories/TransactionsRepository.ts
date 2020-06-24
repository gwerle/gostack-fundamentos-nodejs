import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    return this.transactions.reduce(
      (accumulator, currentValue) => {
        const income =
          currentValue.type === 'income'
            ? accumulator.income + currentValue.value
            : accumulator.income;
        const outcome =
          currentValue.type === 'outcome'
            ? accumulator.outcome + currentValue.value
            : accumulator.outcome;

        return {
          income,
          outcome,
          total: income - outcome,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
