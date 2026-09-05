import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  }
  const session = await Session.findOne({ accessToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  if (session.accessTokenValidUntil < Date.now()) {
    throw createHttpError(401, 'Access token exired');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401);
  }
  req.user = user;
  next();
};
