import PDFDocument from "pdfkit";

interface Transaction {
  type: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export const pdfService = {
  generateMonthlyReport(transactions: Transaction[], month: number, year: number): PDFKit.PDFDocument {
    const doc = new PDFDocument({ margin: 50 });

    const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

    doc.fontSize(20).text(`Report for ${month}/${year}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Income: $${income.toFixed(2)}`);
    doc.text(`Expense: $${expense.toFixed(2)}`);
    doc.text(`Balance: $${(income - expense).toFixed(2)}`);
    doc.moveDown();

    doc.fontSize(16).text("Transactions", { underline: true });
    doc.moveDown(0.5);

    for (const tx of transactions) {
      const sign = tx.type === "income" ? "+" : "-";
      const date = new Date(tx.date).toLocaleDateString();
      doc.fontSize(11).text(`${date} | ${tx.category} | ${sign}$${tx.amount.toFixed(2)} ${tx.description ? "- " + tx.description : ""}`);
    }

    doc.end();
    return doc;
  },
};
