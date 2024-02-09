import { Test, TestingModule } from "@nestjs/testing";
import { ToSController } from "./ToS.controller";
import { UserService } from "../../user/user.service";
import { HttpException } from "@nestjs/common";

describe("ToSController", () => {

    let controller: ToSController; 

    const successMessage = "Se aceptó los Términos y Servicios"

    let mockUserService = {
        accepteToSUser: jest.fn()
    }

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ToSController],
            providers: [{
                provide: UserService,
                useValue: mockUserService 
            }]
        })
        .compile();
        
        controller = module.get<ToSController>(ToSController);
    });

    describe("acceptToS", () => {
        const id = 1

        it("should accept terms and services", async () => {
            expect(await controller.acceptToS(id)).toEqual(successMessage)
            expect(mockUserService.accepteToSUser).toHaveBeenCalledWith(id)
        })

        it("should thrown an error to accepted an user", async () => {
            mockUserService.accepteToSUser.mockRejectedValueOnce(new Error("Error"))
            expect(async () => await controller.acceptToS(id))
                .rejects.toThrow(HttpException)
            expect(mockUserService.accepteToSUser).toHaveBeenCalledWith(id)
        })
    })

})