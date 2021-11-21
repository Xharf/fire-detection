const ClientError = require('../../exceptions/ClientError');

class ActionHistoryHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.getActionHistoryHandler = this.getActionHistoryHandler.bind(this);
    this.getActionHistoryByIdHandler = this.getActionHistoryByIdHandler.bind(this);
    this.postActionHistoryHandler = this.postActionHistoryHandler.bind(this);
    this.deleteActionHistoryByIdHandler = this.deleteActionHistoryByIdHandler.bind(this);
    this.getLastActionHistoryHandler = this.getLastActionHistoryHandler.bind(this);
  }

  async getActionHistoryHandler(request, h) {
    try {
      const actionHistory = await this._service.getActionHistory();
      return {
        status: 'Success',
        data: actionHistory,
      };
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

  async getActionHistoryByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const actionHistory = await this._service.getActionHistoryById(id);
      return {
        status: 'Success',
        data: actionHistory,
      };
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

  async getLastActionHistoryHandler(request, h) {
    try {
      const lastActionHistory = await this._service.getLastActionHistory();
      return {
        status: 'Success',
        data: {
          lastActionHistory,
        },
      };
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

  async postActionHistoryHandler(request, h) {
    try {
      this._validator.validateActionHistoryPayload(request.payload);

      const {
        sys_device, action_name, description, performed_by
      } = request.payload;

      const actionHistoryId = await this._service.addActionHistory({
        sys_device, action_name, description, performed_by
      });

      const response = h.response({
        status: "success",
        message: "Action history ditambahkan",
        data: {
          actionHistoryId,
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

  async deleteActionHistoryByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteActionHistoryById(id);
      return {
        status: "Success",
        message: "Action history berhasil dihapus",
      };
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

module.exports = ActionHistoryHandler;