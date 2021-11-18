const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class SysHistoryService {
  constructor() {
    this._pool = new Pool();
  }

  async getSysHistory() {
    const result = await this._pool.query("SELECT * FROM sys_history");
    return result.rows;
  }

  async getSysHistoryById(id) {
    const result = await this._pool.query('SELECT * FROM sys_history WHERE id = $1', [id]);
    if (!result.rows[0]) {
      throw new NotFoundError("Sys history tidak ditemukan");
    }
    return result.rows[0];
  }

  async addSysHistory({
    sys_device,
    wifi_status,
    bluetooth_status,
    dht_status,
    flame_status,
    mq_status,
  }) {
    const id = `sysh-${nanoid(16)}`;
    const created_at = new Date().toISOString();

    const query = {
      text: 'INSERT INTO sys_history VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, sys_device, wifi_status, bluetooth_status, dht_status, flame_status, mq_status, created_at],
    };

    const result = await this._pool.query(query);

    if(!result.rows[0].id){
      throw new InvariantError('History sistem gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async deleteSysHistoryById(id) {
    const result = await this._pool.query("DELETE FROM sys_history WHERE id = $1", [id]);
    
    if(!result.rowCount){
      throw new NotFoundError("Sys history gagal dihapus. Id tidak ditemukan");
    }
  }

}

module.exports = SysHistoryService;
