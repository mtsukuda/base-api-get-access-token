/**
 * @param data
 * @returns {{orders}|*}
 */
exports.ordersPreProcessing = (data) => {
  if (!data.orders) return data;
  let preProcessingData = [];
  data.orders.forEach((row) => {
    row["ordered_format"] = new Date(row.ordered * 1000).toLocaleDateString('ja-JP');
    preProcessingData.push(row);
  });
  data.orders = preProcessingData;
  return data;
}
