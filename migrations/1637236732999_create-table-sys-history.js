/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('sys_history', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    sys_device: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    wifi_status: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    bluetooth_status: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    dht_status: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    flame_status: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    mq_status: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint('sys_history', 'fk_sys_history.sys_device_sys_info.id', 'FOREIGN KEY(sys_device) REFERENCES sys_info(id) ON DELETE CASCADE');

};

exports.down = pgm => {
  pgm.dropConstraint('sys_history', 'fk_sys_history.sys_device_sys_info.id');
  pgm.dropTable('sys_history');
};
