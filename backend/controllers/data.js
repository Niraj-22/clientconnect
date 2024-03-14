const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const kmeans = require("node-kmeans");
const scaleToRange = require("../utils/scaleToRange");

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file part" });
  }

  const filePath = req.file.path;

  // Get the original filename
  const originalFileName = "data.csv";

  // Construct the new destination path
  const newFilePath = path.join(
    __dirname,
    "../static/uploads",
    originalFileName
  );

  // Move the file to the new destination
  fs.rename(filePath, newFilePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save the file" });
    }
    res.json({
      success: true,
      message: "File uploaded and saved successfully",
    });
  });
};
const processData = async (req, res) => {
  // Assuming the file path is defined globally
  const file_path = "./static/uploads/data.csv";
  const today_date = new Date("2011-12-11");

  // Read the CSV file
  const rfm = {};
  let num_rows = 0;
  let total_recency = 0;
  let total_frequency = 0;
  let total_monetary = 0;

  fs.createReadStream(file_path)
    .pipe(csv())
    .on("data", (row) => {
      num_rows++;
      const invoice_date = new Date(row.InvoiceDate);
      const recency = Math.floor(
        (today_date - invoice_date) / (1000 * 60 * 60 * 24)
      );
      total_recency += recency;
      total_frequency++;
      total_monetary += row.Quantity * row.UnitPrice;

      if (!rfm[row.CustomerID]) {
        rfm[row.CustomerID] = {
          Recency: recency,
          Frequency: 1,
          Monetary: row.Quantity * row.UnitPrice,
        };
      } else {
        rfm[row.CustomerID].Recency = Math.min(
          rfm[row.CustomerID].Recency,
          recency
        );
        rfm[row.CustomerID].Frequency++;
        rfm[row.CustomerID].Monetary += row.Quantity * row.UnitPrice;
      }
    })
    .on("end", () => {
      if (num_rows === 0) {
        res
          .status(400)
          .json({ error: "Dataset is empty. Please check your data" });
        return;
      }

      // Calculate averages
      const avg_recency = total_recency / num_rows;
      const avg_frequency = total_frequency / num_rows;
      const avg_monetary = total_monetary / num_rows;

      // Convert RFM data to array for K-Means
      const rfm_array = Object.values(rfm).map((entry) => [
        entry.Recency,
        entry.Frequency,
        entry.Monetary,
      ]);
      const minRecency = Math.min(...rfm_array.map((entry) => entry[0]));
      const maxRecency = Math.max(...rfm_array.map((entry) => entry[0]));
      const minFrequency = Math.min(...rfm_array.map((entry) => entry[1]));
      const maxFrequency = Math.max(...rfm_array.map((entry) => entry[1]));
      const minMonetary = Math.min(...rfm_array.map((entry) => entry[2]));
      const maxMonetary = Math.max(...rfm_array.map((entry) => entry[2]));

      // Scale RFM data to range 1-5
      const scaled_rfm_array = rfm_array.map((entry) => [
        scaleToRange(entry[0], minRecency, maxRecency),
        scaleToRange(entry[1], minFrequency, maxFrequency),
        scaleToRange(entry[2], minMonetary, maxMonetary),
      ]);

      // Apply K-Means clustering
      kmeans.clusterize(scaled_rfm_array, { k: 4 }, (err, result) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ error: "An error occurred while clustering data" });
          return;
        }

        const clusters = result.map((cluster) => cluster.clusterInd);

        // Prepare result as JSON
        const resultJSON = {
          rfm_statistics: scaled_rfm_array,
          averages: {
            avg_recency: avg_recency,
            avg_frequency: avg_frequency,
            avg_monetary: avg_monetary,
          },
          clusters: clusters,
        };

        res.json(resultJSON);
      });
    });
};
module.exports = { uploadFile, processData };
