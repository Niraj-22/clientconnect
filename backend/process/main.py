import pandas as pd
import numpy as np
import json
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

def segment_customers(data):
    # Preprocess the data by removing negative values and converting necessary columns to integer data type
    data = data[(data['Quantity'] > 0) & (data['UnitPrice'] > 0)]
    data['CustomerID'] = data['CustomerID'].astype(np.int64)
    data['Invoice'] = data['Invoice'].astype(np.int64)

    # Calculate the RFM matrix
    if 'CustomerID' in data.columns:
        rfm = data.groupby('CustomerID').agg({
            'InvoiceDate': lambda x: (snapshot_date - x.max()).days,
            'InvoiceNo': 'nunique',
            'Total': 'sum'
        })
    else:
        rfm = data.groupby('Invoice').agg({
            'InvoiceDate': lambda x: (snapshot_date - x.max()).days,
            'InvoiceNo': 'nunique',
            'Total': 'sum'
        })

    # Define the reference date
    snapshot_date = max(data['InvoiceDate']) + pd.DateOffset(days=1)

    # Calculate the recency, frequency, and monetary value
    rfm['Recency'] = snapshot_date - rfm.index.to_series().apply(lambda x: data[data.index.get_level_values(0) == x]['InvoiceDate'].max())
    rfm['Frequency'] = data.groupby(rfm.index)['InvoiceNo'].nunique()
    rfm['MonetaryValue'] = data.groupby(rfm.index)['Total'].sum()

    # Standardize the data
    scaler = StandardScaler()
    rfm_std = scaler.fit_transform(rfm[['Recency', 'Frequency', 'MonetaryValue']])

    # Apply PCA to reduce the dimensionality of the data
    pca = PCA()
    pca.fit(rfm_std)

    # Apply k-means clustering on the reduced data
    kmeans = KMeans(n_clusters=4, init='k-means++', random_state=42)
    rfm_pca = pca.transform(rfm_std)
    kmeans.fit(rfm_pca)

    # Add the segment labels to the original data
    data['Segment'] = kmeans.labels_

    # Return the segmented data as a JSON object
    segmented_data = data[['CustomerID', 'Segment']].drop_duplicates()
    segmented_data_json = segmented_data.to_json(orient='records')
    segmented_data_dict = json.loads(segmented_data_json)

    return segmented_data_dict