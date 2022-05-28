const AppError= require('../utils/appError.js')
const receiverModel = require('../models/recieversModel.js');

exports.getAllReceivers = async (req, res, next) => {

    try {
        const receivers = await receiverModel.find();
    if (!receivers) {
      return next(new AppError('No receivers yet', 404));
    }
    res.status(200).json({
      status: 'success',
      results: receivers.length,
      data: { 
        receivers
      }
    });
    } catch (error) {
        return next(error);
    }
    
  };

exports.addReceiver = async (req, res, next) => {
    try {

    const receiver = await receiverModel.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        receiver
      }
    });
} catch (error) {
    return next(error);
}
    
  };

exports.removeReceiver = async (req, res, next) => {
    try {
        const { id } = req.params;
        
  await receiverModel.deleteOne({ _id: id });

    res.status(204).json({
      status: 'success'
    });
} catch (error) {
    return next(error);
}
    
  };