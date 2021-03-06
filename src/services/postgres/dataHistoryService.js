const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class DataHistory {
  constructor() {
    this._pool = new Pool({connectionString: process.env.PGURI,   
      ssl: {
      rejectUnauthorized: false,
    },});
  }

  async getDataHistory() {
    const result = await this._pool.query('SELECT * FROM data_history');
    return result.rows;
  }

  async getDataHistoryById(id) {
    const result = await this._pool.query('SELECT * FROM data_history WHERE id = $1', [id]);
    if (!result.rows[0]) {
      throw new NotFoundError("Data History tidak ditemukan");
    }
    return result.rows[0];
  }

  async getDataHistoryBySysDeviceId(id) {
    const result = await this._pool.query('SELECT * FROM data_history WHERE sys_device = $1 ORDER BY created_at DESC LIMIT 100' , [id]);
    if (!result.rows) {
      throw new NotFoundError("Data History tidak ditemukan");
    }
    return result.rows;
  }

  async getLastDataHistory(sys_device) {
    const result = await this._pool.query('SELECT * FROM data_history WHERE sys_device = $1 ORDER BY created_at DESC LIMIT 1', [sys_device]);
    return result.rows[0];
  }
  
  async addDataHistory({
    sys_device, humidity, temperature, gas_density, is_there_fire, ask_for_help
  }) {
    const id = `datah-${nanoid(16)}`;
    const created_at = new Date().toISOString();

    const query = {
      text: 'INSERT INTO data_history VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, sys_device, humidity, temperature, gas_density, is_there_fire, ask_for_help, created_at],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new InvariantError("Data History tidak dapat ditambahkan");
    }

    return result.rows[0].id;
  }

  async deleteDataHistoryById(id) {
    const result = await this._pool.query('DELETE FROM data_history WHERE id = $1', [id]);
    if (!result.rowCount) {
      throw new NotFoundError("Data History tidak ditemukan");
    }
  }
}

module.exports = DataHistory;