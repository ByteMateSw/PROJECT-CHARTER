import { Test, TestingModule } from "@nestjs/testing"
import { HashService } from "./hash.service"
import argon2 from "argon2"

describe("HashService", () => {

    let service: HashService

    const mockPassword = "testpass"
    const mockHash = "testhash"

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HashService]
        }).compile()

        service = module.get<HashService>(HashService)
    })

    describe("compare",() => {
        it("should compare beetween hash and password", async () => {
            jest.spyOn(argon2, "verify").mockResolvedValueOnce(true)
            expect(await service.compareHash(mockHash, mockPassword)).toEqual(true)
            expect(argon2.verify).toHaveBeenCalledWith(mockHash, mockPassword)
        })
        
        it("should compare and should not be equal", async () => {
            jest.spyOn(argon2, "verify").mockResolvedValueOnce(false)
            expect(await service.compareHash(mockHash, mockPassword)).toEqual(false)
            expect(argon2.verify).toHaveBeenCalledWith(mockHash, mockPassword)
        })
    })
})