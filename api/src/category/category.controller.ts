import { Body, Controller, Get, Post, Param, ParseIntPipe } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "./Category.entity";


@Controller('category')
export class CategoryController{

    constructor(private categoryService: CategoryService){}
    @Get()
    getCategory(): Promise<Category[]>{
        return this.categoryService.getCategory();
    }

    @Get(':id')
    getCategoryById(@Param('id', ParseIntPipe)id: number ): Promise<Category>{
        console.log(id)
        console.log(typeof id)
        return this.categoryService.getCategoryById(id);
    }

    @Post()
    createCategory(@Body() newCategory) {
        return this.categoryService.createCategory(newCategory)
    }



}
