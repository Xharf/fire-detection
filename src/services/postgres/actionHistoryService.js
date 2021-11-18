const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ActionHistoryService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addActionHistory({sys_device, action_name, description, performed_by}) {
    const id = `acth-${nanoid(16)}`;
    const created_at = new Date().toISOString();

    const query = {
      text: 'INSERT INTO action_history VALUES($1,$2,$3,$4,$5, $6) RETURNING id',
      values: [id, sys_device, action_name, description, performed_by, created_at],
    }

    const result = await this._pool.query(query);

    if(!result.rows[0].id) {
      throw new InvariantError('Action history gagal ditambahkan');
    }
    return  result.rows[0].id;
  }

  async getActionHistory() { 
    const result = await this._pool.query('SELECT * FROM action_history');
    return result.rows;
  }

  async getActionHistoryById(id) {
      const result = await this._pool.query('SELECT * FROM action_history WHERE id = $1', [id]);
      if(!result.rows[0]) {
        throw new NotFoundError('Action history tidak ditemukan');
      }
      return result.rows[0];
  }

  async deleteActionHistoryById(id) {
    const query = {
      text: 'DELETE FROM action_history WHERE id = $1 RETURNING id',
      values: [id],
    }

    const result = await this._pool.query(query);
    if(!result.rows[0]) {
      throw new NotFoundError('Action history gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = ActionHistoryService;