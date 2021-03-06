import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "config/default.json";
import TypedError from "classes/TypedError.js";
import { ErrorType } from "interfaces/IError";

/**
 * Checks to see if the request is properly authenticated.
 * Will add "authenticatedUser" to the request body once verified.
 * @param req
 * @param res
 * @param next
 */
function authenticate(req: Request, res: Response, next: NextFunction) {
  // Try to get the token from the header
  let token = req.header("x-access-token") || req.header(config.authHeader);

  // If no token found, return unauthorized response (without going to the next middelware)
  if (!token)
    return res
      .status(401)
      .send(
        new TypedError(
          ErrorType.Authorization,
          "Access denied. No token provided."
        )
      );

  try {
    // In the case where the auth header also has "Bearer" or "Token" before the jwt
    if (token.includes("Bearer") || token.includes("Token")) {
      token = token.split(" ")[1];
    }
    // If can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.privateKey);
    req.body.authenticatedUser = decoded;
    next();
  } catch (ex) {
    // If invalid token
    res
      .status(401)
      .send(new TypedError(ErrorType.Authorization, "Token is invalid."));
  }
}

export default authenticate;
