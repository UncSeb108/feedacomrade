const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const moment = require("moment");

const generateReceipt = ({ name, amount, receipt, date }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const filename = `receipt_${receipt}.pdf`;
    const filePath = path.join(__dirname, "../receipts", filename);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(20).text("Donation Receipt", { align: "center" });
    doc.moveDown();

    // Body
    doc.fontSize(12).text(`Donor Name: ${name}`);
    doc.text(`Receipt No: ${receipt}`);
    doc.text(`Amount: KES ${amount}`);
    doc.text(`Date: ${moment(date).format("MMMM Do YYYY, h:mm a")}`);

    doc.moveDown();
    doc.text("Thank you for supporting FeedTheirFuture!", {
      align: "center",
    });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};

module.exports = generateReceipt;
