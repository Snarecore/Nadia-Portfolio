const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET || "mern_portfolio_secret_jwt_key_2026_xyz";

// Hash password with salt
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
};

// Compare password with hash
const comparePassword = (password, storedHash) => {
  if (!storedHash || !storedHash.includes(":")) return false;
  const [salt, originalHash] = storedHash.split(":");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  const hashBuf = Buffer.from(hash);
  const originalBuf = Buffer.from(originalHash);
  if (hashBuf.length !== originalBuf.length) return false;
  return crypto.timingSafeEqual(hashBuf, originalBuf);
};

// Create a signed token with expiration
const generateToken = (payload, expiresInHours = 24) => {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${signature}`;
};

// Verify signed token
const verifyToken = (token) => {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const expectedSig = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${body}`)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expectedSigBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expectedSigBuf.length || !crypto.timingSafeEqual(sigBuf, expectedSigBuf)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch (error) {
    return null;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
