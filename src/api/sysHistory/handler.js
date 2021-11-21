const ClientError = require('../../exceptions/ClientError');

class SysHistoryHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSysHistoryHandler = this.postSysHistoryHandler.bind(this);
    this.getSysHistoryHandler = this.getSysHistoryHandler.bind(this);
    this.getSysHistoryByIdHandler = this.getSysHistoryByIdHandler.bind(this);
    this.deleteSysHistoryByIdHandler = this.deleteSysHistoryByIdHandler.bind(this);
    this.getLastSysHistoryHandler = this.getLastSysHistoryHandler.bind(this);
  }

  
  async getSysHistoryHandler(request, h) {
    try {
      const sysHistory = await this._service.getSysHistory();

      return {
        status: 'success',
        data: {
          sysHistory,
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

  async getLastSysHistoryHandler(request, h) {
    try {

      const { sys_device } = request.params;
      const lastSysHistory = await this._service.getLastSysHistory(sys_device);
      
      return {
        status: 'success',
        data: {
          lastSysHistory,
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

  async postSysHistoryHandler(request, h) {
    try{
      this._validator.validateSysHistoryPayload(request.payload);

      const {
        sys_device, wifi_status, bluetooth_status, dht_status, flame_status, mq_status
      } = request.payload;

      const sysHistoryId = await this._service.addSysHistory({
        sys_device, wifi_status, bluetooth_status, dht_status, flame_status, mq_status
      });

      const response = h.response({
        status: 'success',
        message: 'Sys history berhasil ditambahkan',
        data: {
          sysHistoryId,
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

  async getSysHistoryByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const sysHistory = await this._service.getSysHistoryById(id);

      return {
        status: 'success',
        data: {
          sysHistory,
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

  async deleteSysHistoryByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteSysHistoryById(id);

      return {
        status: 'success',
        message: 'Sys history berhasil dihapus',
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

module.exports = SysHistoryHandler;