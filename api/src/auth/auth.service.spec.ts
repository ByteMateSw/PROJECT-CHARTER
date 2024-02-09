import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UserService } from "../user/user.service"
import { HashService } from "./hash.service"
import { JwtService } from "@nestjs/jwt"
import { HttpException, UnauthorizedException } from "@nestjs/common"

describe("AuthService", () => {
    
    let service: AuthService

    const mockUser = {
        "id": 1,
        "firstName": "TestFirstName",
        "lastName": "TestLastName",
        "email": "test@gmail.com",
        "password": "1234",
        "numberPhone": "+1123456789",
        "birthday": new Date(),
        "dni": "444"
    };

    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3QiLCJpYXQiOiIxIn0.8sJGfQl3huwiy0f7YYtk2FFd5-4lnxWQuQB3I2_l0sY"

    const mockRole = "test"

    let mockUserService = {
        getByEmail: jest.fn().mockResolvedValue(mockUser),
        createUser: jest.fn().mockResolvedValue(mockUser),
        getRole: jest.fn().mockResolvedValue(mockRole)
    }

    let mockHashService = {
        compareHash: jest.fn().mockResolvedValue(true)
    }

    let mockJWTService = {
        signAsync: jest.fn().mockResolvedValue(mockToken)
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UserService,
                useValue: mockUserService
            }, {
                provide: HashService,
                useValue: mockHashService
            }, {
                provide: JwtService,
                useValue: mockJWTService
            }]}).compile()

        service = module.get<AuthService>(AuthService)
    })

    describe("signIn", () => {
        const mockEmail = mockUser.email
        const mockPassword = "MockedPassword"
        const payload = {sub: mockUser.id, email: mockUser.email, role: mockRole}
        const returnedToken = { access_token: mockToken }

        it("should login the user with the received credentrials", async () => {
            expect(await service.signIn(mockEmail, mockPassword)).toEqual(returnedToken)
            expect(mockUserService.getByEmail).toHaveBeenCalledWith(mockEmail)
            expect(mockHashService.compareHash).toHaveBeenCalledWith(mockUser.password, mockPassword)
            expect(mockJWTService.signAsync).toHaveBeenCalledWith(payload)
        })

        it("should not found the user with this credentials", async () => {
            mockUserService.getByEmail.mockResolvedValueOnce(null)
            expect(async () => await service.signIn(mockEmail, mockPassword))
                .rejects.toThrow(new UnauthorizedException())
        })

        it("should not coincide the user password with the received password", async () => {
            mockHashService.compareHash.mockResolvedValueOnce(false)
            expect(async () => await service.signIn(mockEmail, mockPassword))
                .rejects.toThrow(new UnauthorizedException())
            expect(mockUserService.getByEmail).toHaveBeenCalledWith(mockEmail)
        })
    })

    describe("register", () => {
        it("should register an user", async () => {
            expect(await service.register(mockUser)).toEqual(mockUser)
            expect(mockUserService.createUser).toHaveBeenCalledWith(mockUser)
        })

        it("should thrown an error to create an user", async () => {
            mockUserService.createUser.mockResolvedValueOnce(null)
            expect(async () => await service.register(mockUser))
                .rejects.toThrow(new Error("Error al crear al usuario"))
            expect(mockUserService.createUser).toHaveBeenCalledWith(mockUser)
        })

        it("should thrown an error to register an user", async () => {
            mockUserService.createUser.mockRejectedValueOnce(new Error("Error"))
            expect(async () => await service.register(mockUser))
                .rejects.toThrow(HttpException)
            expect(mockUserService.createUser).toHaveBeenCalledWith(mockUser)
        })
    })

})