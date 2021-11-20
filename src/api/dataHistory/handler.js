const ClientError = require('../../exceptions/ClientError');

class DataHistoryHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postDataHistoryHandler = this.postDataHistoryHandler.bind(this);
    this.getDataHistoryHandler = this.getDataHistoryHandler.bind(this);
    this.getDataHistoryByIdHandler = this.getDataHistoryByIdHandler.bind(this);
    this.deleteDataHistoryByIdHandler = this.deleteDataHistoryByIdHandler.bind(this);
  }

  
  async postDataHistoryHandler(request, h) {
    try {
      this._validator.validateDataHistoryPayload(request.payload);

      const { 
        sys_device, humidity, temperature, gas_density, is_there_fire, ask_for_help 
      } = request.payload;

      const dataHistoryId = await this._service.addDataHistory({
        sys_device, humidity, temperature, gas_density, is_there_fire, ask_for_help
      });

      const response = h.response({
        status : 'success',
        message: 'Data History berhasil ditambahkan',
        data: {
          dataHistoryId
        },
      });
      response.code(201);
      return response;
    } catch (error) {
        if (error instanceof ClientError) {
          const response = h.response({
            status: 'fail',
            message: error.message,
          });
  
          response.code(error.statusCode);
          return response;
        }
  
        // error dari server
        const response = h.response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami',
        });
  
        response.code(500);
        console.error(error);
        return response;
      }
  }

  async getDataHistoryHandler(request, h) {
    try {
      const dataHistory = await this._service.getDataHistory();

      return {
        status: 'success',
        data: {
          dataHistory,
        },
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
  
        response.code(error.statusCode);
        return response;
      }
  
      // error dari server
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
  
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getDataHistoryByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const dataHistory = await this._service.getDataHistoryById(id);

      return {
        status: 'success',
        data: {
          dataHistory,
        },
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
  
        response.code(error.statusCode);
        return response;
      }
  
      // error dari server
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
  
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteDataHistoryByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteDataHistoryById(id);

      return {
        status: 'success',
        message: 'Data History berhasil dihapus',
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
  
        response.code(error.statusCode);
        return response;
      }
  
      // error dari server
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
  
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = DataHistoryHandler;