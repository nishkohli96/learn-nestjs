import { randomBytes, scrypt } from 'crypto';
import * as jwt from 'jsonwebtoken';

export async function hashPswd(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = randomBytes(16).toString('hex');

        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ':' + derivedKey.toString('hex'));
        });
    });
}

export async function verifyPswd(
    password: string,
    hash: string,
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(':');
        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'));
        });
    });
}

export async function getJWT(email: string): Promise<string> {
    const token = jwt.sign(
        {
            email: email,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hr expiry
        },
        process.env.DUMMY_KEY ?? 'key',
    );
    return token;
}

export async function verifyJWT(token: string): Promise<any> {
    const result = jwt.verify(token, process.env.DUMMY_KEY ?? 'key');
    console.log('result: ', result);
    return result;
}
