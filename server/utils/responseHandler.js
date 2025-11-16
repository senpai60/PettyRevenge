// utils/responseHandler.js

export const sendSuccess = (
  res,
  status = 200,
  message = "Success",
  data = {}
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const sendCreated = (res, message = "Created", data = {}) => {
  return sendSuccess(res, 201, message, data);
};

export const sendFail = (res, message = "Failed", status = 400) => {
  return res.status(status).json({
    success: false,
    error: message,
  });
};

