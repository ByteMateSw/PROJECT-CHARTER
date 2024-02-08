import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller"
import { UserService } from "./user.service";
import { HttpException } from "@nestjs/common";

describe("UserController", () => {

    let controller: UserController; 

    const mockUser = {
        "id": 1,
        "firstName": "TestFirstName",
        "lastName": "TestLastName",
        "email": "test@gmail.com",
        "password": "1234",
        "numberPhone": "+1123456789",
        "birthday": "2000-01-01",
        "dni": "444"
    };

    const mockUpdateUser = {
        "firstname": "Ivan",
    };

    const mockDeleteMessage = 'El usuario ha sido borrado correctamente '

    const mockUpdateMessage = 'El usuario se ha actualizado correctamente'

    const mockUserService = {
        getAll: jest.fn().mockResolvedValueOnce([mockUser]),
        getById: jest.fn().mockResolvedValueOnce(mockUser),
        deleteUser: jest.fn().mockResolvedValueOnce(mockDeleteMessage),
        updateUser: jest.fn().mockResolvedValueOnce(mockUpdateMessage)
    }


    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService]
        }).overrideProvider(UserService)
        .useValue(mockUserService)
        .compile();

        controller = module.get<UserController>(UserController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    describe("getAllUsers", () => {
        it("should return an mocked user list", async () => {
            const users = await controller.getAll()
            expect(mockUserService.getAll).toHaveBeenCalled()
            expect(users).toEqual([mockUser])
        })

        it("get an empty user list", async () => {
            const emptyUserList = {}
            mockUserService.getAll = jest.fn().mockResolvedValueOnce(emptyUserList)
            expect(await controller.getAll()).toBe(emptyUserList)
            expect(mockUserService.getAll).toHaveBeenCalled()
        })
    })

    describe("getById", () => {
        it("get an user", async () => {
            const id = mockUser.id
            expect(await controller.getById(id)).toBe(mockUser)
            expect(mockUserService.getById).toHaveBeenCalledWith(id)
        })
    })

    describe("deleteUser", () => {
        it("delete an user", async () => {
            const id = mockUser.id
            expect(await controller.deleteUser(id)).toEqual(mockDeleteMessage)
            expect(mockUserService.deleteUser).toHaveBeenCalledWith(id)
        })

        it("should thrown an error", async () => {
            const id = mockUser.id
            mockUserService.deleteUser.mockRejectedValueOnce(id)
            expect(async () => {
                await controller.deleteUser(id)
            }).rejects.toThrow(HttpException)
        })
    })

    describe("updateUser", () => {
        it("should update the user", async () => {
            const id = mockUser.id
            expect(await controller.updateUser(id, {})).toEqual(mockUpdateMessage)
            expect(mockUserService.updateUser).toHaveBeenCalledWith(id, {})
        })

        it("should thrown an error", () => {
            const id = mockUser.id
            mockUserService.updateUser.mockRejectedValueOnce(id)
            expect(async () => {
                await controller.updateUser(id, {})
            }).rejects.toThrow(HttpException)
        })
    })

})