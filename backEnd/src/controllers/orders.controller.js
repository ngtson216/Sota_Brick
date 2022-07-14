const { sendResponse } = require("../utils/response");
const orderService = require("../services/orders.service");

const getGenderProductHasSale = async (req, res, next) => {
  const data = await orderService.getGenderProductHasSale(
    req.body.time1,
    req.body.time2
  );

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};
const checkProductHasSell = async (req, res, next) => {
  const data = await orderService.checkProductHasSell(
    req.body.productId,
    req.body.time1,
    req.body.time2
  );

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const getOrders = async (req, res, next) => {
  const data = await orderService.getOrders(req.query);

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const getOrder = async (req, res, next) => {
  const data = await orderService.getOrder(req.params.id);

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const createOrder = async (req, res, next) => {
  const data = await orderService.createOrder(req.body, req.user);

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const updateOrder = async (req, res, next) => {
  const data = await orderService.updateOrder(
    req.params.id,
    req.body,
    req.user
  );

  if (data instanceof Error) return next(data);

  return sendResponse(data, res);
};

const deleteOrder = async (req, res, next) => {
  const data = await orderService.deleteOrder(req.params.id, req.user);

  if (data instanceof Error) return next(data);

  return sendResponse({}, res);
};

module.exports = {
  checkProductHasSell,
  getGenderProductHasSale,
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
