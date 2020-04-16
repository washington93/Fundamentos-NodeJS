import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}
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
    let income = 0;
    this.transactions.forEach(t => {
      if (t.type === 'income') {
        income += t.value;
      }
    });
    let outcome = 0;
    this.transactions.forEach(t => {
      if (t.type === 'outcome') {
        outcome += t.value;
      }
    });
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
