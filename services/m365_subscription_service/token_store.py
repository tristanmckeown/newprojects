"""
Simple token encryption helpers.

DEV NOTE:
- Uses Fernet symmetric encryption with a key loaded from env: TOKEN_ENCRYPTION_KEY.
- In production replace this with envelope encryption via KMS/HashiCorp Vault:
  - Store data keys encrypted by KMS and never store plaintext keys in DB.
  - This helper provides the abstraction point.

Usage:
- call encrypt_token(plain) before saving to DB
- call decrypt_token(cipher) after reading from DB
"""
import os
import base64
from cryptography.fernet import Fernet, InvalidToken

KEY_ENV = "TOKEN_ENCRYPTION_KEY"

def _get_fernet():
    key = os.getenv(KEY_ENV)
    if not key:
        # For dev, create a deterministic key derived from SECRET_KEY if available.
        # This is not secure for production.
        import hashlib
        secret = os.getenv("SECRET_KEY", "dev-secret-key")
        digest = hashlib.sha256(secret.encode()).digest()
        key = base64.urlsafe_b64encode(digest)
    return Fernet(key)

def encrypt_token(plaintext: str) -> str:
    if plaintext is None:
        return None
    f = _get_fernet()
    token = f.encrypt(plaintext.encode("utf-8"))
    return token.decode("utf-8")

def decrypt_token(ciphertext: str) -> str:
    if ciphertext is None:
        return None
    f = _get_fernet()
    try:
        plain = f.decrypt(ciphertext.encode("utf-8"))
        return plain.decode("utf-8")
    except InvalidToken:
        # token invalid: return None, caller should attempt refresh/reauth
        return None
