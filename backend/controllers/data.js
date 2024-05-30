const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const kmeans = require("node-kmeans");
const scaleToRange = require("../utils/scaleToRange");

// Upload file handler
const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file part" });
  }

  const filePath = req.file.path;
  const originalFileName = "data.csv";
  const newFilePath = path.join(
    __dirname,
    "../static/uploads",
    originalFileName
  );

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

// Calculate RFM values
const calculateRFM = (filePath, todayDate) => {
  return new Promise((resolve, reject) => {
    const rfm = {};
    let num_rows = 0;
    let total_recency = 0;
    let total_frequency = 0;
    let total_monetary = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        num_rows++;
        const invoice_date = new Date(row.InvoiceDate);
        const recency = Math.floor(
          (todayDate - invoice_date) / (1000 * 60 * 60 * 24)
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
          return reject(new Error("Dataset is empty. Please check your data"));
        }

        const avg_recency = total_recency / num_rows;
        const avg_frequency = total_frequency / num_rows;
        const avg_monetary = total_monetary / num_rows;

        const rfm_array = Object.values(rfm).map((entry) => [
          entry.Recency,
          entry.Frequency,
          entry.Monetary,
        ]);

        resolve({ rfm_array, avg_recency, avg_frequency, avg_monetary });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

// Scale RFM values to the range 1-5
const scaleRFM = (rfmArray) => {
  const minRecency = Math.min(...rfmArray.map((entry) => entry[0]));
  const maxRecency = Math.max(...rfmArray.map((entry) => entry[0]));
  const minFrequency = Math.min(...rfmArray.map((entry) => entry[1]));
  const maxFrequency = Math.max(...rfmArray.map((entry) => entry[1]));
  const minMonetary = Math.min(...rfmArray.map((entry) => entry[2]));
  const maxMonetary = Math.max(...rfmArray.map((entry) => entry[2]));

  return rfmArray.map((entry) => [
    scaleToRange(entry[0], minRecency, maxRecency),
    scaleToRange(entry[1], minFrequency, maxFrequency),
    scaleToRange(entry[2], minMonetary, maxMonetary),
  ]);
};

// Perform K-Means clustering
const performClustering = (scaledRFMArray, k) => {
  return new Promise((resolve, reject) => {
    kmeans.clusterize(scaledRFMArray, { k }, (err, result) => {
      if (err) {
        return reject(err);
      }

      const clusters = result.map((cluster) => cluster.clusterInd);
      resolve(clusters);
    });
  });
};

// Process data handler
const processData = async (req, res) => {
  const filePath = "./static/uploads/data.csv";
  const todayDate = new Date(req.body.date || Date.now());
  const k = req.body.k || 4;

  try {
    const { rfm_array, avg_recency, avg_frequency, avg_monetary } =
      await calculateRFM(filePath, todayDate);

    const scaledRFMArray = scaleRFM(rfm_array);

    const clusters = await performClustering(scaledRFMArray, k);

    const resultJSON = {
      rfm_statistics: scaledRFMArray,
      averages: {
        avg_recency,
        avg_frequency,
        avg_monetary,
      },
      clusters,
    };

    res.json(resultJSON);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadFile, processData };
