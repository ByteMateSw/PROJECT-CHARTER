import path from "path"
import { randomBytes } from "crypto"


export function generateRandomName(): string {
    return randomBytes(16).toString('hex')
}

export function changeNameFile(filename: string, newFileName: string): string {
    return newFileName + path.extname(filename)
}