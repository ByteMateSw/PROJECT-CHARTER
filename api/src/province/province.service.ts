import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './province.entity';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}

  async createProvince(newProvinceData) {
    try {
      const { name } = newProvinceData;
      console.log(name);
      const provinceExist = await this.provinceRepository.findOne({
        where: { name },
      });

      if (!provinceExist) {
        const newProvince = this.provinceRepository.create(newProvinceData);

        this.provinceRepository.save(newProvince);
        return 'Provincia Guardada';
      } else {
        return 'La provincia ya existe'; //Cuando no se manda nada tambien entra aca :V
      }
    } catch (error) {
      return 'No se pudo crear la provincia';
    }
  }

  getProvinces(): Promise<Province[]> | string {
    try {
      return this.provinceRepository.find();
    } catch (error) {
      return 'Error al obtener las localizaciones';
    }
  }

  async getOneProvince(id: number): Promise<Province | string> {
    try {
      if (id) {
        const province = await this.provinceRepository.findOne({
          where: { id },
        });
        if (!province) {
          return 'No se encontró la provincia';
        }
        return province;
      } else {
        return 'Debe proporcionar un ID o un nombre de provincia';
      }
    } catch (error) {
      return 'Error al obtener la provincia';
    }
  }

  async updateProvince(id: number, provinceData): Promise<string> {
    try {
      if (id) {
        const provinceExist = await this.provinceRepository.findOne({
          where: { id },
        });
        if (!provinceExist) {
          return 'No se encontro la provincia';
        }
        await this.provinceRepository.update(id, provinceData);
        return 'La provincia actualizada';
      } else {
        return ' No se mando la id de la provincia ';
      }
    } catch (error) {
      return 'error al actualizar provincia';
    }
  }

  async deleteProvince(id: number): Promise<string> {
    try {
      if (id) {
        const provinceExist = await this.provinceRepository.findOne({
          where: { id },
        });

        if (!provinceExist) {
          return 'No se encontro la provincia';
        }
        await this.provinceRepository.delete({ id });
      } else {
        return 'Debe proporcionar un ID  de provincia';
      }

      return 'Localizacion eliminada correctamente';
    } catch (error) {
      return 'Error al eliminar la localizacion';
    }
  }
}
