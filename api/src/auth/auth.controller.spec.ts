import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ToSGuard } from "./ToS/ToS.guard";

describe("AuthController", () => {

    let controller: AuthController

    const mockUser = {
        "firstName": "TestFirstName",
        "lastName": "TestLastName",
        "email": "test@gmail.com",
        "password": "1234",
        "numberPhone": "+1123456789",
        "birthday": new Date(),
        "dni": "444"
    };

    const mockLoginUser = { email: mockUser.email, password: mockUser.password}

    const successMessage = "El usuario a sido creado con éxito"
    const failureMessage = "No se pudo crear el usuario"

    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3QiLCJpYXQiOiIxIn0.8sJGfQl3huwiy0f7YYtk2FFd5-4lnxWQuQB3I2_l0sY"

    let mockAuthService = {
        register: jest.fn().mockResolvedValue(mockUser),
        signIn: jest.fn().mockResolvedValue(mockToken)
    }

    let mockToSGuard = {
        canActivate: () => true
    }

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService]
        }).overrideProvider(AuthService)
        .useValue(mockAuthService)
        .overrideGuard(ToSGuard)
        .useValue(mockToSGuard)
        .compile();

        controller = module.get<AuthController>(AuthController);
    })

    describe("register", () => {
        it("should register an user", async () => {
            expect(await controller.register(mockUser)).toEqual(successMessage)
            expect(mockAuthService.register).toHaveBeenCalledWith(mockUser)
        })

        it("should fail to register an user", async () => {
            mockAuthService.register.mockResolvedValueOnce(null)
            expect(await controller.register(mockUser)).toEqual(failureMessage)
            expect(mockAuthService.register).toHaveBeenCalledWith(mockUser)
        })
    })

    describe("signIn", () => {
        it("should login the user", async () => {
            expect(await controller.signIn(mockLoginUser)).toEqual(mockToken)
            expect(mockAuthService.signIn).toHaveBeenCalledWith(mockLoginUser.email, mockLoginUser.password)
        })
    })
})