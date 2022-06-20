const { sendResponse } = require("../utils/response");
const stockService = require("../services/stocks.service");

const getStocks = async (req, res, next) => {
  const data = await stockService.getStocks(req.query);

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const getStock = async (req, res, next) => {
  const data = await stockService.getStock(req.params.id);

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const createStock = async (req, res, next) => {
  const data = await stockService.createStock(req.body, req.user);

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const updateStock = async (req, res, next) => {
  const data = await stockService.updateStock(
    req.params.id,
    req.body,
    req.user
  );

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const deleteStock = async (req, res, next) => {
  const data = await stockService.deleteStock(req.params.id, req.user);

  if (data instanceof Error) return next(data);

  return sendResponse({}, res);
};
const checkStockIn = async (req, res, next) => {
  const data = await stockService.checkStockIn(req.body.productId);

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};
const checkStockOut = async (req, res, next) => {
  const data = await stockService.checkStockOut(req.body.productId);
  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};
const checkStockAvailable = async (req, res, next) => {
  const data = await stockService.checkStockAvailable(req.body.productId);
  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

module.exports = {
  getStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
  checkStockIn,
  checkStockOut,
  checkStockAvailable,
};
