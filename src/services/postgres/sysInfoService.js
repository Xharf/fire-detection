const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');


class SysInfoService{
    constructor(){
        this._pool = new Pool(process.env.PGURI);
    }

    async getSysInfo(){
        const result = await this._pool.query('SELECT name, location FROM sys_info');
        return result.rows;
    }

    async getSysInfoById(id){
        const query = {
            text: 'SELECT * FROM sys_info WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);
        if(result.rowCount === 0){
            throw new NotFoundError(`Informasi sistem dengan id ${id} tidak ditemukan`);
        }

        return result.rows[0];
    }

    async addSysInfo({name, location}){
        const id = `sysInfo-${nanoid(16)}`;
        const createdAt = new Date().toISOString();

        const query = {
            text: 'INSERT INTO sys_info VALUES($1, $2, $3, $4, $4) RETURNING id',
            values: [id, name, location, createdAt],
        }

        const result = await this._pool.query(query);
        if(!result.rows[0].id){
            throw new InvariantError('Informasi sistem gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async editSysInfo(id, {name, location}){
        const updated_at = new Date().toISOString();
        const query = {
            text: 'UPDATE sys_info SET name = $1, location = $2, updated_at = $3 WHERE id = $4 RETURNING id',
            values: [name, location, updated_at, id],
        }

        const result = await this._pool.query(query);

        if (!result.rows[0]) {
            throw new NotFoundError('Gagal memperbarui Informasi sistem. Id tidak ditemukan', 404);
        }
    }

    async deleteSysInfo(id){
        const query = {
            text: 'DELETE FROM sys_info WHERE id = $1 RETURNING id',
            values: [id],
        }

        const result = await this._pool.query(query);

        if(!result.rowCount){
            throw new NotFoundError('Gagal menghapus Informasi sistem. Id tidak ditemukan', 404);
        }
    }

}


module.exports = SysInfoService;