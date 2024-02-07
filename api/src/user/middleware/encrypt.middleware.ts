import { HttpException, HttpStatus } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import argon2 from "argon2"

export async function generateHash(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password
    if(!password)
        throw new HttpException("Bad credentials", HttpStatus.BAD_REQUEST)
    const hash = await argon2.hash(password)
    req.body.password = hash
    next()
}

