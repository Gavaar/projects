import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Auth } from '../../auth';
import { Income } from './transaction-add.component';

@Injectable()
export class TransactionAddService {
  constructor(private auth: Auth, private db: AngularFirestore) {}

  submitTransaction({ amount, description, tags: _tags }: Income) {
    const uid = this.auth.uid;
    const tags = _tags.split(',').map(t => t.trim());
    const incomesRef = this.db.doc(`incomes/${uid}`);

    incomesRef
      .collection('income')
      .add({
        amount,
        description,
        date_added: new Date(),
        tags: tags.reduce((g, t) => {
          g[t] = true;
          return g;
        }, {}),
      })
      .then(incomeId => {
        this.addIncomeToTags(tags, incomeId.id);
        this.addIncomeToYearly(incomeId.id);
      });
  }

  private addIncomeToTags(_tags: string[], incomeId: string): void {
    const uid = this.auth.uid;
    const incomeTagRef = this.db.doc(`incomes/${uid}`).collection('tag');

    _tags.forEach(tag => {
      incomeTagRef.doc(tag).set({ [incomeId]: true }, { merge: true });
    });
  }

  private addIncomeToYearly(incomeId: string) {
    const uid = this.auth.uid;
    const date = new Date();
    this.db
      .doc(`incomes/${uid}`)
      .collection('yearly')
      .doc(`${date.getFullYear()}`)
      .collection('monthly')
      .doc(`${date.getMonth()}`)
      .set({ [incomeId]: true }, { merge: true });
  }
}