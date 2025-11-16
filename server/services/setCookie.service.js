
export const setCookie = (res, name, value, options = {}) => {
  const defaultOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 1 * 24 * 60 * 60 * 1000, 
  };

  res.cookie(name, value, { ...defaultOptions, ...options });
};
