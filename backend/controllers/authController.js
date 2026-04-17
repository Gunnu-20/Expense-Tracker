import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshCookie,
} from '../utils/generateTokens.js';

// ─── SIGNUP ──────────────────────────────────────────────────
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const user = await User.create({ name, email, password });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Persist refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setRefreshCookie(res, refreshToken);

  res.status(201).json({
    accessToken,
    user: { _id: user._id, name: user.name, email: user.email, currency: user.currency },
  });
};

// ─── LOGIN ───────────────────────────────────────────────────
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setRefreshCookie(res, refreshToken);

  res.json({
    accessToken,
    user: { _id: user._id, name: user.name, email: user.email, currency: user.currency },
  });
};

// ─── REFRESH TOKEN ───────────────────────────────────────────
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select('+refreshToken');

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    setRefreshCookie(res, newRefreshToken);
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ message: 'Token verification failed' });
  }
};

// ─── LOGOUT ──────────────────────────────────────────────────
export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    const user = await User.findOne({ refreshToken: token }).select('+refreshToken');
    if (user) {
      user.refreshToken = null;
      await user.save({ validateBeforeSave: false });
    }
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

// ─── GET PROFILE ─────────────────────────────────────────────
export const getProfile = async (req, res) => {
  res.json(req.user);
};