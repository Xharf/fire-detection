const ClientError = require('../../exceptions/ClientError');

class SysInfoHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.getSysInfoHandler = this.getSysInfoHandler.bind(this);
        this.getSysInfoByIdHandler = this.getSysInfoByIdHandler.bind(this);
        this.postSysInfoHandler = this.postSysInfoHandler.bind(this);
        this.putSysInfoByIdHandler = this.putSysInfoByIdHandler.bind(this);
        this.deleteSysInfoByIdHandler = this.deleteSysInfoByIdHandler.bind(this);
    }
    
    async getSysInfoHandler(request, h) {
        try {
            const sysInfo = await this._service.getSysInfo();
            return{
                status: 'Success',
                data: {
                    sysInfo,
                },
            };
        } catch(error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
              // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getSysInfoByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const sysInfo = await this._service.getSysInfoById(id);

            return {
                status: 'Success',
                data: {
                    sysInfo,
                },
            };
        } catch(error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            // Server ERROR!
            const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async postSysInfoHandler(request, h) {
        try {
          this._validator.validateSysInfoPayload(request.payload);
          const { name = 'Sensor kebakaran', location} = request.payload;

          const sysInfoId = await this._service.addSysInfo({name, location});

          const response = h.response({
            status: 'Success',
            message: 'Informasi sistem berhasil ditambahkan',
            data: {
              sysInfoId,
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

    async putSysInfoByIdHandler(request, h) {
      try {
        this._validator.validateSysInfoPayload(request.payload);
        const { id } = request.params;
  
        await this._service.editSysInfo(id, request.payload);
  
        return {
          status: 'success',
          message: 'Informasi sistem berhasil diperbarui',
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
  
        // Server ERROR!
        const response = h.response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        });
        response.code(500);
        console.error(error);
        return response;
      }
    }

    async deleteSysInfoByIdHandler(request, h) {
      try {
        const { id } = request.params;
        await this._service.deleteSysInfo(id);
        return {
          status: 'success',
          message: 'Informasi sistem berhasil dihapus',
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
  
        // Server ERROR!
        const response = h.response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        });
        response.code(500);
        console.error(error);
        return response;
      }
    }
}

module.exports = SysInfoHandler;