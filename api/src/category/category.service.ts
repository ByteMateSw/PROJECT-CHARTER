import { HttpException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Category } from "./Category.entity"
import {Repository} from 'typeorm'
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

@Injectable()
export class CategoryService{

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    createCategory(category): Promise<Category> {
        
            const existingCategory =  this.categoryRepository.findOne({
                where: {
                    name: category.name
                }
            });

            if (existingCategory) {
                throw new HttpException('La categoría ya existe',400);
            }

            const newCategory = this.categoryRepository.create(category);
            return this.categoryRepository.save(newCategory);
    }

    getCategory(){
       return this.categoryRepository.find()
    }

    getCategoryById(id:number){
       return this.categoryRepository.findOne({
            where:{
                id
            }
        })
    }
}