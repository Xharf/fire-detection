/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("data_history", {
    id: {
      type:'VARCHAR(50)',
      primaryKey: true,
    },
    sys_device: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    humidity: {
      type: "FLOAT",
      notNull: true,
    },
    temperature: {
      type: "FLOAT",
      notNull: true,
    },
    gas_density: {
      type: "FLOAT",
      notNull: true,
    },
    is_there_fire: {
      type: "BOOLEAN",
      notNull: true,
    },
    ask_for_help: {
      type: "BOOLEAN",
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint('data_history', 'fk_data_history.sys_device_sys_info.id', 'FOREIGN KEY(sys_device) REFERENCES sys_info(id) ON DELETE CASCADE');
};

exports.down = pgm => {
  pgm.dropConstraint('data_history', 'fk_data_history.sys_device_sys_info.id');
  pgm.dropTable('data_history');
};
