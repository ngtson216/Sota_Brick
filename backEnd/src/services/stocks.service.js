const mongoose = require("mongoose");
const { Promise } = require("bluebird");
const Stock = require("../models/Stock");
const ObjectId = mongoose.Types.ObjectId;
const UserError = require("../utils/userError");

const getStocks = async (query) => {
  try {
    let { page, limit } = query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 1000000;
    const skip = (page - 1) * limit;

    const stocks = await Stock.aggregate([
      { $match: { isDeleted: 0 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    return stocks;
  } catch (e) {
    return new UserError();
  }
};

const getStock = async (_id) => {
  try {
    const stock = await Stock.aggregate([
      {
        $match: {
          $and: [{ _id: ObjectId(_id) }],
        },
      },
    ]);

    return !!stock.length ? stock[0] : new UserError(404, "Stock Not Found");
  } catch (e) {
    return new UserError();
  }
};

const createStock = async (body, reqUser) => {
  try {
    let data;

    //  validate stockDetails
    // if (body.length === 0) return new UserError(401, "Body cannot be blank");
    const stockAvailable = await checkStockAvailable(body.productId);
    if (body.type == 0 && body.type > stockAvailable) {
      return new UserError(400, `Stock have less than ${body.quantity}`);
    }
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      // create stock
      const stock = await Stock.create(
        [
          {
            ...body,
            createdBy: reqUser._id,
          },
        ],
        { session }
      );

      data = {
        ...stock,
      };
    });

    session.endSession();

    return data || new UserError();
  } catch (e) {
    return new UserError();
  }
};

const updateStock = async (_id, body, reqUser) => {
  try {
    let data;

    // check stock existence
    const [stock] = await Promise.all([Stock.findOne({ _id, isDeleted: 0 })]);

    if (!stock) return new UserError(404, "Stock Not Found");

    // start transaction
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      // update stock
      stock.set({
        ...body,
        updatedBy: reqUser._id,
        updatedAt: Date.now(),
      });
      await stock.save({ session });

      // re-create stockDetails

      data = {
        ...stock,
      };
    });

    session.endSession();

    return data || new UserError();
  } catch (e) {
    return new UserError();
  }
};

const checkStockIn = async (_id) => {
  try {
    const data = await Stock.find({ productId: _id, type: 1 });
    let initialValue = 0;
    let sum = data.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.quantity;
    }, initialValue);
    return sum || new UserError();
  } catch (e) {
    return new UserError();
  }
};
const checkStockOut = async (_id) => {
  try {
    const data = await Stock.find({ productId: _id, type: 0 });
    let initialValue = 0;
    let sum = data.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.quantity;
    }, initialValue);
    return sum || new UserError();
  } catch (e) {
    return new UserError();
  }
};
const checkStockAvailable = async (_id) => {
  try {
    const stockIn = await checkStockIn(_id);
    const stockOut = await checkStockOut(_id);
    if (stockOut > 0)
      return stockIn - stockOut;
    else return stockIn - 0
  } catch (e) {
    return new UserError();
  }
};

// const deleteStock = async (_id, reqUser) => {
//   try {
//     // check stock existence
//     const [stock, stockDetails] = await Promise.all([
//       Stock.findOne({ _id, isDeleted: 0 }),
//       StockDetails.find({ stockId: _id, isDeleted: 0 }),
//     ]);

//     if (!stock || !stockDetails.length)
//       return new UserError(404, "Stock Not Found");

//     // start transaction
//     const session = await mongoose.startSession();
//     await session.withTransaction(async () => {
//       // update stock
//       stock.set({
//         isDeleted: 1,
//         updatedBy: reqUser._id,
//         updatedAt: Date.now(),
//       });
//       await stock.save({ session });

//       // update stockDetails
//       await Promise.map(stockDetails, async (item) => {
//         item.set({
//           ...item,
//           isDeleted: 1,
//           updatedBy: reqUser._id,
//           updatedAt: Date.now(),
//         });
//         await item.save({ session });
//       });

//       return true;
//     });

//     session.endSession();

//     return true;
//   } catch (e) {
//     return new UserError();
//   }
// };

module.exports = {
  getStocks,
  getStock,
  createStock,
  updateStock,
  checkStockIn,
  checkStockOut,
  checkStockAvailable,
  //   deleteStock,
};
